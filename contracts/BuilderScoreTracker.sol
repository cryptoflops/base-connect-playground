// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuilderScoreTracker {
    mapping(address => uint256) public scores;

    function increment(uint256 amount) public {
        scores[msg.sender] += amount;
    }

    function getScore(address user) public view returns (uint256) {
        return scores[user];
    }
}
