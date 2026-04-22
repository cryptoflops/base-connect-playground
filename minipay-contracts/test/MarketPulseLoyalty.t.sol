// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/MarketPulseLoyalty.sol";

contract MarketPulseLoyaltyTest is Test {
    MarketPulseLoyalty public loyalty;
    
    address public merchant = address(0x123);
    address public customer = address(0x456);
    
    function setUp() public {
        loyalty = new MarketPulseLoyalty();
    }
    
    function test_CreateCampaign() public {
        vm.prank(merchant);
        uint256 campaignId = loyalty.createCampaign("Coffee Rewards", 10);
        
        assertEq(campaignId, 1);
        (address cMerchant, string memory cName, uint256 cPoints, bool active) = loyalty.campaigns(1);
        assertEq(cMerchant, merchant);
        assertEq(cName, "Coffee Rewards");
        assertEq(cPoints, 10);
        assertTrue(active);
    }
    
    function test_LogVisit() public {
        vm.prank(merchant);
        loyalty.createCampaign("Coffee Rewards", 10);
        
        vm.prank(merchant);
        loyalty.logVisit(1, customer);
        
        uint256 points = loyalty.userPoints(1, customer);
        assertEq(points, 10);
        
        vm.prank(merchant);
        loyalty.logVisit(1, customer);
        
        points = loyalty.userPoints(1, customer);
        assertEq(points, 20);
    }
    
    function test_LogVisit_NotMerchant() public {
        vm.prank(merchant);
        loyalty.createCampaign("Coffee Rewards", 10);
        
        vm.prank(customer); // Unauthorized
        vm.expectRevert("Only merchant can log visit");
        loyalty.logVisit(1, customer);
    }
}
