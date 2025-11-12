# 🌦️ Weather NFT Platform - .NET & Blockchain Integration

A comprehensive Weather NFT platform that combines modern .NET web development with blockchain technology. This project demonstrates how to:

- Build high-performance APIs with .NET 9
- Create interactive web applications with Blazor
- Mint weather data as NFTs on the blockchain
- Integrate smart contracts with .NET applications
- Store and retrieve weather data via blockchain oracles

## 🏗️ Architecture Overview

This platform consists of three main components:

### 🖥️ .NET Application Stack
- **Backend API**: .NET 9 Web API with OpenAPI integration and [Scalar](https://learn.microsoft.com/aspnet/core/fundamentals/openapi/using-openapi-documents?view=aspnetcore-9.0#use-scalar-for-interactive-api-documentation) documentation
- **Frontend Web App**: Blazor Server application for data visualization and NFT interaction
- **Weather Service**: Real-time weather data fetching and processing

### ⛓️ Blockchain Infrastructure
- **WeatherNFT Contract**: ERC-721 smart contract for minting weather data as NFTs
- **WeatherOracle Contract**: On-chain weather data storage and validation
- **Hardhat Development Environment**: Local blockchain testing and deployment

### 🔗 Integration Layer
- Blockchain integration with .NET backend
- Real-time weather data synchronization
- NFT minting based on weather conditions
- Cross-chain data verification

## 🚀 Features

- **📊 Real-time Weather Data**: Fetch and display current weather information
- **🎨 NFT Minting**: Convert weather snapshots into unique NFTs
- **⛓️ Blockchain Integration**: Store weather data on-chain via smart contracts
- **📱 Interactive UI**: Blazor-powered web interface
- **📖 API Documentation**: Auto-generated OpenAPI docs with Scalar
- **🔧 Developer Tools**: Hot-reload, debugging, and testing capabilities

## 🏃‍♂️ Quick Start

### Run Options

[![Open in GitHub Codespaces](https://img.shields.io/static/v1?style=for-the-badge&label=GitHub+Codespaces&message=Open&color=lightgrey&logo=github)](https://codespaces.new/github/dotnet-codespaces)
[![Open in Dev Container](https://img.shields.io/static/v1?style=for-the-badge&label=Dev+Container&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/github/dotnet-codespaces)

### Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/github/dotnet-codespaces
   cd dotnet-codespaces
   ```

2. Open in VS Code:
   ```bash
   code .
   ```

### Running the Application

#### Option 1: Full Stack (Recommended)

1. **📤 One-click setup**: [Open a new Codespace](https://codespaces.new/github/dotnet-codespaces)

2. **▶️ Start all services**: Use VS Code's built-in *Run* command and open ports *8080*, *8081*, and *8545*

   ![Debug menu in VS Code showing Run All](images/RunAll.png)

3. **🌐 Access the application**:
   - **Blazor App**: `http://localhost:8080` - Main web interface
   - **API Documentation**: `http://localhost:8081/scalar` - Interactive API docs
   - **Blockchain Node**: `http://localhost:8545` - Local Ethereum network

   ![A website showing weather](images/BlazorApp.png)
   ![UI showing testing an API](images/scalar.png)

#### Option 2: Individual Components

Start services separately for development:

```bash
# Terminal 1: Start .NET Backend
cd SampleApp
dotnet run --project BackEnd/BackEnd.csproj

# Terminal 2: Start .NET Frontend
cd SampleApp
dotnet run --project FrontEnd/FrontEnd.csproj

# Terminal 3: Start Blockchain Network
cd contracts
npm run node

# Terminal 4: Deploy Smart Contracts
cd contracts
npm run deploy
```

## 🎯 NFT Minting Guide

### Understanding Weather NFTs

Weather NFTs are unique tokens that represent weather conditions at specific locations and times. Each NFT contains:

- **Location**: Geographic location (city, coordinates)
- **Temperature**: Current temperature in Celsius
- **Humidity**: Humidity percentage
- **Conditions**: Weather description (sunny, rainy, cloudy, etc.)
- **Timestamp**: Exact time of weather reading
- **Data Source**: Origin of weather data (API, sensor, etc.)

### Minting Process

1. **Automatic Minting**: Weather NFTs are automatically created when new weather data is received
2. **Manual Minting**: Use the API endpoints to mint specific weather conditions
3. **Batch Minting**: Deploy script creates sample NFTs for major cities

### API Endpoints for NFT Operations

```bash
# Get current weather data
GET /api/weather/{location}

# Mint weather NFT
POST /api/weather/mint
{
  "location": "New York",
  "temperature": 22,
  "humidity": 65,
  "conditions": "Partly Cloudy"
}

# Get NFT metadata
GET /api/nft/{tokenId}

# Get all NFTs for location
GET /api/nft/location/{location}
```

### Smart Contract Interaction

The platform includes two main smart contracts:

#### WeatherOracle Contract
- Stores verified weather data on-chain
- Manages authorized data providers
- Provides historical weather records

#### WeatherNFT Contract
- Mints ERC-721 tokens for weather data
- Links NFTs to specific weather readings
- Enables trading and ownership transfer

## 🔧 Development Guide

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)

### Smart Contract Development

```bash
cd contracts

# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm run test

# Start local blockchain
npm run node

# Deploy contracts
npm run deploy
```

### .NET Application Development

```bash
cd SampleApp

# Restore packages
dotnet restore

# Build solution
dotnet build

# Run tests
dotnet test

# Run backend
dotnet run --project BackEnd

# Run frontend
dotnet run --project FrontEnd
```

### Integration Testing

Test the full stack integration:

1. Start local blockchain: `npm run node`
2. Deploy contracts: `npm run deploy`
3. Start .NET backend with blockchain configuration
4. Use API endpoints to interact with smart contracts
5. Verify NFT minting through the Blazor frontend

## 📚 API Documentation

Visit `/scalar` endpoint when the backend is running to access interactive API documentation powered by Scalar.

Key endpoints:
- `/api/weather` - Weather data operations
- `/api/nft` - NFT management
- `/api/blockchain` - Smart contract interactions

## 🏆 Testing

### Backend Tests
```bash
cd SampleApp
dotnet test BackEnd.Tests/
```

### Frontend Tests
```bash
cd SampleApp
dotnet test FrontEnd.Tests/
```

### Smart Contract Tests
```bash
cd contracts
npm test
```

## 🛠️ Configuration

### Blockchain Configuration

Add to `appsettings.json`:

```json
{
  "Blockchain": {
    "WeatherOracleAddress": "0x...",
    "WeatherNFTAddress": "0x...",
    "NetworkRpcUrl": "http://localhost:8545",
    "ChainId": 1337,
    "PrivateKey": "0x..."
  }
}
```

### Weather API Configuration

```json
{
  "WeatherApi": {
    "ApiKey": "your-api-key",
    "BaseUrl": "https://api.openweathermap.org/data/2.5"
  }
}
```

## 🎨 Customization

### Adding New Weather Sources

1. Implement `IWeatherService` interface
2. Register service in DI container
3. Update data validation rules
4. Deploy contract updates if needed

### Custom NFT Metadata

Modify the `WeatherNFT.mintWeatherNFT()` function to include:
- Custom artwork generation
- Enhanced metadata schemas
- Location-specific attributes
- Rarity calculations

## 🚦 Debugging

1. **Check service status**: Ensure all services are running on correct ports
2. **Verify blockchain connection**: Check if local node is accessible
3. **Validate contracts**: Confirm smart contracts are deployed
4. **Monitor logs**: Use VS Code's integrated terminal for real-time logging

To stop running services:

![VS Code stop debugging on both backend and frontend](images/StopRun.png)

### Run Options

[![Open in GitHub Codespaces](https://img.shields.io/static/v1?style=for-the-badge&label=GitHub+Codespaces&message=Open&color=lightgrey&logo=github)](https://codespaces.new/github/dotnet-codespaces)
[![Open in Dev Container](https://img.shields.io/static/v1?style=for-the-badge&label=Dev+Container&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/github/dotnet-codespaces)

You can also run this repository locally by following these instructions: 
1. Clone the repo to your local machine `git clone https://github.com/github/dotnet-codespaces`
1. Open repo in VS Code

## Getting started

1. **📤 One-click setup**: [Open a new Codespace](https://codespaces.new/github/dotnet-codespaces), giving you a fully configured cloud developer environment.
2. **▶️ Run all, one-click again**: Use VS Code's built-in *Run* command and open the forwarded ports *8080* and *8081* in your browser. 

![Debug menu in VS Code showing Run All](images/RunAll.png)

3. The Blazor web app and Scalar can be open by heading to **/scalar** in your browser. On Scalar, head to the backend API and click "Test Request" to call and test the API. 

![A website showing weather](images/BlazorApp.png)

!["UI showing testing an API"](images/scalar.png)


4. **🔄 Iterate quickly:** Codespaces updates the server on each save, and VS Code's debugger lets you dig into the code execution.

5. To stop running, return to VS Code, and click Stop twice in the debug toolbar. 

![VS Code stop debuggin on both backend and frontend](images/StopRun.png)


## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
