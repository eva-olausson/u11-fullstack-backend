const serverPort = process.env.PORT || 5000;
const clientOrigins = ["http://localhost:3000", "https://u11app.herokuapp.com"];

module.exports = {
  serverPort,
  clientOrigins,
};
