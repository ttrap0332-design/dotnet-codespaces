import hre from "hardhat";

async function main() {
  console.log("Starting deployment of Weather contracts...");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");
  
  // Deploy WeatherOracle first
  console.log("\n🌦️  Deploying WeatherOracle...");
  const WeatherOracle = await hre.ethers.getContractFactory("WeatherOracle");
  const weatherOracle = await WeatherOracle.deploy(deployer.address);
  await weatherOracle.waitForDeployment();
  
  const oracleAddress = await weatherOracle.getAddress();
  console.log("✅ WeatherOracle deployed to:", oracleAddress);
  
  // Deploy WeatherNFT
  console.log("\n🎨 Deploying WeatherNFT...");
  const WeatherNFT = await hre.ethers.getContractFactory("WeatherNFT");
  const weatherNFT = await WeatherNFT.deploy(deployer.address);
  await weatherNFT.waitForDeployment();
  
  const nftAddress = await weatherNFT.getAddress();
  console.log("✅ WeatherNFT deployed to:", nftAddress);
  
  // Add some initial weather data
  console.log("\n📊 Adding initial weather data...");
  
  const locations = [
    { name: "New York", temp: 22, humidity: 65, conditions: "Partly Cloudy" },
    { name: "London", temp: 15, humidity: 78, conditions: "Rainy" },
    { name: "Tokyo", temp: 28, humidity: 55, conditions: "Sunny" },
    { name: "Sydney", temp: 25, humidity: 60, conditions: "Clear" }
  ];
  
  for (const location of locations) {
    await weatherOracle.updateWeather(
      location.name,
      location.temp,
      location.humidity,
      1013, // pressure in hPa
      location.conditions
    );
    console.log(`📍 Added weather data for ${location.name}: ${location.temp}°C, ${location.conditions}`);
  }
  
  // Mint some sample NFTs
  console.log("\n🎯 Minting sample Weather NFTs...");
  
  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    const tokenURI = `https://api.weathernft.com/metadata/${location.name.toLowerCase().replace(' ', '-')}`;
    
    const tx = await weatherNFT.mintWeatherNFT(
      deployer.address,
      location.name,
      location.temp,
      location.humidity,
      location.conditions,
      tokenURI,
      "OpenWeatherMap API"
    );
    
    console.log(`🏆 Minted WeatherNFT for ${location.name} - Token ID: ${i + 1}`);
  }
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📋 Contract Addresses:");
  console.log("WeatherOracle:", oracleAddress);
  console.log("WeatherNFT:", nftAddress);
  
  console.log("\n🔧 For .NET Integration, use these addresses in your appsettings.json:");
  console.log(`"Blockchain": {`);
  console.log(`  "WeatherOracleAddress": "${oracleAddress}",`);
  console.log(`  "WeatherNFTAddress": "${nftAddress}",`);
  console.log(`  "NetworkRpcUrl": "http://localhost:8545",`);
  console.log(`  "ChainId": 1337`);
  console.log(`}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });