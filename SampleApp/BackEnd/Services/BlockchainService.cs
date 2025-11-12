using System.Numerics;
using System.Text.Json;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using Nethereum.Contracts;
using Nethereum.Util;

namespace BackEnd.Services;

public interface IBlockchainService
{
    Task<string> MintWeatherNFTAsync(string location, int temperature, int humidity, string conditions);
    Task<object> GetWeatherNFTAsync(int tokenId);
    Task<string> UpdateWeatherDataAsync(string location, int temperature, int humidity, string conditions);
    Task<bool> IsConnectedAsync();
}

public class BlockchainService : IBlockchainService
{
    private readonly Web3 _web3;
    private readonly string _weatherNFTAddress;
    private readonly string _weatherOracleAddress;
    private readonly ILogger<BlockchainService> _logger;

    // Simplified ABIs for basic functionality
    private readonly string _weatherNFTABI = """
        [
            {
                "inputs": [
                    {"name": "to", "type": "address"},
                    {"name": "location", "type": "string"},
                    {"name": "temperature", "type": "int256"},
                    {"name": "humidity", "type": "uint256"},
                    {"name": "conditions", "type": "string"},
                    {"name": "tokenURI", "type": "string"},
                    {"name": "dataSource", "type": "string"}
                ],
                "name": "mintWeatherNFT",
                "outputs": [{"name": "", "type": "uint256"}],
                "type": "function"
            },
            {
                "inputs": [{"name": "tokenId", "type": "uint256"}],
                "name": "getWeatherData",
                "outputs": [
                    {
                        "components": [
                            {"name": "location", "type": "string"},
                            {"name": "temperature", "type": "int256"},
                            {"name": "humidity", "type": "uint256"},
                            {"name": "conditions", "type": "string"},
                            {"name": "timestamp", "type": "uint256"},
                            {"name": "dataSource", "type": "string"}
                        ],
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "type": "function"
            }
        ]
        """;

    private readonly string _weatherOracleABI = """
        [
            {
                "inputs": [
                    {"name": "location", "type": "string"},
                    {"name": "temperatureCelsius", "type": "int256"},
                    {"name": "humidity", "type": "uint256"},
                    {"name": "pressure", "type": "uint256"},
                    {"name": "conditions", "type": "string"}
                ],
                "name": "updateWeather",
                "outputs": [],
                "type": "function"
            }
        ]
        """;

    public BlockchainService(IConfiguration configuration, ILogger<BlockchainService> logger)
    {
        _logger = logger;
        
        var blockchainConfig = configuration.GetSection("Blockchain");
        var rpcUrl = blockchainConfig["NetworkRpcUrl"] ?? "http://localhost:8545";
        var privateKey = blockchainConfig["PrivateKey"];
        
        _weatherNFTAddress = blockchainConfig["WeatherNFTAddress"] ?? "";
        _weatherOracleAddress = blockchainConfig["WeatherOracleAddress"] ?? "";

        if (!string.IsNullOrEmpty(privateKey))
        {
            var account = new Account(privateKey);
            _web3 = new Web3(account, rpcUrl);
        }
        else
        {
            _web3 = new Web3(rpcUrl);
        }

        _logger.LogInformation("Blockchain service initialized with RPC URL: {RpcUrl}", rpcUrl);
    }

    public async Task<string> MintWeatherNFTAsync(string location, int temperature, int humidity, string conditions)
    {
        try
        {
            var contract = _web3.Eth.GetContract(_weatherNFTABI, _weatherNFTAddress);
            var mintFunction = contract.GetFunction("mintWeatherNFT");

            var accounts = await _web3.Eth.Accounts.SendRequestAsync();
            var fromAccount = accounts.FirstOrDefault() ?? "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

            var tokenURI = $"https://api.weathernft.com/metadata/{location.ToLower().Replace(" ", "-")}";

            var transactionHash = await mintFunction.SendTransactionAsync(
                fromAccount,
                fromAccount,
                location,
                temperature,
                new BigInteger(humidity),
                conditions,
                tokenURI,
                "WeatherAPI"
            );

            _logger.LogInformation("Weather NFT minted for {Location} with transaction hash: {Hash}", location, transactionHash);
            return transactionHash;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to mint Weather NFT for {Location}", location);
            throw;
        }
    }

    public async Task<object> GetWeatherNFTAsync(int tokenId)
    {
        try
        {
            var contract = _web3.Eth.GetContract(_weatherNFTABI, _weatherNFTAddress);
            var getDataFunction = contract.GetFunction("getWeatherData");

            var result = await getDataFunction.CallDeserializingToObjectAsync<WeatherNFTData>(tokenId);

            return new
            {
                TokenId = tokenId,
                Location = result.Location,
                Temperature = (int)result.Temperature,
                Humidity = (int)result.Humidity,
                Conditions = result.Conditions,
                Timestamp = DateTimeOffset.FromUnixTimeSeconds((long)result.Timestamp).DateTime,
                DataSource = result.DataSource
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to get Weather NFT data for token {TokenId}", tokenId);
            throw;
        }
    }

    public async Task<string> UpdateWeatherDataAsync(string location, int temperature, int humidity, string conditions)
    {
        try
        {
            var contract = _web3.Eth.GetContract(_weatherOracleABI, _weatherOracleAddress);
            var updateFunction = contract.GetFunction("updateWeather");

            var accounts = await _web3.Eth.Accounts.SendRequestAsync();
            var fromAccount = accounts.FirstOrDefault() ?? "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

            var transactionHash = await updateFunction.SendTransactionAsync(
                fromAccount,
                location,
                temperature,
                new BigInteger(humidity),
                new BigInteger(1013), // Default pressure
                conditions
            );

            _logger.LogInformation("Weather data updated for {Location} with transaction hash: {Hash}", location, transactionHash);
            return transactionHash;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to update weather data for {Location}", location);
            throw;
        }
    }

    public async Task<bool> IsConnectedAsync()
    {
        try
        {
            var blockNumber = await _web3.Eth.Blocks.GetBlockNumber.SendRequestAsync();
            return blockNumber?.Value > 0;
        }
        catch
        {
            return false;
        }
    }

    public class WeatherNFTData
    {
        public string Location { get; set; } = "";
        public BigInteger Temperature { get; set; }
        public BigInteger Humidity { get; set; }
        public string Conditions { get; set; } = "";
        public BigInteger Timestamp { get; set; }
        public string DataSource { get; set; } = "";
    }
}