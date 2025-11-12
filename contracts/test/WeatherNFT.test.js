import { expect } from "chai";
import { ethers } from "hardhat";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers";

describe("WeatherNFT", function () {
  let WeatherNFT, weatherNFT, owner, addr1, addr2;
  
  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    WeatherNFT = await ethers.getContractFactory("WeatherNFT");
    weatherNFT = await WeatherNFT.deploy(owner.address);
    await weatherNFT.waitForDeployment();
  });
  
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await weatherNFT.owner()).to.equal(owner.address);
    });
    
    it("Should have correct name and symbol", async function () {
      expect(await weatherNFT.name()).to.equal("WeatherNFT");
      expect(await weatherNFT.symbol()).to.equal("WNFT");
    });
  });
  
  describe("Minting", function () {
    it("Should mint weather NFT with correct data", async function () {
      const tokenURI = "https://api.example.com/metadata/1";
      
      const tx = await weatherNFT.mintWeatherNFT(
        addr1.address,
        "New York",
        25,
        60,
        "Sunny",
        tokenURI,
        "OpenWeatherMap"
      );
      
      expect(await weatherNFT.ownerOf(1)).to.equal(addr1.address);
      expect(await weatherNFT.tokenURI(1)).to.equal(tokenURI);
      
      const weatherData = await weatherNFT.getWeatherData(1);
      expect(weatherData.location).to.equal("New York");
      expect(weatherData.temperature).to.equal(25);
      expect(weatherData.humidity).to.equal(60);
      expect(weatherData.conditions).to.equal("Sunny");
      expect(weatherData.dataSource).to.equal("OpenWeatherMap");
    });
    
    it("Should only allow owner to mint", async function () {
      await expect(
        weatherNFT.connect(addr1).mintWeatherNFT(
          addr2.address,
          "London",
          20,
          75,
          "Rainy",
          "https://api.example.com/metadata/2",
          "WeatherAPI"
        )
      ).to.be.revertedWithCustomError(weatherNFT, "OwnableUnauthorizedAccount");
    });
    
    it("Should emit WeatherNFTMinted event", async function () {
      await expect(
        weatherNFT.mintWeatherNFT(
          addr1.address,
          "Tokyo",
          30,
          50,
          "Clear",
          "https://api.example.com/metadata/3",
          "JMA"
        )
      ).to.emit(weatherNFT, "WeatherNFTMinted")
      .withArgs(1, "Tokyo", 30, anyValue, addr1.address);
    });
    
    it("Should track tokens by location", async function () {
      await weatherNFT.mintWeatherNFT(
        addr1.address,
        "Sydney",
        25,
        55,
        "Partly Cloudy",
        "https://api.example.com/metadata/4",
        "BOM"
      );
      
      await weatherNFT.mintWeatherNFT(
        addr2.address,
        "Sydney",
        27,
        58,
        "Clear",
        "https://api.example.com/metadata/5",
        "BOM"
      );
      
      const sydneyTokens = await weatherNFT.getTokensByLocation("Sydney");
      expect(sydneyTokens.length).to.equal(2);
      expect(sydneyTokens[0]).to.equal(1);
      expect(sydneyTokens[1]).to.equal(2);
    });
  });
  
  describe("Weather Data Updates", function () {
    beforeEach(async function () {
      await weatherNFT.mintWeatherNFT(
        addr1.address,
        "Berlin",
        18,
        70,
        "Cloudy",
        "https://api.example.com/metadata/6",
        "DWD"
      );
    });
    
    it("Should update weather data for existing token", async function () {
      await weatherNFT.updateWeatherData(1, 22, 65, "Sunny");
      
      const weatherData = await weatherNFT.getWeatherData(1);
      expect(weatherData.temperature).to.equal(22);
      expect(weatherData.humidity).to.equal(65);
      expect(weatherData.conditions).to.equal("Sunny");
      expect(weatherData.location).to.equal("Berlin"); // Should remain unchanged
    });
    
    it("Should only allow owner to update weather data", async function () {
      await expect(
        weatherNFT.connect(addr1).updateWeatherData(1, 20, 68, "Rainy")
      ).to.be.revertedWithCustomError(weatherNFT, "OwnableUnauthorizedAccount");
    });
    
    it("Should emit WeatherDataUpdated event", async function () {
      await expect(
        weatherNFT.updateWeatherData(1, 24, 62, "Clear")
      ).to.emit(weatherNFT, "WeatherDataUpdated")
      .withArgs(1, "Berlin", 24);
    });
    
    it("Should revert when updating non-existent token", async function () {
      await expect(
        weatherNFT.updateWeatherData(999, 25, 60, "Sunny")
      ).to.be.revertedWith("Token does not exist");
    });
  });
  
  describe("Data Retrieval", function () {
    beforeEach(async function () {
      await weatherNFT.mintWeatherNFT(
        addr1.address,
        "Paris",
        19,
        72,
        "Rainy",
        "https://api.example.com/metadata/7",
        "MeteoFrance"
      );
      
      await weatherNFT.mintWeatherNFT(
        addr2.address,
        "Paris",
        21,
        68,
        "Cloudy",
        "https://api.example.com/metadata/8",
        "MeteoFrance"
      );
    });
    
    it("Should get latest weather for location", async function () {
      const latestWeather = await weatherNFT.getLatestWeatherForLocation("Paris");
      expect(latestWeather.temperature).to.equal(21);
      expect(latestWeather.conditions).to.equal("Cloudy");
      expect(latestWeather.location).to.equal("Paris");
    });
    
    it("Should revert when getting latest weather for location with no data", async function () {
      await expect(
        weatherNFT.getLatestWeatherForLocation("NonExistent")
      ).to.be.revertedWith("No weather data for location");
    });
    
    it("Should get weather data for specific token", async function () {
      const weatherData = await weatherNFT.getWeatherData(1);
      expect(weatherData.location).to.equal("Paris");
      expect(weatherData.temperature).to.equal(19);
      expect(weatherData.conditions).to.equal("Rainy");
    });
    
    it("Should revert when getting data for non-existent token", async function () {
      await expect(
        weatherNFT.getWeatherData(999)
      ).to.be.revertedWith("Token does not exist");
    });
  });
});