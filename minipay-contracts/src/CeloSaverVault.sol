// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC20.sol";

contract CeloSaverVault {
    IERC20 public immutable cUSD;
    
    struct UserData {
        uint256 balance;
        uint256 currentStreak;
        uint256 lastDepositTime;
    }
    
    mapping(address => UserData) public users;
    
    event Deposited(address indexed user, uint256 amount, uint256 currentStreak);
    event Withdrawn(address indexed user, uint256 amount);
    
    constructor(address _cUSD) {
        cUSD = IERC20(_cUSD);
    }
    
    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(cUSD.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        UserData storage user = users[msg.sender];
        user.balance += amount;
        
        // Streak logic
        if (user.lastDepositTime == 0) {
            user.currentStreak = 1;
        } else {
            uint256 daysSinceLastDeposit = (block.timestamp - user.lastDepositTime) / 1 days;
            if (daysSinceLastDeposit == 1) {
                user.currentStreak += 1;
            } else if (daysSinceLastDeposit > 1) {
                user.currentStreak = 1; // broken streak
            }
        }
        
        user.lastDepositTime = block.timestamp;
        
        emit Deposited(msg.sender, amount, user.currentStreak);
    }
    
    function withdraw(uint256 amount) external {
        UserData storage user = users[msg.sender];
        require(user.balance >= amount, "Insufficient balance");
        
        user.balance -= amount;
        require(cUSD.transfer(msg.sender, amount), "Transfer failed");
        
        emit Withdrawn(msg.sender, amount);
    }
}
