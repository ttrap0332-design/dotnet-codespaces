// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title WeatherNFT
 * @dev NFT contract for tokenizing weather data with .NET backend integration
 */
contract WeatherNFT is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 private _nextTokenId;
    
    struct WeatherData {
        string location;
        int256 temperature;
        uint256 humidity;
        string conditions;
        uint256 timestamp;
        string dataSource;
    }
    
    mapping(uint256 => WeatherData) public weatherRecords;
    mapping(string => uint256[]) public locationToTokens;
    
    event WeatherNFTMinted(
        uint256 indexed tokenId,
        string location,
        int256 temperature,
        uint256 timestamp,
        address indexed owner
    );
    
    event WeatherDataUpdated(
        uint256 indexed tokenId,
        string location,
        int256 temperature
    );
    
    constructor(address initialOwner) 
        ERC721("WeatherNFT", "WNFT")
        Ownable(initialOwner)
    {
        _nextTokenId = 1;
    }
    
    /**
     * @dev Mint a new weather NFT with associated data
     */
    function mintWeatherNFT(
        address to,
        string memory location,
        int256 temperature,
        uint256 humidity,
        string memory conditions,
        string memory tokenURI,
        string memory dataSource
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        weatherRecords[tokenId] = WeatherData({
            location: location,
            temperature: temperature,
            humidity: humidity,
            conditions: conditions,
            timestamp: block.timestamp,
            dataSource: dataSource
        });
        
        locationToTokens[location].push(tokenId);
        
        emit WeatherNFTMinted(tokenId, location, temperature, block.timestamp, to);
        
        return tokenId;
    }
    
    /**
     * @dev Update weather data for existing token
     */
    function updateWeatherData(
        uint256 tokenId,
        int256 temperature,
        uint256 humidity,
        string memory conditions
    ) external onlyOwner {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        
        WeatherData storage data = weatherRecords[tokenId];
        data.temperature = temperature;
        data.humidity = humidity;
        data.conditions = conditions;
        data.timestamp = block.timestamp;
        
        emit WeatherDataUpdated(tokenId, data.location, temperature);
    }
    
    /**
     * @dev Get weather data for a token
     */
    function getWeatherData(uint256 tokenId) external view returns (WeatherData memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return weatherRecords[tokenId];
    }
    
    /**
     * @dev Get all token IDs for a location
     */
    function getTokensByLocation(string memory location) external view returns (uint256[] memory) {
        return locationToTokens[location];
    }
    
    /**
     * @dev Get latest weather data for a location
     */
    function getLatestWeatherForLocation(string memory location) external view returns (WeatherData memory) {
        uint256[] memory tokens = locationToTokens[location];
        require(tokens.length > 0, "No weather data for location");
        
        uint256 latestTokenId = tokens[tokens.length - 1];
        return weatherRecords[latestTokenId];
    }
    
    // Override required functions
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}