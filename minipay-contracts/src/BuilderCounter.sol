// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuilderCounter {
    uint256 public count;

    function inc() public {
        count++;
    }
}
