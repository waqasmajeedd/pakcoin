// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

/**
 * @title NexoraAirdrop
 * @author Nexora Global Protocol Foundation
 * @notice High-throughput, gas-optimized batch distributor for community airdrops and staking payouts.
 */
contract NexoraAirdrop is Ownable2Step {
    using SafeERC20 for IERC20;

    event BatchDispersed(address indexed token, uint256 recipientCount, uint256 totalTokens);

    constructor() Ownable(msg.sender) {}

    /**
     * @notice Disperses ERC-20 tokens to multiple recipient addresses in a single atomic transaction.
     * @dev Caller must approve this contract for the sum of all distributed amounts beforehand.
     * @param token The ERC-20 token interface
     * @param recipients Array of destination addresses
     * @param amounts Array of token values per recipient
     */
    function disperseTokens(
        IERC20 token,
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external onlyOwner {
        require(recipients.length == amounts.length, "NexoraAirdrop: length mismatch");
        require(recipients.length > 0, "NexoraAirdrop: empty recipient list");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "NexoraAirdrop: recipient cannot be zero");
            totalAmount += amounts[i];
            token.safeTransferFrom(msg.sender, recipients[i], amounts[i]);
        }

        emit BatchDispersed(address(token), recipients.length, totalAmount);
    }
}
