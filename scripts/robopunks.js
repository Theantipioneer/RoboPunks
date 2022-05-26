const hre = require("hardhat");

async function main() {
    const RoboPunks = await hre.ethers.getContractFactory("RoboPunks");
    const roboPunks = await RoboPunks.deploy();

    await roboPunks.deployed();

    console.log("RoboPunks deployed to:", roboPunks.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
