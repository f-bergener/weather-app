const request = require("request");

const weatherAPIKey = process.env.WEATHER_API_KEY;

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${weatherAPIKey}&query=${longitude},${latitude}&units=f`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It's ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. ${body.current.humidity}% humidity and ${body.current.precip}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
