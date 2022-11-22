// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/utils/Counters.sol";

contract KIP17Token is KIP17 {

      using Counters for Counters.Counter;
      Counters.Counter private currentTokenId;
    constructor() KIP17("myNFT", "MNFT") {}

      function mintTo(address recipient)
        public
        returns (uint256)
    {
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }

}