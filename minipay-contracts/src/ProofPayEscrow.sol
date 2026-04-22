// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC20.sol";

contract ProofPayEscrow {
    IERC20 public immutable cUSD;
    
    struct Escrow {
        address client;
        address freelancer;
        uint256 amount;
        uint256 disputeTimeout;
        bool isReleased;
        bool isDisputed;
    }
    
    uint256 public escrowCounter;
    mapping(uint256 => Escrow) public escrows;
    
    event EscrowCreated(uint256 indexed escrowId, address indexed client, address indexed freelancer, uint256 amount);
    event EscrowReleased(uint256 indexed escrowId);
    event EscrowDisputed(uint256 indexed escrowId);
    event EscrowRefunded(uint256 indexed escrowId);
    
    constructor(address _cUSD) {
        cUSD = IERC20(_cUSD);
    }
    
    function createEscrow(address freelancer, uint256 amount) external returns (uint256) {
        require(amount > 0, "Amount must be > 0");
        require(cUSD.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        uint256 escrowId = ++escrowCounter;
        escrows[escrowId] = Escrow({
            client: msg.sender,
            freelancer: freelancer,
            amount: amount,
            disputeTimeout: block.timestamp + 7 days,
            isReleased: false,
            isDisputed: false
        });
        
        emit EscrowCreated(escrowId, msg.sender, freelancer, amount);
        return escrowId;
    }
    
    function releaseEscrow(uint256 escrowId) external {
        Escrow storage e = escrows[escrowId];
        require(msg.sender == e.client, "Only client can release");
        require(!e.isReleased, "Already released");
        require(!e.isDisputed, "Escrow disputed");
        
        e.isReleased = true;
        require(cUSD.transfer(e.freelancer, e.amount), "Transfer failed");
        emit EscrowReleased(escrowId);
    }
    
    function disputeEscrow(uint256 escrowId) external {
        Escrow storage e = escrows[escrowId];
        require(msg.sender == e.client || msg.sender == e.freelancer, "Not party to escrow");
        require(!e.isReleased, "Already released");
        e.isDisputed = true;
        emit EscrowDisputed(escrowId);
    }
    
    function claimRefund(uint256 escrowId) external {
        Escrow storage e = escrows[escrowId];
        require(msg.sender == e.client, "Only client can refund");
        require(block.timestamp > e.disputeTimeout, "Timeout not reached");
        require(!e.isReleased, "Already released");
        
        e.isReleased = true;
        require(cUSD.transfer(e.client, e.amount), "Transfer failed");
        emit EscrowRefunded(escrowId);
    }
}
