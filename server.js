const express = require("express");
const mongoose = require("mongoose");
const Login = require("./routes/login");
const Register = require("./routes/register");
const Driver = require("./routes/driver");
const User = require("./routes/user");
const Trip = require("./routes/trip");
const Chat = require("./routes/chat");
const DriverM = require("./models/Driver");
const UserM = require("./models/User");
const TripM = require("./models/Trip");
const ChatM = require("./models/Chat");
const Contact_us = require("./routes/contact_us");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const app = express();
app.use(cors());

require("dotenv/config");

app.use(express.json());
var users = new Map();

const server = http.createServer(app);
server.listen(4001);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("trip", (data) => {
    DriverM.findOne({
        number: data.driver_number
      })
      .then((savesDriver) => {
        if (savesDriver) {
          UserM.findOne({
            number: data.user_number
          }).then((savesUser) => {
            if (savesUser) {
              const trip = new TripM({
                driver_number: data.driver_number,
                user_number: data.user_number,
                source_lat: data.source_lat,
                source_long: data.source_long,
                dest_lat: data.dest_lat,
                dest_long: data.dest_long,
                dest: data.dest,
                date: Date.now()
              });
              try {
                const savedTrip = trip.save();
                savedTrip.then((saved) => console.log(saved));
                let d_id = users.get(data.driver_number);
                io.to(d_id).emit('notification', {
                  client: data.user_number,
                  source_lat: data.source_lat,
                  source_long: data.source_long,
                  dest_lat: data.dest_lat,
                  dest_long: data.dest_long,
                  dest: data.dest
                });
                console.log(`this is d_id : ${d_id} and driver number: ${data.driver_number}`);
              } catch (error) {}
            }

          });
        }
      })
      .catch((err) => console.log(err));
  });

  socket.on('join', (number) => {
    users.set(number, socket.id);
    console.log(users);
  })

  socket.on('message', (data) => {
    console.log(data);
    DriverM.findOne({
        number: data.driver
      })
      .then((savesDriver) => {
        if (savesDriver) {
          UserM.findOne({
            number: data.client
          }).
          then((savesUser) => {
            if (savesUser) {
              const chat = new ChatM({
                driver: data.driver,
                client: data.client,
                message: data.message,
                date: Date.now()
              });
              try {
                console.log(chat);
                const savedChat = chat.save();
                savedChat.then((saved) => console.log(saved));
                console.log(data.isdriver)
                if (data.isdriver) {
                  let u_id = users.get(data.client);
                  socket.to(u_id).emit('message', data.message);
                  console.log("iimmmmmmm")

                } else {
                  let d_id = users.get(data.driver);
                  socket.to(d_id).emit('message', data.message);
                  console.log("iiiiiiiiiii")
                }
              } catch (error) {
                console.log(error);
              }
            }

          });
        }
      })
      .catch((err) => console.log(err));
  })

  socket.on("disconnect", (number) => {
    users.delete(number)
    console.log("user disconnected");

  });
});

mongoose.connect(
  process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to DB")
);

mongoose.connection.on("error", () => {
  console.log("error from server");
});

app.use("/login", Login);
app.use("/register", Register);
app.use("/driver", Driver);
app.use("/user", User);
app.use("/contact_us", Contact_us);
app.use("/trip", Trip);
app.use("/chat", Chat);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("running on port 5000"));