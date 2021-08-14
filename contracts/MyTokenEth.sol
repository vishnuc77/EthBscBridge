pragma solidity ^0.8.0;

import "./MyToken.sol";

contract MyTokenEth is MyToken {
    constructor() MyToken("MyToken ETH", "METH") {}
}
