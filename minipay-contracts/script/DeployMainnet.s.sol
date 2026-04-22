// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/CeloSaverVault.sol";
import "../src/ProofPayEscrow.sol";
import "../src/MarketPulseLoyalty.sol";

contract DeployMainnet is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Celo Mainnet cUSD Address
        address cUSD = 0x765DE816845861e75A25fCA122bb6898B8B1282a;

        vm.startBroadcast(deployerPrivateKey);

        CeloSaverVault vault = new CeloSaverVault(cUSD);
        ProofPayEscrow escrow = new ProofPayEscrow(cUSD);
        MarketPulseLoyalty loyalty = new MarketPulseLoyalty();

        vm.stopBroadcast();

        console.log("=== CELO MAINNET DEPLOYMENT ===");
        console.log("CeloSaverVault deployed to:", address(vault));
        console.log("ProofPayEscrow deployed to:", address(escrow));
        console.log("MarketPulseLoyalty deployed to:", address(loyalty));
    }
}
