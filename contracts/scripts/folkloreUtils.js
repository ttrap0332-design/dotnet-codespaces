/**
 * EV0L Folklore Speed System Utilities
 * Reusable functions for folklore-to-speed-system mapping
 */

/**
 * Complete folklore-to-speed-system mapping database
 */
export const FOLKLORE_SPEED_MAPPING = {
  travelSpeedEngines: {
    land: {
      hyperRoads: {
        name: "EV0L HyperRoads",
        myth: "ES0IL + Graphene fusion technology",
        capability: "Mach 1 land speed",
        treasuryOutput: "Infrastructure bonds, toll revenue streams",
        application: "Self-charging highways",
        icon: "⚡"
      },
      deerProtocol: {
        name: "Deer Protocol Transit",
        myth: "Kasuga deer (Japanese folklore)",
        capability: "Agile silent city transport",
        treasuryOutput: "Urban mobility subscriptions",
        application: "Obstacle-weaving city vehicles",
        icon: "🦌"
      },
      tigerStride: {
        name: "Tiger Stride Motors",
        myth: "Blasian tiger (African-Asian hybrid)",
        capability: "Leap-run terrain navigation",
        treasuryOutput: "Adventure tourism, mountain logistics",
        application: "Mountain and jungle terrain vehicles",
        icon: "🐅"
      }
    },
    air: {
      tenguJet: {
        name: "Tengu Jet Class",
        myth: "Tengu (Japanese mountain yōkai)",
        capability: "Turbulence cutting, vertical ascent",
        treasuryOutput: "Private aviation, defense contracts",
        application: "Hybrid drone-jet systems",
        icon: "🦅"
      },
      batEchoflight: {
        name: "Bat Echoflight",
        myth: "Biosonar bat mythology",
        capability: "Silent black-ops insertion",
        treasuryOutput: "Military contracts, stealth ops",
        application: "Echolocation-based AI craft",
        icon: "🦇"
      },
      stormFoxWings: {
        name: "StormFox Wings",
        myth: "Kitsune (Japanese fox spirit)",
        capability: "Quantum stealth speed, light folding",
        treasuryOutput: "Dior fashion line, luxury goods",
        application: "Shape-shifting reconnaissance",
        icon: "⚡"
      }
    },
    sea: {
      turtleSubmarines: {
        name: "Turtle Submarines",
        myth: "Vietnamese sword turtle (Kim Qui)",
        capability: "Slow exterior, warp-burst interior",
        treasuryOutput: "Maritime logistics, longevity healthcare",
        application: "Stealth naval operations",
        icon: "🐢"
      },
      dolphinSonicPods: {
        name: "Dolphin Sonic Pods",
        myth: "Dolphin echolocation mythology",
        capability: "Faster than ferries marine transport",
        treasuryOutput: "Coastal tourism, marine taxi services",
        application: "Passenger torpedo pods",
        icon: "🐬"
      },
      whaleVault: {
        name: "Whale Vault Carriers",
        myth: "Whale as cultural keeper",
        capability: "Mega shipping with sonar-mask stealth",
        treasuryOutput: "Cultural preservation funds, shipping revenue",
        application: "Mobile cultural vaults",
        icon: "🌊"
      }
    },
    space: {
      ezekielWheels: {
        name: "Ezekiel Wheels",
        myth: "Biblical prophet Ezekiel's vision",
        capability: "Omni-directional, spirit-willed movement",
        treasuryOutput: "Space exploration contracts, cosmic WiFi",
        application: "No-pivot spacecraft",
        icon: "🌌"
      },
      meteorFang: {
        name: "Meteor Fang Rockets",
        myth: "Crocodile + serpent fusion (African-Asian)",
        capability: "Atmosphere-punching propulsion",
        treasuryOutput: "Satellite deployment, space mining",
        application: "High-velocity atmospheric entry",
        icon: "☄️"
      },
      crowNavigator: {
        name: "Crow-Navigator Satellites",
        myth: "Yatagarasu (Japanese 3-legged crow)",
        capability: "Precision interplanetary guidance",
        treasuryOutput: "GPS services, navigation licensing",
        application: "AI-guided route optimization",
        icon: "👁️"
      }
    }
  },

  timeSpeedSystems: {
    baciTimeRecall: {
      name: "Baci Time Recall",
      myth: "Laos 32 spirits ritual",
      capability: "Soul-sync AI clocks, zero time-zone lag",
      treasuryOutput: "Precision scheduling services, ant-second transactions",
      application: "Global synchronization network",
      icon: "⏱️"
    },
    bearToHumanChrono: {
      name: "Bear-to-Human Chrono-Pulse",
      myth: "Korean Dangun (bear becomes human)",
      capability: "Hibernate then explosive acceleration",
      treasuryOutput: "Energy storage, burst-power licensing",
      application: "Timeline endurance engine",
      icon: "🌀"
    },
    blasianQuantumSpin: {
      name: "Blasian Quantum Spin",
      myth: "Black + Asian DNA hybrid physics",
      capability: "Twice-light resonance particle spin",
      treasuryOutput: "Quantum computing patents, research grants",
      application: "Advanced physics computation",
      icon: "🔥"
    },
    kappaFlowCurrent: {
      name: "Kappa Flow Current",
      myth: "Kappa (Japanese water demon)",
      capability: "Never-losing charge, mid-motion recharge",
      treasuryOutput: "Battery licensing, EV infrastructure",
      application: "Water-bowl battery technology",
      icon: "⚡"
    },
    kitsuneTrickSpeed: {
      name: "Kitsune Trick Speed",
      myth: "Kitsune (Japanese fox spirit)",
      capability: "Time illusion, 10 moves ahead",
      treasuryOutput: "Dior luxury fashion, deception countermeasures",
      application: "Tactical time-dilation drones",
      icon: "🦊"
    }
  },

  treasuryCashSpeed: {
    antLedger: {
      name: "Ant Ledger System",
      myth: "Ant colonies (African wisdom)",
      capability: "Microsecond fraud detection",
      treasuryOutput: "Financial auditing services, insurance",
      application: "Insect-inspired audit network",
      icon: "🐜"
    },
    beehiveBank: {
      name: "Beehive Bank",
      myth: "Honeybee colonies",
      capability: "Instant deposits and withdrawals",
      treasuryOutput: "Sweet blockchain, honeycomb crypto",
      application: "Distributed banking network",
      icon: "🐝"
    },
    stripeVault: {
      name: "StripeVault Protocol",
      myth: "Zebra (African striped wisdom)",
      capability: "Kids-first instant cash streams",
      treasuryOutput: "Education funds, youth banking",
      application: "Pattern-based fund allocation",
      icon: "🦓"
    },
    sharkFund: {
      name: "Shark Fund",
      myth: "Ocean predator liquidity",
      capability: "Instant asset flips across currencies",
      treasuryOutput: "Gold, coin, glyph, crypto exchange",
      application: "Oceanic liquidity pools",
      icon: "🦈"
    }
  },

  smartCitySpeed: {
    shintoShrineServers: {
      name: "Shinto Shrine Servers",
      myth: "Fox + monkey + deer statues (Japanese)",
      capability: "Instant city-wide bandwidth",
      treasuryOutput: "Municipal WiFi contracts, IoT services",
      application: "AI-powered urban routers",
      icon: "🏯"
    },
    spiritHouseNodes: {
      name: "Spirit House Data Nodes",
      myth: "Southeast Asian animist shrines",
      capability: "Micro data hub distribution",
      treasuryOutput: "Edge computing revenue, local cloud",
      application: "Distributed spiritual-tech network",
      icon: "🏙️"
    },
    solomonAIDome: {
      name: "Solomon AI Dome",
      myth: "Biblical Solomon's Temple wisdom",
      capability: "Cosmic WiFi city blocks",
      treasuryOutput: "Smart city infrastructure, ancient-tech fusion",
      application: "Cherubim-powered network dome",
      icon: "🏛️"
    },
    merkavahGrid: {
      name: "Merkavah Grid",
      myth: "Ezekiel's chariot (Jewish mysticism)",
      capability: "Omni-directional instant plug-in",
      treasuryOutput: "Universal charging, energy distribution",
      application: "Drone/car/home energy hub",
      icon: "🕋"
    }
  },

  militantSpeed: {
    dragonDecapitation: {
      name: "Dragon Decapitation Units",
      myth: "Dragon slayer mythology (Pan-Asian)",
      capability: "Blink-speed strike precision",
      treasuryOutput: "Defense contracts, rapid response",
      application: "Instant elimination systems",
      icon: "⚡"
    },
    owlOptimus: {
      name: "Owl Optimus Prime",
      myth: "Owl night vision (Global wisdom)",
      capability: "Night predator mech operations",
      treasuryOutput: "Night ops contracts, surveillance",
      application: "Drone + bot fusion systems",
      icon: "🎯"
    },
    blasianBotLegion: {
      name: "Blasian Bot Legion",
      myth: "Samurai-Zulu warrior fusion",
      capability: "Fight + audit + rebuild simultaneously",
      treasuryOutput: "Military AI, reconstruction services",
      application: "Multi-function combat robotics",
      icon: "🤖"
    },
    voiceBoxCannons: {
      name: "VoiceBox Cannons",
      myth: "Animal larynx/syrinx studies",
      capability: "Sonic disruption at range",
      treasuryOutput: "Non-lethal defense, acoustic weapons",
      application: "Biological sound warfare",
      icon: "🔊"
    }
  },

  cultureStyleSpeed: {
    nikeOniSneakers: {
      name: "Nike Oni Sneakers",
      myth: "Oni (Japanese demon) yōkai boost",
      capability: "Triple-jump energy return",
      treasuryOutput: "Athletic wear licensing, footwear market",
      application: "Performance enhancement footwear",
      icon: "👟"
    },
    diorFoxDresses: {
      name: "Dior Fox Dresses",
      myth: "Kitsune (fox spirit) transformation",
      capability: "Shape-shifting fabric, color shimmer",
      treasuryOutput: "Luxury fashion, event wear market",
      application: "Smart material clothing",
      icon: "👗"
    },
    bleuBlingDiamonds: {
      name: "BleuBling Diamonds",
      myth: "Diamond as data (Modern alchemy)",
      capability: "Glow + audit + transact",
      treasuryOutput: "Jewelry-as-credit, wearable banking",
      application: "Smart jewelry technology",
      icon: "💍"
    },
    evolPurses: {
      name: "EV0L Purses",
      myth: "Multi-dimensional storage",
      capability: "Anti-theft, drone-deployable, instant market",
      treasuryOutput: "Fashion accessories, security tech",
      application: "Connected fashion accessories",
      icon: "🧳"
    },
    inspectorGadgetGlasses: {
      name: "Inspector Gadgets Glasses",
      myth: "Detective augmentation",
      capability: "Vision + audit + record + battle mode",
      treasuryOutput: "AR tech licensing, security eyewear",
      application: "Multi-function smart eyewear",
      icon: "🕶️"
    }
  }
};

/**
 * Get folklore mapping by name (case-insensitive search)
 * @param {string} name - Name or partial name to search for
 * @returns {Object|null} Folklore mapping object or null if not found
 */
export function getFolkloreMappingByName(name) {
  const searchName = name.toLowerCase();
  
  for (const category in FOLKLORE_SPEED_MAPPING) {
    const categoryData = FOLKLORE_SPEED_MAPPING[category];
    
    if (typeof categoryData === 'object') {
      for (const subcategory in categoryData) {
        const item = categoryData[subcategory];
        
        if (item && typeof item === 'object') {
          if (item.name && item.name.toLowerCase().includes(searchName)) {
            return { category, subcategory, ...item };
          }
          
          // Check nested items
          for (const subitem in item) {
            const subItemData = item[subitem];
            if (subItemData && subItemData.name && 
                subItemData.name.toLowerCase().includes(searchName)) {
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
 * Get all folklore mappings for a specific category
 * @param {string} category - Category name
 * @returns {Object|null} Category object or null if not found
 */
export function getFolkloreByCategory(category) {
  return FOLKLORE_SPEED_MAPPING[category] || null;
}

/**
 * Get a random folklore mapping
 * @returns {Object} Random folklore mapping
 */
export function getRandomFolkloreMapping() {
  const categories = Object.keys(FOLKLORE_SPEED_MAPPING);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const categoryData = FOLKLORE_SPEED_MAPPING[randomCategory];
  
  const subcategories = Object.keys(categoryData);
  const randomSubcategory = subcategories[Math.floor(Math.random() * subcategories.length)];
  const item = categoryData[randomSubcategory];
  
  if (item && typeof item === 'object' && item.name) {
    return { category: randomCategory, subcategory: randomSubcategory, ...item };
  }
  
  // If it's nested, get first item
  const nestedKeys = Object.keys(item);
  const firstNestedKey = nestedKeys[0];
  return { 
    category: randomCategory, 
    subcategory: `${randomSubcategory}.${firstNestedKey}`, 
    ...item[firstNestedKey] 
  };
}

/**
 * Generate enhanced metadata with folklore mapping
 * @param {string} location - Location name
 * @param {string} conditions - Weather conditions
 * @param {number} temperature - Temperature value
 * @param {Object} folkloreMapping - Folklore mapping object
 * @returns {Object} Enhanced metadata object
 */
export function generateEnhancedMetadata(location, conditions, temperature, folkloreMapping) {
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
        category: folkloreMapping.category,
        icon: folkloreMapping.icon
      }
    };
  }
  
  return {
    tokenURI: `${baseURI}-${conditions.toLowerCase().replace(/\s+/g, '-')}`,
    dataSource: "OpenWeatherMap API"
  };
}

/**
 * Display complete folklore-to-system mapping in console
 */
export function displayFolkloreMapping() {
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

/**
 * Get all folklore mappings as a flat array
 * @returns {Array} Array of all folklore mappings
 */
export function getAllFolkloreMappings() {
  const mappings = [];
  
  for (const category in FOLKLORE_SPEED_MAPPING) {
    const categoryData = FOLKLORE_SPEED_MAPPING[category];
    
    for (const subcategory in categoryData) {
      const item = categoryData[subcategory];
      
      if (item && typeof item === 'object') {
        if (item.name) {
          mappings.push({ category, subcategory, ...item });
        } else {
          // Handle nested items
          for (const subitem in item) {
            const subItemData = item[subitem];
            if (subItemData && subItemData.name) {
              mappings.push({ 
                category, 
                subcategory: `${subcategory}.${subitem}`, 
                ...subItemData 
              });
            }
          }
        }
      }
    }
  }
  
  return mappings;
}

/**
 * Search folklore mappings by keyword
 * @param {string} keyword - Search keyword
 * @returns {Array} Array of matching folklore mappings
 */
export function searchFolkloreMappings(keyword) {
  const searchTerm = keyword.toLowerCase();
  return getAllFolkloreMappings().filter(mapping => {
    return (
      mapping.name?.toLowerCase().includes(searchTerm) ||
      mapping.myth?.toLowerCase().includes(searchTerm) ||
      mapping.capability?.toLowerCase().includes(searchTerm) ||
      mapping.application?.toLowerCase().includes(searchTerm)
    );
  });
}

export default {
  FOLKLORE_SPEED_MAPPING,
  getFolkloreMappingByName,
  getFolkloreByCategory,
  getRandomFolkloreMapping,
  generateEnhancedMetadata,
  displayFolkloreMapping,
  getAllFolkloreMappings,
  searchFolkloreMappings
};
