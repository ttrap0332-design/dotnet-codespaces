import hre from "hardhat";

async function main() {
  console.log("🎨 Minting a new Weather NFT...");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Using account:", deployer.address);
  
  // Contract addresses from deployment
  const weatherNFTAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  
  // Get the contract
  const WeatherNFT = await hre.ethers.getContractFactory("WeatherNFT");
  const weatherNFT = WeatherNFT.attach(weatherNFTAddress);
  
  // Mint a new NFT for Paris
  const location = "Paris";
  const temperature = 18;
  const humidity = 70;
  const conditions = "Cloudy";
  const tokenURI = `https://api.weathernft.com/metadata/paris-cloudy`;
  const dataSource = "OpenWeatherMap API";
  
  console.log(`🌤️ Minting NFT for ${location}: ${temperature}°C, ${conditions}`);
  
  const tx = await weatherNFT.mintWeatherNFT(
    deployer.address,
    location,
    temperature,
    humidity,
    conditions,
    tokenURI,
    dataSource
  );
  
  await tx.wait();
  console.log("✅ NFT minted successfully!");
  console.log("Transaction hash:", tx.hash);
  
  // Get the latest token ID (should be 5 since we had 4 from deployment)
  const nextTokenId = await weatherNFT._nextTokenId ? await weatherNFT._nextTokenId() : 5;
  const newTokenId = nextTokenId - 1;
  
  console.log(`🎯 New NFT Token ID: ${newTokenId}`);
  
  // Get the weather data for the new token
  try {
    const weatherData = await weatherNFT.getWeatherData(newTokenId);
    console.log("📊 Weather Data:", {
      location: weatherData.location,
      temperature: weatherData.temperature.toString(),
      humidity: weatherData.humidity.toString(),
      conditions: weatherData.conditions,
      timestamp: new Date(Number(weatherData.timestamp) * 1000).toISOString()
    });
  } catch (error) {
    console.log("Could not retrieve weather data:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Minting failed:");
    console.error(error);
    process.exit(1);
  });