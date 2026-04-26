// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../test/MockERC20.sol";
import "../src/CeloSaverVault.sol";
import "../src/ProofPayEscrow.sol";
import "../src/MarketPulseLoyalty.sol";
import "../src/BuilderCounter.sol";

contract DeployAutomation is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        MockERC20 mockCUSD = new MockERC20();
        
        // Mint 1,000,000 mock cUSD to the deployer
        mockCUSD.mint(vm.addr(deployerPrivateKey), 1000000 * 10**18);

        CeloSaverVault vault = new CeloSaverVault(address(mockCUSD));
        ProofPayEscrow escrow = new ProofPayEscrow(address(mockCUSD));
        MarketPulseLoyalty loyalty = new MarketPulseLoyalty();
        BuilderCounter counter = new BuilderCounter();

        vm.stopBroadcast();

        console.log("=== CELO AUTOMATION DEPLOYMENT ===");
        console.log("MockERC20 (cUSD) deployed to:", address(mockCUSD));
        console.log("CeloSaverVault deployed to:", address(vault));
        console.log("ProofPayEscrow deployed to:", address(escrow));
        console.log("MarketPulseLoyalty deployed to:", address(loyalty));
        console.log("BuilderCounter deployed to:", address(counter));
    }
}
