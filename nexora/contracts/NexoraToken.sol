// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title Nexora ($NXRA)
 * @author Nexora Global Protocol Foundation
 * @notice Institutional Tier-1 BEP-20 / ERC-20 Asset for Global Web3 Settlement.
 *
 * Security & Tier-1 Exchange Compliance Guarantees:
 * - Built on battle-tested OpenZeppelin v5.x audited base contracts.
 * - Strictly Fixed Supply: Exactly 1,000,000,000 NXRA minted upon creation.
 * - Zero Post-Deployment Minting: No function exists to create additional tokens (0% inflation).
 * - Zero Transfer Fees: 0% buy tax, 0% sell tax, 0% transfer fee for seamless CEX integration.
 * - Censorship Resistant: No transfer pause, freeze, or address blacklist vectors (Zero Honeypot Risk).
 * - EIP-2612 Gasless Permit: Off-chain signature approvals for DEX aggregators & DeFi routing.
 * - Deflationary Burning: Holders can independently burn tokens to permanently lower supply.
 * - Accidental Asset Rescue: Only foreign third-party ERC-20 tokens accidentally sent to this
 *   contract can be rescued. Native NXRA tokens are cryptographically locked from rescue.
 * - Multi-Step Governance: Ownable2Step ensures ownership cannot be lost to an invalid address.
 */
contract NexoraToken is ERC20, ERC20Burnable, ERC20Permit, Ownable2Step {
    using SafeERC20 for IERC20;

    /// @notice Total fixed supply: 1,000,000,000 NXRA (1 Billion with 18 decimals)
    uint256 public constant TOTAL_FIXED_SUPPLY = 1_000_000_000 * 10 ** 18;

    /// @notice Emitted when foreign third-party tokens sent in error are safely recovered
    event ForeignTokensRecovered(address indexed token, address indexed recipient, uint256 amount);

    /**
     * @dev Deploys Nexora Token, mints initial supply to deployer, and initializes EIP-712 domain.
     */
    constructor()
        ERC20("Nexora", "NXRA")
        ERC20Permit("Nexora")
        Ownable(msg.sender)
    {
        _mint(msg.sender, TOTAL_FIXED_SUPPLY);
    }

    /**
     * @notice Allows the contract owner to safely rescue foreign ERC-20 tokens sent by error.
     * @dev Guarded to strictly reject attempts to withdraw native NXRA tokens.
     * @param tokenAddress The address of the foreign ERC-20 token.
     * @param recipient The destination address for recovered tokens.
     * @param amount The token quantity to transfer.
     */
    function rescueForeignToken(
        address tokenAddress,
        address recipient,
        uint256 amount
    ) external onlyOwner {
        require(tokenAddress != address(this), "Nexora: cannot withdraw native NXRA");
        require(recipient != address(0), "Nexora: cannot send to zero address");
        require(amount > 0, "Nexora: amount must be greater than zero");

        IERC20(tokenAddress).safeTransfer(recipient, amount);
        emit ForeignTokensRecovered(tokenAddress, recipient, amount);
    }
}
