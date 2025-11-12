// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title WeatherOracle
 * @dev Oracle contract for storing and retrieving weather data from .NET backend
 */
contract WeatherOracle is Ownable, ReentrancyGuard {
    struct WeatherReading {
        string location;
        int256 temperatureCelsius;
        uint256 humidity;
        uint256 pressure;
        string conditions;
        uint256 timestamp;
        bool isValid;
    }
    
    mapping(string => WeatherReading) public latestWeather;
    mapping(string => WeatherReading[]) public weatherHistory;
    mapping(address => bool) public authorizedDataProviders;
    
    event WeatherUpdated(
        string indexed location,
        int256 temperature,
        uint256 humidity,
        string conditions,
        uint256 timestamp
    );
    
    event DataProviderAuthorized(address indexed provider, bool authorized);
    
    modifier onlyAuthorizedProvider() {
        require(authorizedDataProviders[msg.sender] || msg.sender == owner(), "Not authorized data provider");
        _;
    }
    
    constructor(address initialOwner) Ownable(initialOwner) {
        authorizedDataProviders[initialOwner] = true;
    }
    
    /**
     * @dev Authorize or revoke data provider access
     */
    function setDataProviderAuthorization(address provider, bool authorized) external onlyOwner {
        authorizedDataProviders[provider] = authorized;
        emit DataProviderAuthorized(provider, authorized);
    }
    
    /**
     * @dev Update weather data for a location
     */
    function updateWeather(
        string memory location,
        int256 temperatureCelsius,
        uint256 humidity,
        uint256 pressure,
        string memory conditions
    ) external onlyAuthorizedProvider nonReentrant {
        WeatherReading memory newReading = WeatherReading({
            location: location,
            temperatureCelsius: temperatureCelsius,
            humidity: humidity,
            pressure: pressure,
            conditions: conditions,
            timestamp: block.timestamp,
            isValid: true
        });
        
        latestWeather[location] = newReading;
        weatherHistory[location].push(newReading);
        
        emit WeatherUpdated(location, temperatureCelsius, humidity, conditions, block.timestamp);
    }
    
    /**
     * @dev Get latest weather for a location
     */
    function getLatestWeather(string memory location) external view returns (WeatherReading memory) {
        WeatherReading memory reading = latestWeather[location];
        require(reading.isValid, "No weather data available for location");
        return reading;
    }
    
    /**
     * @dev Get weather history for a location
     */
    function getWeatherHistory(string memory location) external view returns (WeatherReading[] memory) {
        return weatherHistory[location];
    }
    
    /**
     * @dev Get weather history count for a location
     */
    function getWeatherHistoryCount(string memory location) external view returns (uint256) {
        return weatherHistory[location].length;
    }
    
    /**
     * @dev Check if weather data exists for location
     */
    function hasWeatherData(string memory location) external view returns (bool) {
        return latestWeather[location].isValid;
    }
}