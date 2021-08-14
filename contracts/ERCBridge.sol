pragma solidity ^0.8.0;

import "./MyTokenEth.sol";
import "./MyTokenBsc.sol";

contract ERCBridge {
    MyToken token;
    address public owner;

    constructor(address _token) {
        owner = msg.sender;
        token = MyToken(_token);
    }

    function mint(address _account, uint256 _amount) external {
        token.mintToken(_account, _amount);
    }

    function burn(address _account, uint256 _amount) external {
        token.burnToken(_account, _amount);
    }
}
