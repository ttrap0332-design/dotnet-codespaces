# 📡 Weather NFT API Documentation

Complete API reference for the Weather NFT platform, providing endpoints for weather data management, NFT operations, and blockchain interactions.

## 🌐 Base URLs

- **Development**: `http://localhost:5001`
- **Production**: `https://your-api-domain.com`

## 🔐 Authentication

Currently using development mode without authentication. In production, implement:
- JWT tokens for API access
- API keys for external integrations
- OAuth 2.0 for user authentication

## 📊 Response Format

All endpoints return JSON responses with the following structure:

```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully",
  "timestamp": "2025-11-12T10:00:00Z"
}
```

Error responses:
```json
{
  "success": false,
  "error": {
    "code": "WEATHER_NOT_FOUND",
    "message": "Weather data not found for location",
    "details": "No weather information available for 'InvalidCity'"
  },
  "timestamp": "2025-11-12T10:00:00Z"
}
```

## 🌤️ Weather Endpoints

### Get Current Weather

```http
GET /api/weather/current/{location}
```

**Parameters:**
- `location` (string): City name or coordinates (lat,lon)

**Response:**
```json
{
  "success": true,
  "data": {
    "location": "New York",
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    "temperature": 22,
    "humidity": 65,
    "pressure": 1013,
    "conditions": "Partly Cloudy",
    "windSpeed": 5.2,
    "windDirection": 270,
    "visibility": 10,
    "timestamp": "2025-11-12T10:00:00Z"
  }
}
```

### Get Weather Forecast

```http
GET /api/weather/forecast/{location}?days={days}
```

**Parameters:**
- `location` (string): City name or coordinates
- `days` (int, optional): Number of forecast days (default: 5, max: 14)

**Response:**
```json
{
  "success": true,
  "data": {
    "location": "London",
    "forecast": [
      {
        "date": "2025-11-12",
        "temperatureHigh": 18,
        "temperatureLow": 12,
        "conditions": "Rainy",
        "humidity": 78,
        "precipitationChance": 85
      }
    ]
  }
}
```

### Get Weather History

```http
GET /api/weather/history/{location}?from={date}&to={date}
```

**Parameters:**
- `location` (string): City name or coordinates
- `from` (string): Start date (ISO format)
- `to` (string): End date (ISO format)

### Add Weather Location

```http
POST /api/weather/locations
Content-Type: application/json

{
  "name": "Custom Location",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "autoUpdate": true
}
```

## 🎨 NFT Endpoints

### Mint Weather NFT

```http
POST /api/nft/mint
Content-Type: application/json

{
  "location": "Tokyo",
  "temperature": 28,
  "humidity": 55,
  "conditions": "Sunny",
  "recipient": "0x742d35Cc6634C0532925a3b8D40000abC6bC6",
  "metadata": {
    "description": "Sunny day in Tokyo",
    "image": "https://api.weathernft.com/images/tokyo-sunny.png",
    "attributes": [
      {
        "trait_type": "Season",
        "value": "Summer"
      }
    ]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tokenId": 1,
    "transactionHash": "0xabc123...",
    "recipient": "0x742d35Cc6634C0532925a3b8D40000abC6bC6",
    "gasUsed": 250000,
    "blockNumber": 12345,
    "metadata": {
      "location": "Tokyo",
      "temperature": 28,
      "timestamp": "2025-11-12T10:00:00Z"
    }
  }
}
```

### Get NFT Details

```http
GET /api/nft/{tokenId}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tokenId": 1,
    "owner": "0x742d35Cc6634C0532925a3b8D40000abC6bC6",
    "weatherData": {
      "location": "Tokyo",
      "temperature": 28,
      "humidity": 55,
      "conditions": "Sunny",
      "timestamp": "2025-11-12T10:00:00Z"
    },
    "tokenUri": "https://api.weathernft.com/metadata/1",
    "createdAt": "2025-11-12T10:00:00Z"
  }
}
```

### Get NFTs by Owner

```http
GET /api/nft/owner/{address}?page={page}&limit={limit}
```

### Get NFTs by Location

```http
GET /api/nft/location/{location}?page={page}&limit={limit}
```

### Update NFT Metadata

```http
PUT /api/nft/{tokenId}/metadata
Content-Type: application/json

{
  "description": "Updated description",
  "image": "https://api.weathernft.com/images/new-image.png",
  "attributes": [
    {
      "trait_type": "Rarity",
      "value": "Legendary"
    }
  ]
}
```

## ⛓️ Blockchain Endpoints

### Get Blockchain Status

```http
GET /api/blockchain/status
```

**Response:**
```json
{
  "success": true,
  "data": {
    "connected": true,
    "networkId": 1337,
    "networkName": "localhost",
    "blockNumber": 12345,
    "gasPrice": "20000000000",
    "contracts": {
      "weatherNFT": "0xabc123...",
      "weatherOracle": "0xdef456..."
    }
  }
}
```

### Get Account Balance

```http
GET /api/blockchain/balance/{address}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x742d35Cc6634C0532925a3b8D40000abC6bC6",
    "balance": "10.5",
    "balanceWei": "10500000000000000000",
    "nftCount": 5
  }
}
```

### Send Transaction

```http
POST /api/blockchain/transaction
Content-Type: application/json

{
  "to": "0x742d35Cc6634C0532925a3b8D40000abC6bC6",
  "value": "1000000000000000000",
  "data": "0x",
  "gasLimit": 21000
}
```

### Get Gas Price

```http
GET /api/blockchain/gas-price
```

**Response:**
```json
{
  "success": true,
  "data": {
    "gasPrice": "20000000000",
    "gasPriceGwei": "20",
    "estimatedCost": {
      "transfer": "0.00042",
      "nftMint": "0.005"
    }
  }
}
```

## 🔍 Oracle Endpoints

### Update Weather Oracle

```http
POST /api/oracle/weather/update
Content-Type: application/json

{
  "location": "Sydney",
  "temperatureCelsius": 25,
  "humidity": 60,
  "pressure": 1015,
  "conditions": "Clear",
  "dataSource": "OpenWeatherMap"
}
```

### Get Oracle Weather Data

```http
GET /api/oracle/weather/{location}
```

### Get Weather History from Oracle

```http
GET /api/oracle/weather/{location}/history?limit={limit}
```

## 📈 Analytics Endpoints

### Get Platform Statistics

```http
GET /api/analytics/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalNFTs": 1234,
    "uniqueLocations": 45,
    "totalTransactions": 5678,
    "averageGasUsed": 245000,
    "popularLocations": [
      {
        "location": "New York",
        "nftCount": 156
      }
    ]
  }
}
```

### Get Weather Trends

```http
GET /api/analytics/weather/trends?location={location}&period={period}
```

## 🔄 Real-time Updates (SignalR)

### Connection

```javascript
const connection = new signalR.HubConnectionBuilder()
  .withUrl("/weatherHub")
  .build();

connection.start();
```

### Subscribe to Weather Updates

```javascript
// Listen for weather updates
connection.on("WeatherUpdated", (data) => {
  console.log("New weather data:", data);
});

// Subscribe to specific location
connection.invoke("SubscribeToLocation", "New York");
```

### Subscribe to NFT Events

```javascript
// Listen for NFT mint events
connection.on("NFTMinted", (data) => {
  console.log("New NFT minted:", data);
});

// Listen for NFT transfers
connection.on("NFTTransferred", (data) => {
  console.log("NFT transferred:", data);
});
```

## 🚨 Error Codes

| Code | Description | HTTP Status |
|------|------------|-------------|
| `WEATHER_NOT_FOUND` | Weather data not available | 404 |
| `INVALID_LOCATION` | Invalid location format | 400 |
| `NFT_MINT_FAILED` | NFT minting failed | 500 |
| `INSUFFICIENT_FUNDS` | Not enough balance for transaction | 400 |
| `BLOCKCHAIN_DISCONNECTED` | Blockchain connection lost | 503 |
| `RATE_LIMIT_EXCEEDED` | API rate limit exceeded | 429 |
| `UNAUTHORIZED` | Invalid or missing authentication | 401 |

## 📝 Rate Limiting

- **Free tier**: 100 requests per hour
- **Authenticated users**: 1000 requests per hour
- **Premium tier**: 10,000 requests per hour

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1699790400
```

## 📚 SDK Examples

### JavaScript/TypeScript

```typescript
import { WeatherNFTClient } from '@weather-nft/sdk';

const client = new WeatherNFTClient({
  apiUrl: 'http://localhost:5001',
  // apiKey: 'your-api-key' // for production
});

// Get weather data
const weather = await client.weather.getCurrent('New York');

// Mint NFT
const nft = await client.nft.mint({
  location: 'London',
  temperature: 15,
  humidity: 78,
  conditions: 'Rainy'
});
```

### Python

```python
from weather_nft_sdk import WeatherNFTClient

client = WeatherNFTClient(api_url='http://localhost:5001')

# Get weather data
weather = client.weather.get_current('Tokyo')

# Mint NFT
nft = client.nft.mint(
    location='Sydney',
    temperature=25,
    humidity=60,
    conditions='Clear'
)
```

## 🔧 Development Tools

### Postman Collection

Import the Postman collection for easy API testing:
```bash
curl -o weather-nft-api.postman_collection.json \
  http://localhost:5001/api/docs/postman
```

### OpenAPI Specification

Download the OpenAPI spec:
```bash
curl http://localhost:5001/api/docs/openapi.json
```

### Testing Utilities

Use the built-in test endpoints for development:

```http
# Generate test weather data
POST /api/test/weather/generate

# Create test NFTs
POST /api/test/nft/batch-mint

# Reset test data
DELETE /api/test/reset
```