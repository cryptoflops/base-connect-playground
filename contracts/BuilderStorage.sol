// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuilderStorage {
    string public value;

    function store(string memory _value) public {
        value = _value;
    }
}
