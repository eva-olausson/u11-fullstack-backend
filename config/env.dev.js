const serverPort = process.env.PORT || 5000;
const clientOrigins = ["http://localhost:3000", "https://u11app.herokuapp.com"];
const clientOriginUrl = process.env.CLIENT_ORIGIN_URL;

module.exports = {
  serverPort,
  clientOrigins,
  clientOriginUrl,
};
