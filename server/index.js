const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const dataBlob = require("./routes/dataBlob");

const app = express();

app.use(bodyParser.json());

const db = 'mongodb://nandan:nandan123@ds241968.mlab.com:41968/resume';

// Allow cross origin request
// app.use(cors());

mongoose
  .connect(db, {
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

  app.use(express.static(path.join(__dirname, "../client")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "index.html"));
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => console.log(`Now listening to port ${PORT}`))