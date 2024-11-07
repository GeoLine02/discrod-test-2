require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const {
  app: { port },
} = require("./src/config/index");
const connection = require("./src/postgresql");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  },
});
const { socketHandler } = require("./src/socketIo");

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", process.env.FRONT_END_URL); // Replace with your frontend URL
//   res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE"); // Allowed methods
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,Authorization"
//   );
//   next();
// });
app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

const userRoutes = require("./src/routes/user.routes");
const friendsRoutes = require("./src/routes/friends.routes");
const serversRoutes = require("./src/routes/server.routes");
const messagesRoutes = require("./src/routes/messages.routes");
const channelsRoutes = require("./src/routes/channels.routes");
connection();

app.use("/user", userRoutes);
app.use("/friend", friendsRoutes);
app.use("/server", serversRoutes);
app.use("/messages", messagesRoutes);
app.use("/channels", channelsRoutes);
socketHandler(io);

server.listen(port, () =>
  console.log(`Server is up and running on port ${port}`)
);
