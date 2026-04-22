// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/ProofPayEscrow.sol";
import "./MockERC20.sol";

contract ProofPayEscrowTest is Test {
    ProofPayEscrow public escrow;
    MockERC20 public cUSD;
    
    address public client = address(0x123);
    address public freelancer = address(0x456);
    
    function setUp() public {
        cUSD = new MockERC20();
        escrow = new ProofPayEscrow(address(cUSD));
        
        cUSD.mint(client, 1000 ether);
        
        vm.prank(client);
        cUSD.approve(address(escrow), type(uint256).max);
    }
    
    function test_CreateEscrow() public {
        vm.prank(client);
        uint256 escrowId = escrow.createEscrow(freelancer, 100 ether);
        
        assertEq(escrowId, 1);
        (address eClient, address eFreelancer, uint256 amount, uint256 timeout, bool released, bool disputed) = escrow.escrows(1);
        
        assertEq(eClient, client);
        assertEq(eFreelancer, freelancer);
        assertEq(amount, 100 ether);
        assertEq(timeout, block.timestamp + 7 days);
        assertFalse(released);
        assertFalse(disputed);
        assertEq(cUSD.balanceOf(address(escrow)), 100 ether);
    }
    
    function test_ReleaseEscrow() public {
        vm.prank(client);
        escrow.createEscrow(freelancer, 100 ether);
        
        vm.prank(client);
        escrow.releaseEscrow(1);
        
        (,,,, bool released, ) = escrow.escrows(1);
        assertTrue(released);
        assertEq(cUSD.balanceOf(freelancer), 100 ether);
    }
    
    function test_DisputeEscrow() public {
        vm.prank(client);
        escrow.createEscrow(freelancer, 100 ether);
        
        vm.prank(freelancer);
        escrow.disputeEscrow(1);
        
        (,,,,, bool disputed) = escrow.escrows(1);
        assertTrue(disputed);
        
        vm.prank(client);
        vm.expectRevert("Escrow disputed");
        escrow.releaseEscrow(1);
    }
    
    function test_ClaimRefund_BeforeTimeout() public {
        vm.prank(client);
        escrow.createEscrow(freelancer, 100 ether);
        
        vm.prank(client);
        vm.expectRevert("Timeout not reached");
        escrow.claimRefund(1);
    }
    
    function test_ClaimRefund_AfterTimeout() public {
        vm.prank(client);
        escrow.createEscrow(freelancer, 100 ether);
        
        vm.warp(block.timestamp + 7 days + 1 seconds);
        
        vm.prank(client);
        escrow.claimRefund(1);
        
        (,,,, bool released, ) = escrow.escrows(1);
        assertTrue(released);
        assertEq(cUSD.balanceOf(client), 1000 ether); // Fully refunded
    }
}
