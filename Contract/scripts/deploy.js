const hre = require("hardhat");

async function main() {
  const EduChainUnified = await hre.ethers.deployContract("EduChainUnified");
  await EduChainUnified.waitForDeployment();
  console.log(`Educhain contract deployed to ${EduChainUnified.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});