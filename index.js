const express = require("express");
const SERVER_PORT = process.env.SERVER_PORT;
const db = require("./models/user-model");
const server = express();
const log4js = require("log4js");
log4js.configure({
  appenders: { errors: { type: "file", filename: "errors.log" } },
  categories: { default: { appenders: ["errors"], level: "error" } }
});


const logger = log4js.getLogger("errors");

server.use(express.json());
server.use(require('cookie-parser')())
server.get("/",  require('./middleware/verifyUsersAuth')(), async (req, res) => {
    const {name} = req.user;

    res.send(`<h1>Welcome to your Dashboard, ${name}</h1>`)
});

server.use("/auth", require("./routes/auth"));

server.use((error, req, res, next) => {
  switch (error.code) {
    case "23505":
      return res.status(500).json({
        message:
          "There is an account associated with that email address already!"
      });

    default:
      logger.error(error);
      return res.status(500).json({
        message: "There was an internal server error!"
      });
  }
});

server.listen(SERVER_PORT, () => {
    console.log(`
    ____________________________________
   |     ___                            |
   |    (^0^) http://localhost:${SERVER_PORT}     |
   |   /(___)                           |
   |     ^ ^                            |
   |____________________________________|
    
    `)
});
