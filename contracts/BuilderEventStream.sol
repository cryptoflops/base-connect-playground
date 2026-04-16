// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuilderEventStream {
    event NewMessage(string message);

    function push(string memory message) public {
        emit NewMessage(message);
    }
}
