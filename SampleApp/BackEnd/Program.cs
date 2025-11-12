using Microsoft.AspNetCore.OpenApi;
using Scalar.AspNetCore;
using BackEnd.Services;
using System.ComponentModel.DataAnnotations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IBlockchainService, BlockchainService>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? ["*"];
        policy.WithOrigins(allowedOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi(options =>
{
    // current workaround for port forwarding in codespaces
    // https://github.com/dotnet/aspnetcore/issues/57332
    options.AddDocumentTransformer((document, context, ct) =>
    {
        document.Servers = [];
        return Task.CompletedTask;
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors();
app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

// Original weather forecast endpoint
app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

// Weather NFT API endpoints
app.MapPost("/api/weather/mint", async (MintNFTRequest request, IBlockchainService blockchain) =>
{
    try
    {
        var transactionHash = await blockchain.MintWeatherNFTAsync(
            request.Location,
            request.Temperature,
            request.Humidity,
            request.Conditions
        );

        return Results.Ok(new { success = true, transactionHash, message = "Weather NFT minted successfully!" });
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { success = false, error = ex.Message });
    }
})
.WithName("MintWeatherNFT")
.WithSummary("Mint a new Weather NFT")
.WithDescription("Creates a new NFT representing current weather conditions for a specific location");

app.MapGet("/api/nft/{tokenId:int}", async (int tokenId, IBlockchainService blockchain) =>
{
    try
    {
        var nftData = await blockchain.GetWeatherNFTAsync(tokenId);
        return Results.Ok(new { success = true, data = nftData });
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { success = false, error = ex.Message });
    }
})
.WithName("GetWeatherNFT")
.WithSummary("Get Weather NFT details")
.WithDescription("Retrieves weather data and metadata for a specific NFT token ID");

app.MapPost("/api/weather/oracle/update", async (UpdateWeatherRequest request, IBlockchainService blockchain) =>
{
    try
    {
        var transactionHash = await blockchain.UpdateWeatherDataAsync(
            request.Location,
            request.Temperature,
            request.Humidity,
            request.Conditions
        );

        return Results.Ok(new { success = true, transactionHash, message = "Weather data updated on blockchain!" });
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { success = false, error = ex.Message });
    }
})
.WithName("UpdateWeatherOracle")
.WithSummary("Update weather data on blockchain")
.WithDescription("Stores current weather conditions in the blockchain oracle for future NFT minting");

app.MapGet("/api/blockchain/status", async (IBlockchainService blockchain) =>
{
    try
    {
        var connected = await blockchain.IsConnectedAsync();
        return Results.Ok(new { 
            success = true, 
            connected, 
            network = "localhost",
            chainId = 1337,
            rpcUrl = "http://localhost:8545"
        });
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { success = false, error = ex.Message });
    }
})
.WithName("GetBlockchainStatus")
.WithSummary("Check blockchain connection status")
.WithDescription("Verifies connectivity to the blockchain network and returns network information");

app.MapGet("/api/weather/current/{location}", (string location) =>
{
    // Simulate weather data for demo purposes
    var random = new Random();
    var temperature = random.Next(-10, 40);
    var humidity = random.Next(20, 90);
    var conditions = summaries[random.Next(summaries.Length)];

    var weatherData = new CurrentWeatherResponse(
        location,
        temperature,
        humidity,
        conditions,
        DateTime.UtcNow
    );

    return Results.Ok(new { success = true, data = weatherData });
})
.WithName("GetCurrentWeather")
.WithSummary("Get current weather for location")
.WithDescription("Retrieves current weather conditions for a specified location");

app.Run();

// Request/Response models
internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

internal record MintNFTRequest(
    [Required] string Location,
    [Required] int Temperature,
    [Required] int Humidity,
    [Required] string Conditions
);

internal record UpdateWeatherRequest(
    [Required] string Location,
    [Required] int Temperature,
    [Required] int Humidity,
    [Required] string Conditions
);

internal record CurrentWeatherResponse(
    string Location,
    int Temperature,
    int Humidity,
    string Conditions,
    DateTime Timestamp
);
