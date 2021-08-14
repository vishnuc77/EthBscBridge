pragma solidity ^0.8.0;

import "./MyToken.sol";

contract MyTokenBsc is MyToken {
    constructor() MyToken("MyToken ETH", "MBSC") {}
}
