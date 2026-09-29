// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Pak Coin ($PAK)
 * @dev The official BEP-20 / ERC-20 smart contract for Pak Coin.
 * 
 * Features:
 * - Fixed Max Supply: 1,000,000,000 PAK
 * - OpenZeppelin Audited Standard Logic
 * - Deflationary Burning Mechanism
 * - Emergency Pause / Unpause Security Guard
 * - Batch Airdrop / Distribution Helper
 * - Accidental Token Rescue Guard
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

interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert("Ownable: invalid owner");
        }
        _transferOwnership(initialOwner);
    }

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is zero address");
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

abstract contract Pausable is Context {
    bool private _paused;

    event Paused(address account);
    event Unpaused(address account);

    constructor() {
        _paused = false;
    }

    modifier whenNotPaused() {
        _requireNotPaused();
        _;
    }

    modifier whenPaused() {
        _requirePaused();
        _;
    }

    function paused() public view virtual returns (bool) {
        return _paused;
    }

    function _requireNotPaused() internal view virtual {
        require(!paused(), "Pausable: paused");
    }

    function _requirePaused() internal view virtual {
        require(paused(), "Pausable: not paused");
    }

    function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(_msgSender());
    }

    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(_msgSender());
    }
}

contract PakCoin is Context, IERC20, IERC20Metadata, Ownable, Pausable {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;
    string private constant _NAME = "Pak Coin";
    string private constant _SYMBOL = "PAK";
    uint8 private constant _DECIMALS = 18;

    uint256 public constant INITIAL_SUPPLY = 1_000_000_000 * 10 ** _DECIMALS; // 1 Billion PAK

    event TokensBurned(address indexed burner, uint256 amount);
    event BatchTransferCompleted(uint256 totalTransfers, uint256 totalAmount);

    /**
     * @dev Sets deployer as initial owner and mints fixed total supply to owner.
     */
    constructor() Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function name() public pure override returns (string memory) {
        return _NAME;
    }

    function symbol() public pure override returns (string memory) {
        return _SYMBOL;
    }

    function decimals() public pure override returns (uint8) {
        return _DECIMALS;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 value) public override returns (bool) {
        address sender = _msgSender();
        _transfer(sender, to, value);
        return true;
    }

    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 value) public override returns (bool) {
        address sender = _msgSender();
        _approve(sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }

    /**
     * @dev Allows any token holder to burn their tokens permanently, reducing total supply.
     */
    function burn(uint256 amount) public whenNotPaused {
        _burn(_msgSender(), amount);
        emit TokensBurned(_msgSender(), amount);
    }

    /**
     * @dev Burns tokens from an approved spender account.
     */
    function burnFrom(address account, uint256 amount) public whenNotPaused {
        _spendAllowance(account, _msgSender(), amount);
        _burn(account, amount);
        emit TokensBurned(account, amount);
    }

    /**
     * @dev Emergency pause by owner in case of security threat.
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause transfers.
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Airdrop helper to send tokens to multiple addresses in a single transaction.
     * Saves gas during community distribution and rewards.
     */
    function batchTransfer(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external whenNotPaused returns (bool) {
        require(recipients.length == amounts.length, "PakCoin: recipients and amounts length mismatch");
        require(recipients.length > 0, "PakCoin: empty recipients array");

        address sender = _msgSender();
        uint256 totalAmount = 0;

        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "PakCoin: cannot transfer to zero address");
            _transfer(sender, recipients[i], amounts[i]);
            totalAmount += amounts[i];
        }

        emit BatchTransferCompleted(recipients.length, totalAmount);
        return true;
    }

    /**
     * @dev Allows owner to rescue any accidental ERC20 tokens sent to this contract address.
     */
    function rescueForeignToken(address tokenAddress, address to, uint256 amount) external onlyOwner {
        require(tokenAddress != address(this), "PakCoin: cannot rescue native PAK tokens");
        require(to != address(0), "PakCoin: cannot transfer to zero address");
        IERC20(tokenAddress).transfer(to, amount);
    }

    // ================= Internal Logic ================= //

    function _transfer(address from, address to, uint256 value) internal whenNotPaused {
        require(from != address(0), "ERC20: transfer from zero address");
        require(to != address(0), "ERC20: transfer to zero address");

        uint256 fromBalance = _balances[from];
        require(fromBalance >= value, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - value;
            _balances[to] += value;
        }

        emit Transfer(from, to, value);
    }

    function _mint(address account, uint256 value) internal {
        require(account != address(0), "ERC20: mint to zero address");
        _totalSupply += value;
        unchecked {
            _balances[account] += value;
        }
        emit Transfer(address(0), account, value);
    }

    function _burn(address account, uint256 value) internal {
        require(account != address(0), "ERC20: burn from zero address");

        uint256 accountBalance = _balances[account];
        require(accountBalance >= value, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - value;
            _totalSupply -= value;
        }

        emit Transfer(account, address(0), value);
    }

    function _approve(address owner, address spender, uint256 value) internal {
        require(owner != address(0), "ERC20: approve from zero address");
        require(spender != address(0), "ERC20: approve to zero address");

        _allowances[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    function _spendAllowance(address owner, address spender, uint256 value) internal {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= value, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - value);
            }
        }
    }
}
