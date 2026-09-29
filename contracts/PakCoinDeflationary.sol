// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PakCoinDeflationary ($PAK)
 * @dev Advanced BEP-20 token with optional community rewards & liquidity growth.
 * 
 * Tokenomics Features:
 * - 1% Auto-Burn on transfers (Continuous deflation)
 * - 1% Community & Ecosystem Development Fund
 * - Fee Exemption for specified addresses (e.g. presale, exchange pairs, owner)
 * - Max transaction limit protection (anti-whale)
 */

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
}

abstract contract Ownable is Context {
    address private _owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is 0 address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract PakCoinDeflationary is Context, IERC20, Ownable {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => bool) private _isExcludedFromFees;

    string public constant name = "Pak Coin Deflationary";
    string public constant symbol = "PAK";
    uint8 public constant decimals = 18;
    uint256 private _totalSupply = 1_000_000_000 * 10 ** 18; // 1 Billion

    // Fees (Percentage)
    uint256 public burnFeePercent = 1;       // 1% burned forever
    uint256 public communityFeePercent = 1;  // 1% development/community fund
    address public communityWallet;

    // Anti-whale: Max 2% per transaction initially (can be adjusted by owner)
    uint256 public maxTxAmount = 20_000_000 * 10 ** 18; 

    event FeesUpdated(uint256 burnFee, uint256 communityFee);
    event CommunityWalletUpdated(address newWallet);

    constructor(address _communityWallet) {
        communityWallet = _communityWallet != address(0) ? _communityWallet : msg.sender;
        _balances[msg.sender] = _totalSupply;
        _isExcludedFromFees[msg.sender] = true;
        _isExcludedFromFees[address(this)] = true;
        _isExcludedFromFees[communityWallet] = true;

        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) external override returns (bool) {
        _transfer(_msgSender(), to, amount);
        return true;
    }

    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external override returns (bool) {
        uint256 currentAllowance = _allowances[from][_msgSender()];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        unchecked {
            _approve(from, _msgSender(), currentAllowance - amount);
        }
        _transfer(from, to, amount);
        return true;
    }

    function setExcludedFromFee(address account, bool excluded) external onlyOwner {
        _isExcludedFromFees[account] = excluded;
    }

    function setCommunityWallet(address newWallet) external onlyOwner {
        require(newWallet != address(0), "Cannot be zero address");
        communityWallet = newWallet;
        emit CommunityWalletUpdated(newWallet);
    }

    function setFees(uint256 _burnFee, uint256 _communityFee) external onlyOwner {
        require(_burnFee + _communityFee <= 10, "Total fees cannot exceed 10%");
        burnFeePercent = _burnFee;
        communityFeePercent = _communityFee;
        emit FeesUpdated(_burnFee, _communityFee);
    }

    function setMaxTxAmount(uint256 maxTx) external onlyOwner {
        require(maxTx >= 1_000_000 * 10 ** 18, "Max tx too small");
        maxTxAmount = maxTx;
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "ERC20: transfer from zero");
        require(to != address(0), "ERC20: transfer to zero");
        require(amount > 0, "Transfer amount must be > 0");

        if (from != owner() && to != owner()) {
            require(amount <= maxTxAmount, "Transfer amount exceeds maxTxAmount");
        }

        uint256 senderBalance = _balances[from];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");

        bool takeFee = !(_isExcludedFromFees[from] || _isExcludedFromFees[to]);

        uint256 burnAmount = 0;
        uint256 communityAmount = 0;

        if (takeFee) {
            burnAmount = (amount * burnFeePercent) / 100;
            communityAmount = (amount * communityFeePercent) / 100;
        }

        uint256 receiveAmount = amount - (burnAmount + communityAmount);

        unchecked {
            _balances[from] = senderBalance - amount;
            _balances[to] += receiveAmount;
        }
        emit Transfer(from, to, receiveAmount);

        if (burnAmount > 0) {
            _totalSupply -= burnAmount;
            emit Transfer(from, address(0), burnAmount);
        }

        if (communityAmount > 0) {
            _balances[communityWallet] += communityAmount;
            emit Transfer(from, communityWallet, communityAmount);
        }
    }

    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from zero");
        require(spender != address(0), "ERC20: approve to zero");
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
}
