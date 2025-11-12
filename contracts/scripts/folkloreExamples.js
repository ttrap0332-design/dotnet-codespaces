import hre from "hardhat";
import {
  getFolkloreMappingByName,
  getRandomFolkloreMapping,
  searchFolkloreMappings,
  getAllFolkloreMappings,
  displayFolkloreMapping
} from './folkloreUtils.js';

/**
 * Example script demonstrating folklore mapping system
 * Shows how to mint NFTs with different mythological themes
 */

async function mintWithFolklore(weatherNFT, deployer, location, temp, humidity, conditions, folkloreName) {
  const folkloreMapping = getFolkloreMappingByName(folkloreName);
  
  if (!folkloreMapping) {
    console.log(`❌ Folklore "${folkloreName}" not found`);
    return;
  }

  console.log(`\n${folkloreMapping.icon} Minting with ${folkloreMapping.name}`);
  console.log(`   Location: ${location}`);
  console.log(`   Weather: ${temp}°C, ${conditions}, ${humidity}% humidity`);
  console.log(`   Myth: ${folkloreMapping.myth}`);
  console.log(`   Capability: ${folkloreMapping.capability}`);
  console.log(`   Treasury: ${folkloreMapping.treasuryOutput}`);

  const tokenURI = `https://api.weathernft.com/metadata/${location.toLowerCase()}-${folkloreName.toLowerCase()}`;
  const dataSource = `OpenWeatherMap API + ${folkloreMapping.name}`;

  const tx = await weatherNFT.mintWeatherNFT(
    deployer.address,
    location,
    temp,
    humidity,
    conditions,
    tokenURI,
    dataSource
  );

  await tx.wait();
  console.log(`   ✅ Minted successfully! TX: ${tx.hash}`);
}

async function main() {
  console.log("🎨 EV0L Folklore NFT Minting Examples\n");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Using account:", deployer.address);
  
  // Contract addresses from deployment
  const weatherNFTAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  
  // Get the contract
  const WeatherNFT = await hre.ethers.getContractFactory("WeatherNFT");
  const weatherNFT = WeatherNFT.attach(weatherNFTAddress);

  console.log("\n========================================");
  console.log("EXAMPLE 1: Specific Folklore Mapping");
  console.log("========================================");
  
  // Display the complete mapping system first
  displayFolkloreMapping();

  console.log("\n========================================");
  console.log("EXAMPLE 2: Mint with Different Folklore");
  console.log("========================================");

  // Example 1: Fox (Kitsune) - Air/Fashion/Finance
  await mintWithFolklore(
    weatherNFT,
    deployer,
    "Tokyo",
    28,
    55,
    "Clear",
    "Kitsune"
  );

  // Example 2: Turtle - Sea/Healthcare
  await mintWithFolklore(
    weatherNFT,
    deployer,
    "Hanoi",
    32,
    75,
    "Hot",
    "Turtle"
  );

  // Example 3: Dragon - Militant
  await mintWithFolklore(
    weatherNFT,
    deployer,
    "Seoul",
    22,
    60,
    "Partly Cloudy",
    "Dragon"
  );

  console.log("\n========================================");
  console.log("EXAMPLE 3: Random Folklore Selection");
  console.log("========================================");

  const randomFolklore = getRandomFolkloreMapping();
  console.log(`\n🎲 Randomly selected: ${randomFolklore.icon} ${randomFolklore.name}`);
  console.log(`   Category: ${randomFolklore.category}`);
  console.log(`   Capability: ${randomFolklore.capability}`);
  
  console.log("\n========================================");
  console.log("EXAMPLE 4: Search Folklore by Keyword");
  console.log("========================================");

  console.log("\n🔍 Searching for 'speed' related folklore:");
  const speedResults = searchFolkloreMappings("speed");
  speedResults.slice(0, 3).forEach(result => {
    console.log(`   ${result.icon} ${result.name} - ${result.capability}`);
  });

  console.log("\n🔍 Searching for 'quantum' related folklore:");
  const quantumResults = searchFolkloreMappings("quantum");
  quantumResults.forEach(result => {
    console.log(`   ${result.icon} ${result.name} - ${result.capability}`);
  });

  console.log("\n========================================");
  console.log("EXAMPLE 5: All Available Folklore");
  console.log("========================================");

  const allMappings = getAllFolkloreMappings();
  console.log(`\n📊 Total folklore mappings available: ${allMappings.length}`);
  
  // Group by category
  const byCategory = {};
  allMappings.forEach(mapping => {
    if (!byCategory[mapping.category]) {
      byCategory[mapping.category] = [];
    }
    byCategory[mapping.category].push(mapping);
  });

  console.log("\n📈 Breakdown by category:");
  for (const [category, mappings] of Object.entries(byCategory)) {
    console.log(`   ${category}: ${mappings.length} mappings`);
  }

  console.log("\n========================================");
  console.log("EXAMPLE 6: Complete Beast-to-System Map");
  console.log("========================================");

  console.log("\n🦊 FOX (Kitsune) Complete System:");
  const foxMappings = searchFolkloreMappings("fox");
  foxMappings.forEach(fox => {
    console.log(`   • ${fox.name}`);
    console.log(`     Vehicle/System: ${fox.application}`);
    console.log(`     Money Stream: ${fox.treasuryOutput}`);
    console.log(`     Category: ${fox.category}`);
  });

  console.log("\n🐢 TURTLE Complete System:");
  const turtleMappings = searchFolkloreMappings("turtle");
  turtleMappings.forEach(turtle => {
    console.log(`   • ${turtle.name}`);
    console.log(`     Vehicle: ${turtle.application}`);
    console.log(`     Money Stream: ${turtle.treasuryOutput}`);
    console.log(`     Healthcare: Longevity products tied to endurance myth`);
  });

  console.log("\n🐜 ANT Complete System:");
  const antMappings = searchFolkloreMappings("ant");
  antMappings.forEach(ant => {
    console.log(`   • ${ant.name}`);
    console.log(`     Financial System: ${ant.application}`);
    console.log(`     Money Stream: ${ant.treasuryOutput}`);
    console.log(`     Weapon: Economic warfare detection`);
  });

  console.log("\n========================================");
  console.log("SUMMARY");
  console.log("========================================");

  console.log("\n✨ EV0L Folklore System Features:");
  console.log("   ✓ 30+ mythological beast mappings");
  console.log("   ✓ 6 major categories (Travel, Time, Treasury, City, Military, Culture)");
  console.log("   ✓ Every beast = Vehicle + Weapon + Fashion + Money Stream");
  console.log("   ✓ Cultural integration (African, Asian, Biblical, Global)");
  console.log("   ✓ Beyond-time speed capabilities");
  console.log("   ✓ Ant-second treasury operations");
  
  console.log("\n🌌 Speed Levels:");
  console.log("   • Land: Mach 1");
  console.log("   • Air: Silent vertical (StormFox wings)");
  console.log("   • Sea: Whale vault carriers");
  console.log("   • Space: Ezekiel omni-wheels");
  console.log("   • Treasury: Ant-second speed");
  console.log("   • Overall: BEYOND TIME ⚡");

  console.log("\n🎯 Usage:");
  console.log("   • Import folkloreUtils.js functions");
  console.log("   • Search by name, keyword, or category");
  console.log("   • Generate enhanced NFT metadata");
  console.log("   • Link myths to treasury outputs");
  
  console.log("\n📚 Documentation:");
  console.log("   • See FOLKLORE_MAPPING.md for complete details");
  console.log("   • Each mapping includes myth origin and applications");
  console.log("   • Cultural respect statement included");
  
  console.log("\n🎉 Examples completed successfully!");
  console.log("=========================================\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Examples failed:");
    console.error(error);
    process.exit(1);
  });
