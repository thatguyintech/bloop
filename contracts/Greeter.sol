//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    bool private gm;

    event GM(address gmer, bool newGmValue);

    constructor() {
        console.log("Deploying a Greeter with gm value:", gm);
        gm = true;
    }

    function readState() public view returns (bool) {
        return gm;
    }

    function toggleGm() public {
        console.log("Changing gm from %s to %s", gm, !gm);
        gm = !gm;
        emit GM(msg.sender, gm);
    }
}
