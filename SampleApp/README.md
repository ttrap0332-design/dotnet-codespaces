# 🏗️ .NET Weather Application

This directory contains the .NET application stack for the Weather NFT platform, including both backend API and frontend Blazor application.

## 🏛️ Architecture

```
SampleApp/
├── BackEnd/          # .NET 9 Web API
│   ├── Controllers/  # API endpoints
│   ├── Services/     # Business logic
│   ├── Models/       # Data models
│   └── Program.cs    # Application entry point
├── FrontEnd/         # Blazor Server App
│   ├── Pages/        # Blazor pages
│   ├── Components/   # Reusable components
│   ├── Services/     # Client services
│   └── wwwroot/      # Static assets
└── SampleApp.sln     # Solution file
```

## 🚀 Features

### Backend API
- **Weather Data API**: RESTful endpoints for weather information
- **NFT Operations**: Smart contract integration for minting
- **OpenAPI Documentation**: Auto-generated API docs with Scalar
- **Real-time Updates**: SignalR for live data streaming
- **Blockchain Integration**: Web3 connectivity for smart contracts

### Frontend Application
- **Interactive Dashboard**: Real-time weather visualization
- **NFT Gallery**: Display and manage minted weather NFTs
- **Responsive Design**: Mobile-first UI with Bootstrap
- **Real-time Updates**: Live data refresh without page reload
- **Weather Maps**: Interactive geographic weather display

## 🎯 Quick Start

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- Visual Studio Code or Visual Studio 2022

### Running the Application

#### Option 1: Using VS Code Tasks
```bash
# Start both services
Ctrl+Shift+P -> "Tasks: Run Task" -> "watch frontend"
Ctrl+Shift+P -> "Tasks: Run Task" -> "watch backend"
```

#### Option 2: Command Line
```bash
# Backend (Terminal 1)
cd BackEnd
dotnet run

# Frontend (Terminal 2)
cd FrontEnd
dotnet run
```

#### Option 3: Production Build
```bash
# Build solution
dotnet build

# Publish backend
dotnet publish BackEnd/BackEnd.csproj -o ./publish/backend

# Publish frontend
dotnet publish FrontEnd/FrontEnd.csproj -o ./publish/frontend
```

### Accessing the Application
- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:5001
- **API Documentation**: http://localhost:5001/scalar
- **Swagger UI**: http://localhost:5001/swagger

## 📡 API Endpoints

### Weather Operations
```http
GET    /api/weather/current/{location}    # Current weather
GET    /api/weather/forecast/{location}   # Weather forecast
GET    /api/weather/history/{location}    # Historical data
POST   /api/weather/locations            # Add location
```

### NFT Operations
```http
POST   /api/nft/mint                     # Mint weather NFT
GET    /api/nft/{tokenId}               # Get NFT details
GET    /api/nft/owner/{address}         # Get NFTs by owner
GET    /api/nft/location/{location}     # Get NFTs by location
PUT    /api/nft/{tokenId}/metadata      # Update metadata
```

### Blockchain Operations
```http
GET    /api/blockchain/status           # Blockchain connection status
GET    /api/blockchain/balance/{address} # Account balance
POST   /api/blockchain/transaction     # Send transaction
GET    /api/blockchain/gas-price       # Current gas price
```

## 🔧 Configuration

### Backend Configuration (`appsettings.json`)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=weather.db"
  },
  "WeatherApi": {
    "ApiKey": "your-openweather-api-key",
    "BaseUrl": "https://api.openweathermap.org/data/2.5"
  },
  "Blockchain": {
    "NetworkRpcUrl": "http://localhost:8545",
    "WeatherNFTAddress": "0x...",
    "WeatherOracleAddress": "0x...",
    "PrivateKey": "0x...",
    "ChainId": 1337
  },
  "Cors": {
    "AllowedOrigins": ["http://localhost:5000"]
  }
}
```

### Frontend Configuration

```json
{
  "ApiBaseUrl": "http://localhost:5001",
  "Features": {
    "NFTGallery": true,
    "WeatherMaps": true,
    "RealTimeUpdates": true
  }
}
```

## 🧪 Development

### Adding New Features

1. **New API Endpoint**:
   ```bash
   # Add controller
   dotnet new controller -n WeatherController -o BackEnd/Controllers
   
   # Add service
   dotnet new class -n WeatherService -o BackEnd/Services
   ```

2. **New Blazor Component**:
   ```bash
   # Add page
   dotnet new page -n WeatherMap -o FrontEnd/Pages
   
   # Add component
   dotnet new component -n WeatherCard -o FrontEnd/Components
   ```

### Database Operations

```bash
# Add Entity Framework (if needed)
dotnet add package Microsoft.EntityFrameworkCore.Sqlite

# Create migration
dotnet ef migrations add InitialCreate

# Update database
dotnet ef database update
```

### Testing

```bash
# Run all tests
dotnet test

# Run specific project tests
dotnet test BackEnd.Tests/

# Run with coverage
dotnet test --collect:"XPlat Code Coverage"
```

## 🎨 Frontend Development

### Blazor Components

#### WeatherCard Component
```razor
@code {
    [Parameter] public WeatherData Weather { get; set; }
    [Parameter] public EventCallback OnMintNFT { get; set; }
}

<div class="weather-card">
    <h3>@Weather.Location</h3>
    <p>@Weather.Temperature°C</p>
    <button @onclick="OnMintNFT">Mint NFT</button>
</div>
```

#### NFT Gallery Component
```razor
@inject NFTService NFTService

<div class="nft-gallery">
    @foreach (var nft in NFTs)
    {
        <NFTCard NFT="nft" />
    }
</div>
```

### Styling

The application uses:
- **Bootstrap 5**: Component styling
- **CSS Grid**: Layout management
- **Custom CSS**: Weather-specific animations
- **Icon Fonts**: Open Iconic for icons

## 🔌 Blockchain Integration

### Web3 Service

```csharp
public class Web3Service
{
    private readonly Web3 _web3;
    private readonly string _contractAddress;
    
    public async Task<string> MintWeatherNFT(WeatherData weather)
    {
        var contract = _web3.Eth.GetContract(ABI, _contractAddress);
        var function = contract.GetFunction("mintWeatherNFT");
        
        return await function.SendTransactionAsync(
            weather.Location,
            weather.Temperature,
            weather.Humidity,
            weather.Conditions
        );
    }
}
```

### Smart Contract Integration

```csharp
// Register Web3 services
builder.Services.AddSingleton<IWeb3>(provider => 
{
    var config = provider.GetService<IConfiguration>();
    return new Web3(config["Blockchain:NetworkRpcUrl"]);
});

builder.Services.AddScoped<Web3Service>();
builder.Services.AddScoped<NFTService>();
```

## 📊 Monitoring & Logging

### Application Insights (Optional)

```json
{
  "ApplicationInsights": {
    "InstrumentationKey": "your-key-here"
  }
}
```

### Structured Logging

```csharp
logger.LogInformation("Weather NFT minted for {Location} with temperature {Temperature}°C", 
    weather.Location, weather.Temperature);
```

## 🚀 Deployment

### Azure App Service

```bash
# Publish for Azure
dotnet publish -c Release -o ./publish

# Deploy using Azure CLI
az webapp up --name weather-nft-app --resource-group weather-nft-rg
```

### Docker Deployment

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY ./publish .
ENTRYPOINT ["dotnet", "BackEnd.dll"]
```

### Environment Variables

```bash
# Production settings
ASPNETCORE_ENVIRONMENT=Production
WEATHER_API_KEY=your-api-key
BLOCKCHAIN_RPC_URL=https://mainnet.infura.io/v3/your-key
```

## 🛠️ Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Check port usage
netstat -tulpn | grep :5000

# Kill process
sudo kill -9 $(lsof -ti:5000)
```

**SSL certificate issues:**
```bash
# Trust development certificates
dotnet dev-certs https --trust
```

**Blockchain connection fails:**
- Verify RPC URL accessibility
- Check network configuration
- Confirm contract addresses

## 📚 Additional Resources

- [.NET 9 Documentation](https://docs.microsoft.com/dotnet)
- [Blazor Documentation](https://docs.microsoft.com/aspnet/core/blazor)
- [ASP.NET Core Web API](https://docs.microsoft.com/aspnet/core/web-api)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [Nethereum Documentation](https://docs.nethereum.com)