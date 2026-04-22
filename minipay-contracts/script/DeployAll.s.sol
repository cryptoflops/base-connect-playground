// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/CeloSaverVault.sol";
import "../src/ProofPayEscrow.sol";
import "../src/MarketPulseLoyalty.sol";

contract DeployAll is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Celo Sepolia cUSD Address
        address cUSDSepolia = 0xef6d34199F521876a401C4c87332F1469E54Bc80;

        vm.startBroadcast(deployerPrivateKey);

        CeloSaverVault vault = new CeloSaverVault(cUSDSepolia);
        ProofPayEscrow escrow = new ProofPayEscrow(cUSDSepolia);
        MarketPulseLoyalty loyalty = new MarketPulseLoyalty();

        vm.stopBroadcast();

        console.log("CeloSaverVault deployed to:", address(vault));
        console.log("ProofPayEscrow deployed to:", address(escrow));
        console.log("MarketPulseLoyalty deployed to:", address(loyalty));
    }
}
