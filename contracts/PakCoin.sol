// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title Pak Coin ($PAK)
 * @author Pak Coin Protocol Team
 * @notice Official institutional-grade BEP-20 / ERC-20 token for Pak Coin ecosystem.
 *
 * Tier-1 Exchange & Security Compliance Standards:
 * - 100% OpenZeppelin v5 Audited Base Contracts
 * - Fixed Supply: Exactly 1,000,000,000 PAK minted at deployment
 * - Non-Mintable: No mint function exists after deployment (Zero inflation risk)
 * - Zero Transfer Taxes (0% Buy / 0% Sell / 0% Transfer fee): 100% CEX accounting compatibility
 * - Non-Pausable / Non-Blacklistable: Zero honeypot or transfer-freezing vectors
 * - Holder Burnable: Built-in EIP-compliant ERC20Burnable
 * - EIP-2612 Gasless Permits: Supported for modern DEX and DeFi liquidity routing
 * - Safe Foreign Recovery: Only non-PAK foreign tokens accidentally sent here can be rescued
 * - Secure Governance: Two-step ownership transfer (Ownable2Step)
 */
contract PakCoin is ERC20, ERC20Burnable, ERC20Permit, Ownable2Step {
    using SafeERC20 for IERC20;

    /// @notice Total fixed supply: 1,000,000,000 PAK (18 decimals)
    uint256 public constant INITIAL_SUPPLY = 1_000_000_000 * 10 ** 18;

    /// @notice Emitted when foreign ERC20 tokens sent by mistake are rescued
    event ForeignTokensRescued(address indexed token, address indexed to, uint256 amount);

    /**
     * @dev Deploys the contract, mints the entire fixed supply to msg.sender,
     * and sets msg.sender as the initial owner with Ownable2Step.
     */
    constructor()
        ERC20("Pak Coin", "PAK")
        ERC20Permit("Pak Coin")
        Ownable(msg.sender)
    {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @notice Rescues third-party ERC20 tokens sent to this contract by mistake.
     * @dev Native PAK tokens CANNOT be rescued through this method to protect supply integrity.
     * @param tokenAddress The address of the foreign ERC20 token to rescue.
     * @param to The recipient address for the rescued tokens.
     * @param amount The token amount to transfer.
     */
    function rescueForeignToken(
        address tokenAddress,
        address to,
        uint256 amount
    ) external onlyOwner {
        require(tokenAddress != address(this), "PakCoin: cannot rescue native PAK");
        require(to != address(0), "PakCoin: cannot transfer to zero address");
        IERC20(tokenAddress).safeTransfer(to, amount);
        emit ForeignTokensRescued(tokenAddress, to, amount);
    }
}
