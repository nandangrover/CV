const express = require('express');
const Blob = require('../models/Blob');
const router = express.Router();

router.get("/getJson/:id", (req, res) => {
  Blob.find({user: req.params.id})
    .then(blob => res.json(blob))
});

router.post("/setJson/:id", (req, res) => {
  const newResume = new Blob({
    user: req.params.id,
    json: req.body.json,
  });
  newResume.save().then(item => res.json(item));
});

router.patch("/updateJson/:id", (req, res) => {

});

module.exports = router;