const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/e375d1f148e1fe69df74310ea643ecbd/${longitude},${latitude}?units=si`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      console.log("Unable to connect to weather service", undefined);
    } else if (body.error) {
      console.log("Unable to find location", undefined);
    } else {
      const summary = body.daily.data[0].summary;
      const chanceForRain = body.currently.precipProbability;
      const temperature = body.currently.temperature;
      const temperatureHigh = body.daily.data[0].temperatureHigh;
      const temperatureLow = body.daily.data[0].temperatureLow;

      callback(
        undefined,
        `
        ${summary} It's currently ${temperature} degrees out.
        There is ${chanceForRain}% chance of rain. 
        Highest temperature is ${temperatureHigh}
        Lowest temperature is ${temperatureLow}
        `
      );
    }
  });
};

module.exports = forecast;
