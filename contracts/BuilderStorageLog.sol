// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuilderStorageLog {
    event ValueStored(string value);

    function store(string memory _value) public {
        emit ValueStored(_value);
    }
}
