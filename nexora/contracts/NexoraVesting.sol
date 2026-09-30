// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

/**
 * @title NexoraVesting
 * @author Nexora Global Protocol Foundation
 * @notice Transparent on-chain linear vesting contract for team, advisory, and ecosystem allocations.
 * Proves to exchanges and community that team tokens cannot be dumped on the market.
 */
contract NexoraVesting is Ownable2Step {
    using SafeERC20 for IERC20;

    struct VestingSchedule {
        address beneficiary;
        uint256 totalAmount;
        uint256 releasedAmount;
        uint256 startTimestamp;
        uint256 cliffDuration;
        uint256 totalDuration;
        bool isActive;
    }

    IERC20 public immutable token;
    mapping(address => VestingSchedule) public vestingSchedules;

    event VestingScheduleCreated(
        address indexed beneficiary,
        uint256 totalAmount,
        uint256 startTimestamp,
        uint256 cliffDuration,
        uint256 totalDuration
    );
    event TokensReleased(address indexed beneficiary, uint256 amount);

    constructor(IERC20 _token) Ownable(msg.sender) {
        require(address(_token) != address(0), "NexoraVesting: invalid token");
        token = _token;
    }

    /**
     * @notice Creates a transparent vesting schedule.
     */
    function createVestingSchedule(
        address beneficiary,
        uint256 amount,
        uint256 cliffDuration,
        uint256 totalDuration
    ) external onlyOwner {
        require(beneficiary != address(0), "NexoraVesting: zero beneficiary");
        require(amount > 0, "NexoraVesting: zero amount");
        require(totalDuration > 0 && totalDuration >= cliffDuration, "NexoraVesting: invalid duration");
        require(!vestingSchedules[beneficiary].isActive, "NexoraVesting: schedule already exists");

        vestingSchedules[beneficiary] = VestingSchedule({
            beneficiary: beneficiary,
            totalAmount: amount,
            releasedAmount: 0,
            startTimestamp: block.timestamp,
            cliffDuration: cliffDuration,
            totalDuration: totalDuration,
            isActive: true
        });

        token.safeTransferFrom(msg.sender, address(this), amount);
        emit VestingScheduleCreated(beneficiary, amount, block.timestamp, cliffDuration, totalDuration);
    }

    /**
     * @notice Calculates claimable vested tokens at the current timestamp.
     */
    function calculateReleasableAmount(address beneficiary) public view returns (uint256) {
        VestingSchedule memory schedule = vestingSchedules[beneficiary];
        if (!schedule.isActive) return 0;
        if (block.timestamp < schedule.startTimestamp + schedule.cliffDuration) return 0;

        uint256 elapsedTime = block.timestamp - schedule.startTimestamp;
        if (elapsedTime >= schedule.totalDuration) {
            return schedule.totalAmount - schedule.releasedAmount;
        }

        uint256 vestedTotal = (schedule.totalAmount * elapsedTime) / schedule.totalDuration;
        return vestedTotal - schedule.releasedAmount;
    }

    /**
     * @notice Releases all matured vested tokens to the beneficiary wallet.
     */
    function releaseTokens() external {
        address beneficiary = msg.sender;
        uint256 releasable = calculateReleasableAmount(beneficiary);
        require(releasable > 0, "NexoraVesting: no tokens available for release");

        vestingSchedules[beneficiary].releasedAmount += releasable;
        token.safeTransfer(beneficiary, releasable);
        emit TokensReleased(beneficiary, releasable);
    }
}
