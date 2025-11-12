# 🌦️ Weather NFT Smart Contracts

This directory contains the smart contracts for the Weather NFT platform, built with Solidity and deployed using the Hardhat development environment.

## 📄 Contract Overview

### WeatherNFT.sol
ERC-721 compliant smart contract for minting weather data as NFTs.

**Key Features:**
- Mint unique NFTs representing weather snapshots
- Store comprehensive weather metadata on-chain
- Track location-based token collections
- Update weather data for existing tokens
- Full ERC-721 compatibility for trading

**Functions:**
- `mintWeatherNFT()` - Mint new weather NFT
- `updateWeatherData()` - Update existing token weather data
- `getWeatherData()` - Retrieve weather data for token
- `getTokensByLocation()` - Get all tokens for a location
- `getLatestWeatherForLocation()` - Get most recent weather NFT

### WeatherOracle.sol
Oracle contract for storing and validating weather data from external sources.

**Key Features:**
- Secure weather data storage with authorization
- Historical weather records
- Data provider management
- Real-time weather updates
- Data integrity validation

**Functions:**
- `updateWeather()` - Add new weather reading
- `getLatestWeather()` - Get current weather for location
- `getWeatherHistory()` - Retrieve historical data
- `setDataProviderAuthorization()` - Manage data providers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm run test
```

### Local Development

```bash
# Start local blockchain
npm run node

# In another terminal, deploy contracts
npm run deploy
```

## 🧪 Testing

Run the comprehensive test suite:

```bash
npm test
```

Tests cover:
- NFT minting functionality
- Weather data validation
- Access control mechanisms
- Oracle data integrity
- Gas optimization scenarios

### Test Files
- `test/WeatherNFT.test.js` - NFT contract tests
- `test/WeatherOracle.test.js` - Oracle contract tests

## 📋 Deployment

### Local Network
```bash
# Start Hardhat node
npx hardhat node

# Deploy contracts
npx hardhat run scripts/deploy.js --network localhost
```

### Testnet Deployment
```bash
# Deploy to Goerli
npx hardhat run scripts/deploy.js --network goerli

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
```

### Configuration

Update `hardhat.config.js` with your network settings:

```javascript
module.exports = {
  networks: {
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

## 🔧 Integration with .NET

After deployment, update your .NET application configuration:

```json
{
  "Blockchain": {
    "WeatherOracleAddress": "0x...",
    "WeatherNFTAddress": "0x...",
    "NetworkRpcUrl": "http://localhost:8545",
    "ChainId": 1337
  }
}
```

## 📊 Gas Optimization

The contracts are optimized for gas efficiency:
- Batch operations where possible
- Efficient data structures
- Minimal external calls
- Optimized storage patterns

## 🔒 Security Features

- **Access Control**: Owner-only functions for critical operations
- **Reentrancy Protection**: Guards against reentrancy attacks
- **Data Validation**: Input validation for all functions
- **Authorization**: Multi-level access control for data providers

## 📈 Monitoring & Analytics

Track contract performance:
- Gas usage per transaction
- NFT minting rates
- Weather data updates frequency
- User interaction patterns

## 🛠️ Advanced Features

### Custom Metadata
Extend NFT metadata with custom attributes:

```solidity
struct WeatherData {
    string location;
    int256 temperature;
    uint256 humidity;
    string conditions;
    uint256 timestamp;
    string dataSource;
    // Add custom fields here
}
```

### Upgradeability
Consider proxy patterns for future upgrades:
- OpenZeppelin Upgrades
- Transparent proxy pattern
- UUPS (Universal Upgradeable Proxy Standard)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write comprehensive tests
4. Ensure gas optimization
5. Submit a pull request

## 📜 License

MIT License - see LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**Contract compilation fails:**
```bash
# Clear cache and recompile
npx hardhat clean
npx hardhat compile
```

**Deployment transaction fails:**
- Check account balance
- Verify network configuration
- Review gas settings

**Tests failing:**
- Ensure local node is running
- Check test data validity
- Verify contract deployment

### Support

For technical issues:
1. Check existing GitHub issues
2. Review Hardhat documentation
3. Consult OpenZeppelin guides
4. Create detailed issue reports

## 📚 Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Solidity Documentation](https://docs.soliditylang.org)
- [ERC-721 Standard](https://eips.ethereum.org/EIPS/eip-721)