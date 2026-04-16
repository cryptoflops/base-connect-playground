// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuilderFlag {
    bool public flag;

    function toggle() public {
        flag = !flag;
    }
}
