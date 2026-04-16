// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuilderTimestamp {
    uint256 public lastPing;

    function ping() public {
        lastPing = block.timestamp;
    }
}
