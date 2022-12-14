// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceRouter.sol";
import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceFeed.sol";

contract KlayUsdPriceFeed {

    IWitnetPriceRouter public  witnetPriceRouter;
    IWitnetPriceFeed public klayUsdtPrice;
    
    /*
     * Network: Klaytn Baobab
     * WitnetPriceRouter: 0xeD074DA2A76FD2Ca90C1508930b4FB4420e413B0
     **/
    constructor() {
        witnetPriceRouter = IWitnetPriceRouter(0xeD074DA2A76FD2Ca90C1508930b4FB4420e413B0);
        updateKlayUsdtPriceFeed();
    }

       /// Detects if the WitnetPriceRouter is now pointing to a different IWitnetPriceFeed implementation:
    function updateKlayUsdtPriceFeed() public {
        IERC165 _newPriceFeed = witnetPriceRouter.getPriceFeed(bytes4(0x5d9add33));
        if (address(_newPriceFeed) != address(0)) {
            klayUsdtPrice = IWitnetPriceFeed(address(_newPriceFeed));
        }
    }

    /// Returns the KlAY / USD price (6 decimals), ultimately provided by the Witnet oracle, and
    /// the timestamps at which the price was reported back from the Witnet oracle's sidechain 
    /// to Klaytn Baobab. 
     function getKlayUsdtPrice() external view returns (int256 _lastPrice, uint256 _lastTimestamp) {
        (_lastPrice, _lastTimestamp,,) = klayUsdtPrice.lastValue();
    }
    
}
