const { network }  = require("hardhat")

module.exports = async({getNamedAccounts, deployments}) => {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    await deploy("Voting", { 
        contract : "Storage",
        from : deployer,
        log : true
    })
}