const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const dataBlob = require("./server/routes/dataBlob");
const config = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Allow cross origin request
// app.use(cors());
console.log(config.db, 'Hello');
mongoose
  .connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDb connected ...')
  })
  .catch(err => console.log(err));

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Routes
  app.use('/api/dataBlob', dataBlob);

  app.use(express.static(path.join(__dirname, "client")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "index.html"));
  });

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => console.log(`Now listening to port ${PORT}`))