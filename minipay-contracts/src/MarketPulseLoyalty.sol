// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MarketPulseLoyalty {
    struct Campaign {
        address merchant;
        string name;
        uint256 pointsPerVisit;
        bool active;
    }
    
    uint256 public campaignCounter;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public userPoints; // campaignId => user => points
    
    event CampaignCreated(uint256 indexed campaignId, address indexed merchant, string name);
    event VisitLogged(uint256 indexed campaignId, address indexed customer, uint256 newTotalPoints);
    
    function createCampaign(string calldata name, uint256 pointsPerVisit) external returns (uint256) {
        uint256 campaignId = ++campaignCounter;
        campaigns[campaignId] = Campaign({
            merchant: msg.sender,
            name: name,
            pointsPerVisit: pointsPerVisit,
            active: true
        });
        
        emit CampaignCreated(campaignId, msg.sender, name);
        return campaignId;
    }
    
    function logVisit(uint256 campaignId, address customer) external {
        Campaign storage c = campaigns[campaignId];
        require(c.active, "Campaign inactive");
        require(msg.sender == c.merchant, "Only merchant can log visit");
        
        userPoints[campaignId][customer] += c.pointsPerVisit;
        
        emit VisitLogged(campaignId, customer, userPoints[campaignId][customer]);
    }
}
