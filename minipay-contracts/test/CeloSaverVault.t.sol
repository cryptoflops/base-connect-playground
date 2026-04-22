// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/CeloSaverVault.sol";
import "./MockERC20.sol";

contract CeloSaverVaultTest is Test {
    CeloSaverVault public vault;
    MockERC20 public cUSD;
    
    address public user = address(0x123);
    
    function setUp() public {
        cUSD = new MockERC20();
        vault = new CeloSaverVault(address(cUSD));
        
        // Fund user
        cUSD.mint(user, 1000 ether);
        
        // Approve vault
        vm.prank(user);
        cUSD.approve(address(vault), type(uint256).max);
    }
    
    function test_Deposit() public {
        vm.prank(user);
        vault.deposit(100 ether);
        
        (uint256 balance, uint256 streak, uint256 lastDeposit) = vault.users(user);
        assertEq(balance, 100 ether);
        assertEq(streak, 1);
        assertEq(lastDeposit, block.timestamp);
        assertEq(cUSD.balanceOf(address(vault)), 100 ether);
    }
    
    function test_Withdraw() public {
        vm.prank(user);
        vault.deposit(100 ether);
        
        vm.prank(user);
        vault.withdraw(50 ether);
        
        (uint256 balance, , ) = vault.users(user);
        assertEq(balance, 50 ether);
        assertEq(cUSD.balanceOf(user), 950 ether);
    }
    
    function test_StreakIncrement() public {
        vm.prank(user);
        vault.deposit(100 ether);
        
        // Fast forward 1 day
        vm.warp(block.timestamp + 1 days);
        
        vm.prank(user);
        vault.deposit(100 ether);
        
        (, uint256 streak, ) = vault.users(user);
        assertEq(streak, 2);
    }
    
    function test_StreakBroken() public {
        vm.prank(user);
        vault.deposit(100 ether);
        
        // Fast forward 2 days (missed a day)
        vm.warp(block.timestamp + 2 days);
        
        vm.prank(user);
        vault.deposit(100 ether);
        
        (, uint256 streak, ) = vault.users(user);
        assertEq(streak, 1);
    }
}
