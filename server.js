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
const axios = require('axios');
var ACCESS_TOKEN = "pk.eyJ1IjoidGFtYXJhamFtbW91bCIsImEiOiJja2NxMG1kNm8xMGtzMnNsbWExbGtpbm8zIn0.bgQ23ChS-u88zfS7dm6Fbw";
var tr = {};
var trps = [];

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
    console.log(data);
    DriverM.findOne({
      number: data.driver_number
    })
      .then((savesDriver) => {
        if (savesDriver) {
          console.log("find user");
          UserM.findOne({
            number: data.user_number
          }).then((savesUser) => {
            if (savesUser) {
              console.log('123');
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
                var trips = [data];
                tr = {};
                var a, b;
                Promise.all(trips.map(item => {
                  return anAsyncFunction(item);
                })).then(() => {
                  a = tr.from;
                  b = tr.to;
                }).then(() => {
                  console.log(d_id, socket.id);
                  io.to(d_id).emit('notification', {
                    client: data.user_number,
                    source_lat: data.source_lat,
                    source_long: data.source_long,
                    dest_lat: data.dest_lat,
                    dest_long: data.dest_long,
                    dest: data.dest,
                    from: a,
                    to: b
                  });
                })
              } catch (error) { }
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
    console.log("11111111111111111111111111111111", data);
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
                  is_driver: data.isdriver,
                  date: Date.now()
                });
                try {
                  console.log(data);
                  const savedChat = chat.save();
                  savedChat.then((saved) => {
                    if (data.isdriver) {
                      let u_id = users.get(data.client);
                      console.log(data, u_id);

                      socket.to(u_id).emit('message', saved);

                    } else {
                      let d_id = users.get(data.driver);
                      console.log('كم حرف', savedChat);
                      socket.to(d_id).emit('message', saved);
                    }
                  });
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

const anAsyncFunction = async item => {

  var b = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + item.source_long + ', ' + item.source_lat + '.json?access_token=' + ACCESS_TOKEN);
  var a = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + item.dest_long + ', ' + item.dest_lat + '.json?access_token=' + ACCESS_TOKEN);
  if (b.data.features.length != 0)
    tr.from = b.data.features[0].place_name;
  if (a.data.features.length != 0)
    tr.to = a.data.features[0].place_name;
  return Promise.resolve('ok');
}