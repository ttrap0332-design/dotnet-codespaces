import { expect } from "chai";
import { ethers } from "hardhat";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers";

describe("WeatherOracle", function () {
  let WeatherOracle, weatherOracle, owner, dataProvider, addr1;
  
  beforeEach(async function () {
    [owner, dataProvider, addr1] = await ethers.getSigners();
    
    WeatherOracle = await ethers.getContractFactory("WeatherOracle");
    weatherOracle = await WeatherOracle.deploy(owner.address);
    await weatherOracle.waitForDeployment();
  });
  
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await weatherOracle.owner()).to.equal(owner.address);
    });
    
    it("Should authorize owner as data provider", async function () {
      expect(await weatherOracle.authorizedDataProviders(owner.address)).to.be.true;
    });
  });
  
  describe("Data Provider Authorization", function () {
    it("Should allow owner to authorize data providers", async function () {
      await weatherOracle.setDataProviderAuthorization(dataProvider.address, true);
      expect(await weatherOracle.authorizedDataProviders(dataProvider.address)).to.be.true;
    });
    
    it("Should not allow non-owner to authorize data providers", async function () {
      await expect(
        weatherOracle.connect(addr1).setDataProviderAuthorization(dataProvider.address, true)
      ).to.be.revertedWithCustomError(weatherOracle, "OwnableUnauthorizedAccount");
    });
  });
  
  describe("Weather Data Updates", function () {
    it("Should allow authorized provider to update weather", async function () {
      await weatherOracle.updateWeather("New York", 25, 60, 1013, "Sunny");
      
      const weather = await weatherOracle.getLatestWeather("New York");
      expect(weather.location).to.equal("New York");
      expect(weather.temperatureCelsius).to.equal(25);
      expect(weather.humidity).to.equal(60);
      expect(weather.conditions).to.equal("Sunny");
      expect(weather.isValid).to.be.true;
    });
    
    it("Should not allow unauthorized provider to update weather", async function () {
      await expect(
        weatherOracle.connect(addr1).updateWeather("New York", 25, 60, 1013, "Sunny")
      ).to.be.revertedWith("Not authorized data provider");
    });
    
    it("Should emit WeatherUpdated event", async function () {
      await expect(
        weatherOracle.updateWeather("London", 20, 75, 1015, "Rainy")
      ).to.emit(weatherOracle, "WeatherUpdated")
      .withArgs("London", 20, 75, "Rainy", anyValue);
    });
    
    it("Should store weather history", async function () {
      await weatherOracle.updateWeather("Tokyo", 30, 50, 1010, "Clear");
      await weatherOracle.updateWeather("Tokyo", 28, 55, 1012, "Partly Cloudy");
      
      const historyCount = await weatherOracle.getWeatherHistoryCount("Tokyo");
      expect(historyCount).to.equal(2);
      
      const history = await weatherOracle.getWeatherHistory("Tokyo");
      expect(history.length).to.equal(2);
      expect(history[0].temperatureCelsius).to.equal(30);
      expect(history[1].temperatureCelsius).to.equal(28);
    });
  });
  
  describe("Weather Data Retrieval", function () {
    beforeEach(async function () {
      await weatherOracle.updateWeather("Sydney", 25, 60, 1020, "Clear");
    });
    
    it("Should retrieve latest weather data", async function () {
      const weather = await weatherOracle.getLatestWeather("Sydney");
      expect(weather.location).to.equal("Sydney");
      expect(weather.temperatureCelsius).to.equal(25);
      expect(weather.conditions).to.equal("Clear");
    });
    
    it("Should check if weather data exists", async function () {
      expect(await weatherOracle.hasWeatherData("Sydney")).to.be.true;
      expect(await weatherOracle.hasWeatherData("NonExistent")).to.be.false;
    });
    
    it("Should revert when getting weather for non-existent location", async function () {
      await expect(
        weatherOracle.getLatestWeather("NonExistent")
      ).to.be.revertedWith("No weather data available for location");
    });
  });
});