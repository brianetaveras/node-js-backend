const express = require("express");
const SERVER_PORT = process.env.SERVER_PORT;
const app = express();
const http = require("http");
const socketio = require("socket.io");
const log4js = require("log4js");
log4js.configure({
  appenders: { errors: { type: "file", filename: "errors.log" } },
  categories: { default: { appenders: ["errors"], level: "error" } }
});
const db = require("./models/user-model");

const logger = log4js.getLogger("errors");

app.use(express.json());
app.use(require("cookie-parser")());

const server = http.createServer(app);
const io = socketio(server);
app.use(require("cors")());
const getApiAndEmit = async socket => {
  try {
    const users = await db.getAllUsers();
    socket.emit("FromAPI", users);
  } catch (error) {
    throw error;
  }
};

let interval;

io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/", require("./middleware/verifyUsersAuth")(), async (req, res) => {
  const { name } = req.user;

  res.send(`<h1>Welcome to your Dashboard, ${name}</h1>`);
});

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user-router"));

app.use((error, req, res, next) => {
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
    
    `);
});
