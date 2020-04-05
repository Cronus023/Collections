const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const { Comment } = require("./models/Comment");
const { Item } = require("./models/Item");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connection", socket => {
  socket.on("Input Chat Message", msg => {
    connect.then(db => {
      try {
        Item.find({ '_id': { $in: msg.itemId } })
          .exec((err, ite) => {
            if (err) return req.status(400).send(err)
            let comment = new Comment({ message: msg.chatMessage, sender: msg.userId, item: msg.itemId, collect: ite[0].collect })
            comment.save((err, doc) => {
              if (err) return res.json({ success: false, err })
              Comment.find({ "_id": doc._id })
                .populate("sender")
                .exec((err, doc) => {
                  return io.emit("Output Chat Message", doc);
                })
            })
          })
      } catch (error) {
        console.error(error);
      }
    })
  })

})
const config = require("./config/key");
const mongoose = require("mongoose");

const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/collections', require('./routes/collection'));
app.use('/api/items', require('./routes/item'));
app.use('/api/likes', require('./routes/likes'));
app.use('/api/comments', require('./routes/comments'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Running at ${port}`)
});