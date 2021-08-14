pragma solidity ^0.8.0;

import "./ERCBridge.sol";

contract ERCBridgeEth is ERCBridge {
    constructor(address _token) ERCBridge(_token) {}
}
