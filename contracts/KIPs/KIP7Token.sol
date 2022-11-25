// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@klaytn/contracts/KIP/token/KIP7/KIP7.sol";
contract KIP7Token is KIP7 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 _supply
    ) KIP7(name, symbol) {
        _mint(msg.sender, _supply * (10 ** decimals()));
    }
}