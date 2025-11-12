# 🚀 Deployment Guide

Complete guide for deploying the Weather NFT platform to various environments including cloud platforms, containers, and local production setups.

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for smart contracts)
- .NET 9 SDK
- Access to blockchain network (testnet or mainnet)

## 🌐 Environment Configurations

### Development
- Local blockchain (Hardhat node)
- In-memory database
- Hot reload enabled
- Debug logging

### Staging
- Testnet blockchain (Goerli/Sepolia)
- PostgreSQL database
- Basic monitoring
- Info logging

### Production
- Mainnet blockchain
- Production database
- Full monitoring and alerts
- Error logging only

## 🐳 Docker Deployment

### Quick Start with Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./SampleApp/BackEnd
    ports:
      - "5001:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=Host=db;Database=weathernft;Username=postgres;Password=password
    depends_on:
      - db

  frontend:
    build: ./SampleApp/FrontEnd
    ports:
      - "5000:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
    depends_on:
      - backend

  blockchain:
    image: trufflesuite/ganache-cli:latest
    ports:
      - "8545:8545"
    command: ["--deterministic", "--accounts", "10", "--host", "0.0.0.0"]

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: weathernft
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Deploy with:
```bash
docker-compose up -d
```

### Individual Dockerfiles

#### Backend Dockerfile
```dockerfile
# SampleApp/BackEnd/Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["BackEnd/BackEnd.csproj", "BackEnd/"]
RUN dotnet restore "BackEnd/BackEnd.csproj"
COPY . .
WORKDIR "/src/BackEnd"
RUN dotnet build "BackEnd.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BackEnd.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BackEnd.dll"]
```

#### Frontend Dockerfile
```dockerfile
# SampleApp/FrontEnd/Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["FrontEnd/FrontEnd.csproj", "FrontEnd/"]
RUN dotnet restore "FrontEnd/FrontEnd.csproj"
COPY . .
WORKDIR "/src/FrontEnd"
RUN dotnet build "FrontEnd.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FrontEnd.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FrontEnd.dll"]
```

## ☁️ Azure Deployment

### Azure Container Instances

```bash
# Create resource group
az group create --name weather-nft-rg --location eastus

# Create container registry
az acr create --resource-group weather-nft-rg --name weathernftregistry --sku Basic

# Build and push images
az acr build --registry weathernftregistry --image backend:latest ./SampleApp/BackEnd
az acr build --registry weathernftregistry --image frontend:latest ./SampleApp/FrontEnd

# Deploy container group
az container create \
  --resource-group weather-nft-rg \
  --name weather-nft-app \
  --image weathernftregistry.azurecr.io/backend:latest \
  --dns-name-label weather-nft-unique \
  --ports 80
```

### Azure App Service

```bash
# Create App Service plan
az appservice plan create \
  --name weather-nft-plan \
  --resource-group weather-nft-rg \
  --sku B1 \
  --is-linux

# Create web apps
az webapp create \
  --resource-group weather-nft-rg \
  --plan weather-nft-plan \
  --name weather-nft-backend \
  --deployment-container-image-name weathernftregistry.azurecr.io/backend:latest

az webapp create \
  --resource-group weather-nft-rg \
  --plan weather-nft-plan \
  --name weather-nft-frontend \
  --deployment-container-image-name weathernftregistry.azurecr.io/frontend:latest
```

### Azure Kubernetes Service (AKS)

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: weather-nft-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: weathernftregistry.azurecr.io/backend:latest
        ports:
        - containerPort: 80
        env:
        - name: ASPNETCORE_ENVIRONMENT
          value: "Production"
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

Deploy to AKS:
```bash
# Create AKS cluster
az aks create \
  --resource-group weather-nft-rg \
  --name weather-nft-aks \
  --node-count 2 \
  --generate-ssh-keys

# Get credentials
az aks get-credentials --resource-group weather-nft-rg --name weather-nft-aks

# Deploy application
kubectl apply -f k8s/
```

## 🌍 AWS Deployment

### Elastic Container Service (ECS)

```json
{
  "family": "weather-nft-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "your-account.dkr.ecr.us-west-2.amazonaws.com/weather-nft-backend:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "ASPNETCORE_ENVIRONMENT",
          "value": "Production"
        }
      ]
    }
  ]
}
```

### Elastic Beanstalk

```bash
# Initialize EB application
eb init weather-nft-app --platform "Docker running on 64bit Amazon Linux 2"

# Create environment
eb create weather-nft-prod

# Deploy
eb deploy
```

## 🔧 Configuration Management

### Production Environment Variables

```bash
# Backend configuration
export ASPNETCORE_ENVIRONMENT=Production
export ConnectionStrings__DefaultConnection="Host=prod-db;Database=weathernft;Username=app;Password=secure-password"
export WeatherApi__ApiKey="your-openweather-api-key"
export Blockchain__NetworkRpcUrl="https://mainnet.infura.io/v3/your-key"
export Blockchain__WeatherNFTAddress="0x..."
export Blockchain__WeatherOracleAddress="0x..."
export Blockchain__PrivateKey="0x..."

# Frontend configuration
export ApiBaseUrl="https://api.yourapp.com"
```

### Secrets Management

#### Azure Key Vault
```bash
# Create Key Vault
az keyvault create --name weather-nft-kv --resource-group weather-nft-rg

# Add secrets
az keyvault secret set --vault-name weather-nft-kv --name "BlockchainPrivateKey" --value "0x..."
az keyvault secret set --vault-name weather-nft-kv --name "WeatherApiKey" --value "your-key"
```

#### AWS Secrets Manager
```bash
# Create secret
aws secretsmanager create-secret \
  --name weather-nft/blockchain/private-key \
  --secret-string "0x..."

aws secretsmanager create-secret \
  --name weather-nft/weather-api/key \
  --secret-string "your-key"
```

## 📊 Database Setup

### PostgreSQL Production Setup

```sql
-- Create database
CREATE DATABASE weathernft;
CREATE USER weathernft_app WITH PASSWORD 'secure-password';
GRANT ALL PRIVILEGES ON DATABASE weathernft TO weathernft_app;

-- Connect to database
\c weathernft;

-- Create tables (run Entity Framework migrations)
-- dotnet ef database update
```

### MongoDB Setup (Alternative)

```javascript
// Initialize MongoDB collections
use weathernft

db.weather_data.createIndex({"location": 1, "timestamp": -1})
db.nft_metadata.createIndex({"tokenId": 1})
db.blockchain_events.createIndex({"blockNumber": -1, "transactionHash": 1})
```

## ⛓️ Blockchain Deployment

### Mainnet Deployment

```bash
cd contracts

# Install dependencies
npm install

# Configure mainnet settings
export MAINNET_RPC_URL="https://mainnet.infura.io/v3/your-key"
export MAINNET_PRIVATE_KEY="0x..."

# Deploy to mainnet
npx hardhat run scripts/deploy.js --network mainnet
```

### Testnet Deployment

```bash
# Deploy to Goerli testnet
export GOERLI_RPC_URL="https://goerli.infura.io/v3/your-key"
export GOERLI_PRIVATE_KEY="0x..."
npx hardhat run scripts/deploy.js --network goerli

# Deploy to Sepolia testnet
export SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/your-key"
export SEPOLIA_PRIVATE_KEY="0x..."
npx hardhat run scripts/deploy.js --network sepolia
```

### Gas Optimization for Deployment

```javascript
// hardhat.config.js
module.exports = {
  networks: {
    mainnet: {
      url: process.env.MAINNET_RPC_URL,
      accounts: [process.env.MAINNET_PRIVATE_KEY],
      gasPrice: 20000000000, // 20 gwei
      gas: 6000000
    }
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    gasPrice: 20
  }
};
```

## 📈 Monitoring and Observability

### Application Insights Setup

```json
{
  "ApplicationInsights": {
    "ConnectionString": "InstrumentationKey=your-key;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/"
  },
  "Logging": {
    "ApplicationInsights": {
      "LogLevel": {
        "Default": "Information"
      }
    }
  }
}
```

### Prometheus Metrics

```csharp
// Add to Program.cs
builder.Services.AddMetrics();
app.UseMetricsAllMiddleware();
app.MapPrometheusScrapingEndpoint();
```

### Health Checks

```csharp
builder.Services.AddHealthChecks()
    .AddNpgSql(connectionString)
    .AddUrlGroup(new Uri("http://localhost:8545"), "blockchain");

app.MapHealthChecks("/health");
```

## 🚦 Load Balancing

### nginx Configuration

```nginx
upstream backend {
    server backend1:80;
    server backend2:80;
    server backend3:80;
}

upstream frontend {
    server frontend1:80;
    server frontend2:80;
}

server {
    listen 80;
    server_name api.yourapp.com;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name yourapp.com;

    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔒 SSL/TLS Configuration

### Let's Encrypt with Certbot

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificates
sudo certbot --nginx -d yourapp.com -d api.yourapp.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Azure Application Gateway SSL

```bash
# Upload certificate
az network application-gateway ssl-cert create \
  --gateway-name weather-nft-gateway \
  --resource-group weather-nft-rg \
  --name weather-nft-ssl \
  --cert-file certificate.pfx \
  --cert-password "certificate-password"
```

## 📋 Deployment Checklist

### Pre-deployment
- [ ] Run all tests (unit, integration, e2e)
- [ ] Security audit completed
- [ ] Environment variables configured
- [ ] Database migrations prepared
- [ ] Smart contracts deployed and verified
- [ ] SSL certificates configured

### Post-deployment
- [ ] Health checks passing
- [ ] Monitoring alerts configured
- [ ] Backup strategy implemented
- [ ] Log aggregation working
- [ ] Performance testing completed
- [ ] Documentation updated

## 🆘 Troubleshooting

### Common Deployment Issues

**Container won't start:**
```bash
# Check logs
docker logs container-name

# Check resource limits
docker stats
```

**Database connection fails:**
```bash
# Test connection
telnet database-host 5432

# Check credentials
psql -h database-host -U username -d database
```

**Blockchain connection issues:**
```bash
# Test RPC endpoint
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  http://blockchain-url:8545
```

### Performance Tuning

**Application optimization:**
- Enable response compression
- Configure output caching
- Optimize database queries
- Use CDN for static assets

**Database tuning:**
- Configure connection pooling
- Add appropriate indexes
- Regular maintenance tasks
- Monitor query performance

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy Weather NFT App

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: 9.0.x
    
    - name: Build and test
      run: |
        dotnet restore
        dotnet build
        dotnet test
    
    - name: Build Docker images
      run: |
        docker build -t backend ./SampleApp/BackEnd
        docker build -t frontend ./SampleApp/FrontEnd
    
    - name: Deploy to Azure
      uses: azure/aci-deploy@v1
      with:
        resource-group: weather-nft-rg
        dns-name-label: weather-nft-${{ github.run_number }}
        image: backend:latest
        registry-login-server: weathernftregistry.azurecr.io
        registry-username: ${{ secrets.REGISTRY_USERNAME }}
        registry-password: ${{ secrets.REGISTRY_PASSWORD }}
```