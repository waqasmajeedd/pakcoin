// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

/**
 * @title PakAirdrop
 * @author Pak Coin Protocol Team
 * @notice Dedicated batch transfer utility for community rewards and airdrop distributions.
 * Separated from the token contract to preserve core token purity and EIP-20 standardization.
 */
contract PakAirdrop is Ownable2Step {
    using SafeERC20 for IERC20;

    event AirdropDispersed(address indexed token, uint256 recipientCount, uint256 totalAmount);

    constructor() Ownable(msg.sender) {}

    /**
     * @notice Distribute tokens to multiple recipients in a single transaction.
     * @dev Caller must have approved this contract to spend the required total token amount.
     * @param token The ERC20 token to distribute
     * @param recipients Array of recipient addresses
     * @param amounts Array of token amounts corresponding to recipients
     */
    function disperseTokens(
        IERC20 token,
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external onlyOwner {
        require(recipients.length == amounts.length, "PakAirdrop: recipients and amounts length mismatch");
        require(recipients.length > 0, "PakAirdrop: empty recipients list");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "PakAirdrop: cannot send to zero address");
            totalAmount += amounts[i];
            token.safeTransferFrom(msg.sender, recipients[i], amounts[i]);
        }

        emit AirdropDispersed(address(token), recipients.length, totalAmount);
    }
}
