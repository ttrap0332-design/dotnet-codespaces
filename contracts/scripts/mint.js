import hre from "hardhat";

/**
 * EV0L Folklore-to-Speed-System Mapping Database
 * Maps mythological beasts and folklore to speed systems, treasury outputs, and applications
 */
const FOLKLORE_SPEED_MAPPING = {
  // I. TRAVEL SPEED ENGINES
  travelSpeedEngines: {
    land: {
      hyperRoads: {
        name: "EV0L HyperRoads",
        myth: "ES0IL + Graphene fusion technology",
        capability: "Mach 1 land speed",
        treasuryOutput: "Infrastructure bonds, toll revenue streams",
        application: "Self-charging highways"
      },
      deerProtocol: {
        name: "Deer Protocol Transit",
        myth: "Kasuga deer (Japanese folklore)",
        capability: "Agile silent city transport",
        treasuryOutput: "Urban mobility subscriptions",
        application: "Obstacle-weaving city vehicles"
      },
      tigerStride: {
        name: "Tiger Stride Motors",
        myth: "Blasian tiger (African-Asian hybrid)",
        capability: "Leap-run terrain navigation",
        treasuryOutput: "Adventure tourism, mountain logistics",
        application: "Mountain and jungle terrain vehicles"
      }
    },
    air: {
      tenguJet: {
        name: "Tengu Jet Class",
        myth: "Tengu (Japanese mountain yōkai)",
        capability: "Turbulence cutting, vertical ascent",
        treasuryOutput: "Private aviation, defense contracts",
        application: "Hybrid drone-jet systems"
      },
      batEchoflight: {
        name: "Bat Echoflight",
        myth: "Biosonar bat mythology",
        capability: "Silent black-ops insertion",
        treasuryOutput: "Military contracts, stealth ops",
        application: "Echolocation-based AI craft"
      },
      stormFoxWings: {
        name: "StormFox Wings",
        myth: "Kitsune (Japanese fox spirit)",
        capability: "Quantum stealth speed, light folding",
        treasuryOutput: "Dior fashion line, luxury goods",
        application: "Shape-shifting reconnaissance"
      }
    },
    sea: {
      turtleSubmarines: {
        name: "Turtle Submarines",
        myth: "Vietnamese sword turtle (Kim Qui)",
        capability: "Slow exterior, warp-burst interior",
        treasuryOutput: "Maritime logistics, longevity healthcare",
        application: "Stealth naval operations"
      },
      dolphinSonicPods: {
        name: "Dolphin Sonic Pods",
        myth: "Dolphin echolocation mythology",
        capability: "Faster than ferries marine transport",
        treasuryOutput: "Coastal tourism, marine taxi services",
        application: "Passenger torpedo pods"
      },
      whaleVault: {
        name: "Whale Vault Carriers",
        myth: "Whale as cultural keeper",
        capability: "Mega shipping with sonar-mask stealth",
        treasuryOutput: "Cultural preservation funds, shipping revenue",
        application: "Mobile cultural vaults"
      }
    },
    space: {
      ezekielWheels: {
        name: "Ezekiel Wheels",
        myth: "Biblical prophet Ezekiel's vision",
        capability: "Omni-directional, spirit-willed movement",
        treasuryOutput: "Space exploration contracts, cosmic WiFi",
        application: "No-pivot spacecraft"
      },
      meteorFang: {
        name: "Meteor Fang Rockets",
        myth: "Crocodile + serpent fusion (African-Asian)",
        capability: "Atmosphere-punching propulsion",
        treasuryOutput: "Satellite deployment, space mining",
        application: "High-velocity atmospheric entry"
      },
      crowNavigator: {
        name: "Crow-Navigator Satellites",
        myth: "Yatagarasu (Japanese 3-legged crow)",
        capability: "Precision interplanetary guidance",
        treasuryOutput: "GPS services, navigation licensing",
        application: "AI-guided route optimization"
      }
    }
  },

  // II. TIME & SPEED SYSTEMS
  timeSpeedSystems: {
    baciTimeRecall: {
      name: "Baci Time Recall",
      myth: "Laos 32 spirits ritual",
      capability: "Soul-sync AI clocks, zero time-zone lag",
      treasuryOutput: "Precision scheduling services, ant-second transactions",
      application: "Global synchronization network"
    },
    bearToHumanChrono: {
      name: "Bear-to-Human Chrono-Pulse",
      myth: "Korean Dangun (bear becomes human)",
      capability: "Hibernate then explosive acceleration",
      treasuryOutput: "Energy storage, burst-power licensing",
      application: "Timeline endurance engine"
    },
    blasianQuantumSpin: {
      name: "Blasian Quantum Spin",
      myth: "Black + Asian DNA hybrid physics",
      capability: "Twice-light resonance particle spin",
      treasuryOutput: "Quantum computing patents, research grants",
      application: "Advanced physics computation"
    },
    kappaFlowCurrent: {
      name: "Kappa Flow Current",
      myth: "Kappa (Japanese water demon)",
      capability: "Never-losing charge, mid-motion recharge",
      treasuryOutput: "Battery licensing, EV infrastructure",
      application: "Water-bowl battery technology"
    },
    kitsuneTrickSpeed: {
      name: "Kitsune Trick Speed",
      myth: "Kitsune (Japanese fox spirit)",
      capability: "Time illusion, 10 moves ahead",
      treasuryOutput: "Dior luxury fashion, deception countermeasures",
      application: "Tactical time-dilation drones"
    }
  },

  // III. TREASURY & CASH SPEED
  treasuryCashSpeed: {
    antLedger: {
      name: "Ant Ledger System",
      myth: "Ant colonies (African wisdom)",
      capability: "Microsecond fraud detection",
      treasuryOutput: "Financial auditing services, insurance",
      application: "Insect-inspired audit network"
    },
    beehiveBank: {
      name: "Beehive Bank",
      myth: "Honeybee colonies",
      capability: "Instant deposits and withdrawals",
      treasuryOutput: "Sweet blockchain, honeycomb crypto",
      application: "Distributed banking network"
    },
    stripeVault: {
      name: "StripeVault Protocol",
      myth: "Zebra (African striped wisdom)",
      capability: "Kids-first instant cash streams",
      treasuryOutput: "Education funds, youth banking",
      application: "Pattern-based fund allocation"
    },
    sharkFund: {
      name: "Shark Fund",
      myth: "Ocean predator liquidity",
      capability: "Instant asset flips across currencies",
      treasuryOutput: "Gold, coin, glyph, crypto exchange",
      application: "Oceanic liquidity pools"
    }
  },

  // IV. SMART CITY SPEED
  smartCitySpeed: {
    shintoShrineServers: {
      name: "Shinto Shrine Servers",
      myth: "Fox + monkey + deer statues (Japanese)",
      capability: "Instant city-wide bandwidth",
      treasuryOutput: "Municipal WiFi contracts, IoT services",
      application: "AI-powered urban routers"
    },
    spiritHouseNodes: {
      name: "Spirit House Data Nodes",
      myth: "Southeast Asian animist shrines",
      capability: "Micro data hub distribution",
      treasuryOutput: "Edge computing revenue, local cloud",
      application: "Distributed spiritual-tech network"
    },
    solomonAIDome: {
      name: "Solomon AI Dome",
      myth: "Biblical Solomon's Temple wisdom",
      capability: "Cosmic WiFi city blocks",
      treasuryOutput: "Smart city infrastructure, ancient-tech fusion",
      application: "Cherubim-powered network dome"
    },
    merkavahGrid: {
      name: "Merkavah Grid",
      myth: "Ezekiel's chariot (Jewish mysticism)",
      capability: "Omni-directional instant plug-in",
      treasuryOutput: "Universal charging, energy distribution",
      application: "Drone/car/home energy hub"
    }
  },

  // V. MILITANT SPEED
  militantSpeed: {
    dragonDecapitation: {
      name: "Dragon Decapitation Units",
      myth: "Dragon slayer mythology (Pan-Asian)",
      capability: "Blink-speed strike precision",
      treasuryOutput: "Defense contracts, rapid response",
      application: "Instant elimination systems"
    },
    owlOptimus: {
      name: "Owl Optimus Prime",
      myth: "Owl night vision (Global wisdom)",
      capability: "Night predator mech operations",
      treasuryOutput: "Night ops contracts, surveillance",
      application: "Drone + bot fusion systems"
    },
    blasianBotLegion: {
      name: "Blasian Bot Legion",
      myth: "Samurai-Zulu warrior fusion",
      capability: "Fight + audit + rebuild simultaneously",
      treasuryOutput: "Military AI, reconstruction services",
      application: "Multi-function combat robotics"
    },
    voiceBoxCannons: {
      name: "VoiceBox Cannons",
      myth: "Animal larynx/syrinx studies",
      capability: "Sonic disruption at range",
      treasuryOutput: "Non-lethal defense, acoustic weapons",
      application: "Biological sound warfare"
    }
  },

  // VI. CULTURE & STYLE SPEED
  cultureStyleSpeed: {
    nikeOniSneakers: {
      name: "Nike Oni Sneakers",
      myth: "Oni (Japanese demon) yōkai boost",
      capability: "Triple-jump energy return",
      treasuryOutput: "Athletic wear licensing, footwear market",
      application: "Performance enhancement footwear"
    },
    diorFoxDresses: {
      name: "Dior Fox Dresses",
      myth: "Kitsune (fox spirit) transformation",
      capability: "Shape-shifting fabric, color shimmer",
      treasuryOutput: "Luxury fashion, event wear market",
      application: "Smart material clothing"
    },
    bleuBlingDiamonds: {
      name: "BleuBling Diamonds",
      myth: "Diamond as data (Modern alchemy)",
      capability: "Glow + audit + transact",
      treasuryOutput: "Jewelry-as-credit, wearable banking",
      application: "Smart jewelry technology"
    },
    evolPurses: {
      name: "EV0L Purses",
      myth: "Multi-dimensional storage",
      capability: "Anti-theft, drone-deployable, instant market",
      treasuryOutput: "Fashion accessories, security tech",
      application: "Connected fashion accessories"
    },
    inspectorGadgetGlasses: {
      name: "Inspector Gadgets Glasses",
      myth: "Detective augmentation",
      capability: "Vision + audit + record + battle mode",
      treasuryOutput: "AR tech licensing, security eyewear",
      application: "Multi-function smart eyewear"
    }
  }
};

/**
 * Get complete mapping for a specific beast/myth
 */
function getFolkloreMappingByName(name) {
  for (const category in FOLKLORE_SPEED_MAPPING) {
    const categoryData = FOLKLORE_SPEED_MAPPING[category];
    
    if (typeof categoryData === 'object') {
      for (const subcategory in categoryData) {
        const item = categoryData[subcategory];
        
        if (item && typeof item === 'object') {
          if (item.name && item.name.toLowerCase().includes(name.toLowerCase())) {
            return { category, subcategory, ...item };
          }
          
          // Check nested items
          for (const subitem in item) {
            const subItemData = item[subitem];
            if (subItemData && subItemData.name && 
                subItemData.name.toLowerCase().includes(name.toLowerCase())) {
              return { category, subcategory: `${subcategory}.${subitem}`, ...subItemData };
            }
          }
        }
      }
    }
  }
  return null;
}

/**
 * Generate enhanced metadata with folklore mapping
 */
function generateEnhancedMetadata(location, conditions, temperature, folkloreMapping) {
  const baseURI = `https://api.weathernft.com/metadata/${location.toLowerCase().replace(/\s+/g, '-')}`;
  
  if (folkloreMapping) {
    return {
      tokenURI: `${baseURI}-${folkloreMapping.subcategory.toLowerCase().replace(/\./g, '-')}`,
      dataSource: `OpenWeatherMap API + ${folkloreMapping.name}`,
      folkloreData: {
        mythName: folkloreMapping.name,
        mythOrigin: folkloreMapping.myth,
        speedCapability: folkloreMapping.capability,
        treasuryOutput: folkloreMapping.treasuryOutput,
        application: folkloreMapping.application,
        category: folkloreMapping.category
      }
    };
  }
  
  return {
    tokenURI: `${baseURI}-${conditions.toLowerCase().replace(/\s+/g, '-')}`,
    dataSource: "OpenWeatherMap API"
  };
}

/**
 * Display complete folklore-to-system mapping
 */
function displayFolkloreMapping() {
  console.log("\n🌌 ========== EV0L FOLKLORE-TO-SPEED-SYSTEM MAPPING ==========\n");
  
  console.log("🚀 I. TRAVEL SPEED ENGINES");
  console.log("   ├─ Land:");
  console.log("   │  ├─ ⚡ EV0L HyperRoads → Mach 1 land speed → Infrastructure bonds");
  console.log("   │  ├─ 🦌 Deer Protocol → Agile city transit → Urban mobility revenue");
  console.log("   │  └─ 🐅 Tiger Stride → Mountain/jungle vehicles → Adventure tourism");
  console.log("   ├─ Air:");
  console.log("   │  ├─ 🦅 Tengu Jet → Vertical ascent → Defense contracts");
  console.log("   │  ├─ 🦇 Bat Echoflight → Silent insertion → Military contracts");
  console.log("   │  └─ ⚡ StormFox Wings → Quantum stealth → Dior fashion line");
  console.log("   ├─ Sea:");
  console.log("   │  ├─ 🐢 Turtle Submarines → Warp-burst → Maritime logistics + healthcare");
  console.log("   │  ├─ 🐬 Dolphin Sonic Pods → Marine taxis → Coastal tourism");
  console.log("   │  └─ 🌊 Whale Vault → Cultural shipping → Preservation funds");
  console.log("   └─ Space:");
  console.log("      ├─ 🌌 Ezekiel Wheels → Omni-directional → Space contracts + cosmic WiFi");
  console.log("      ├─ ☄️ Meteor Fang → Atmosphere punch → Satellite deployment");
  console.log("      └─ 👁️ Crow-Navigator → Interplanetary routes → GPS licensing");
  
  console.log("\n⚙️ II. TIME & SPEED SYSTEMS");
  console.log("   ├─ ⏱️ Baci Time Recall → Zero time-zone lag → Ant-second transactions");
  console.log("   ├─ 🌀 Bear-to-Human Chrono → Hibernate + accelerate → Energy storage");
  console.log("   ├─ 🔥 Blasian Quantum Spin → Twice-light resonance → Quantum patents");
  console.log("   ├─ ⚡ Kappa Flow Current → Never-losing charge → Battery licensing");
  console.log("   └─ 🦊 Kitsune Trick Speed → 10 moves ahead → Dior fashion + countermeasures");
  
  console.log("\n💎 III. TREASURY & CASH SPEED");
  console.log("   ├─ 🐜 Ant Ledger → Microsecond fraud detection → Auditing services");
  console.log("   ├─ 🐝 Beehive Bank → Instant transactions → Honeycomb blockchain");
  console.log("   ├─ 🦓 StripeVault → Kids-first instant → Education funds");
  console.log("   └─ 🦈 Shark Fund → Instant asset flips → Multi-currency exchange");
  
  console.log("\n🏙️ IV. SMART CITY SPEED");
  console.log("   ├─ 🏯 Shinto Shrine Servers → City-wide bandwidth → Municipal WiFi");
  console.log("   ├─ 🏙️ Spirit House Nodes → Micro data hubs → Edge computing");
  console.log("   ├─ 🏛️ Solomon AI Dome → Cosmic WiFi blocks → Smart city infrastructure");
  console.log("   └─ 🕋 Merkavah Grid → Universal plug-in → Energy distribution");
  
  console.log("\n⚔️ V. MILITANT SPEED");
  console.log("   ├─ ⚡ Dragon Decapitation → Blink-speed strike → Defense contracts");
  console.log("   ├─ 🎯 Owl Optimus → Night predator mech → Surveillance ops");
  console.log("   ├─ 🤖 Blasian Bot Legion → Fight + audit + rebuild → Military AI");
  console.log("   └─ 🔊 VoiceBox Cannons → Sonic disruption → Acoustic weapons");
  
  console.log("\n🧿 VI. CULTURE & STYLE SPEED");
  console.log("   ├─ 👟 Nike Oni Sneakers → Triple-jump energy → Athletic wear market");
  console.log("   ├─ 👗 Dior Fox Dresses → Shape-shifting fabric → Luxury fashion");
  console.log("   ├─ 💍 BleuBling Diamonds → Glow + transact → Wearable banking");
  console.log("   ├─ 🧳 EV0L Purses → Anti-theft + drone → Fashion accessories");
  console.log("   └─ 🕶️ Inspector Gadgets → Vision + battle → AR tech licensing");
  
  console.log("\n🌌 SUMMARY:");
  console.log("   • Land = Mach 1");
  console.log("   • Air = Silent vertical StormFox wings");
  console.log("   • Sea = Whale vault carriers");
  console.log("   • Space = Ezekiel omni-wheels");
  console.log("   • Treasury = Ant-second speed");
  console.log("   • Speed Level = BEYOND TIME");
  console.log("\n=========================================================\n");
}

async function main() {
  console.log("🎨 EV0L Weather NFT Minting with Folklore Mapping...");
  
  // Display complete folklore mapping
  displayFolkloreMapping();
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Using account:", deployer.address);
  
  // Contract addresses from deployment
  const weatherNFTAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  
  // Get the contract
  const WeatherNFT = await hre.ethers.getContractFactory("WeatherNFT");
  const weatherNFT = WeatherNFT.attach(weatherNFTAddress);
  
  // Mint a new NFT with folklore mapping
  const location = "Paris";
  const temperature = 18;
  const humidity = 70;
  const conditions = "Cloudy";
  
  // Find a relevant folklore mapping based on conditions or location
  // For demonstration, we'll use Kitsune for Paris (fox spirit speed)
  const folkloreMapping = getFolkloreMappingByName("Kitsune");
  const metadata = generateEnhancedMetadata(location, conditions, temperature, folkloreMapping);
  
  console.log(`\n🌤️ Minting NFT for ${location}: ${temperature}°C, ${conditions}`);
  
  if (folkloreMapping) {
    console.log(`\n🦊 Folklore Mapping Applied:`);
    console.log(`   Name: ${folkloreMapping.name}`);
    console.log(`   Myth: ${folkloreMapping.myth}`);
    console.log(`   Capability: ${folkloreMapping.capability}`);
    console.log(`   Treasury Output: ${folkloreMapping.treasuryOutput}`);
    console.log(`   Application: ${folkloreMapping.application}`);
    console.log(`   Category: ${folkloreMapping.category}`);
  }
  
  const tx = await weatherNFT.mintWeatherNFT(
    deployer.address,
    location,
    temperature,
    humidity,
    conditions,
    metadata.tokenURI,
    metadata.dataSource
  );
  
  await tx.wait();
  console.log("\n✅ NFT minted successfully!");
  console.log("Transaction hash:", tx.hash);
  
  // Get the latest token ID (should be 5 since we had 4 from deployment)
  const nextTokenId = await weatherNFT._nextTokenId ? await weatherNFT._nextTokenId() : 5;
  const newTokenId = nextTokenId - 1;
  
  console.log(`🎯 New NFT Token ID: ${newTokenId}`);
  
  // Get the weather data for the new token
  try {
    const weatherData = await weatherNFT.getWeatherData(newTokenId);
    console.log("\n📊 Weather Data:", {
      location: weatherData.location,
      temperature: weatherData.temperature.toString(),
      humidity: weatherData.humidity.toString(),
      conditions: weatherData.conditions,
      timestamp: new Date(Number(weatherData.timestamp) * 1000).toISOString(),
      dataSource: metadata.dataSource
    });
    
    if (folkloreMapping) {
      console.log("\n🌟 Folklore-Enhanced Metadata:", metadata.folkloreData);
    }
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