const express = require('express');
const Blob = require('../models/Blob');
const atob = require('../utility/atob');
const router = express.Router();

const staticId = ['AwesomeGrover', 'Nandan', 'Aditi', 'Amit', 'Neeraj', 'Yash', 'Avinash', 'Shivani'];

router.get("/getJson/:id/:theme", (req, res) => {
  const id = atob(req.params.id);
  if (staticId.includes(id)) {
    Blob.find({ user: id, theme: req.params.theme })
      .then(blob => res.json(blob))
      .catch(err => console.log(err));
  } else {
    return res.status(500).json({success: false, error: 'Sorry, error'});
  }
});

router.post("/setJson/:id/:theme", (req, res) => {
  const id = atob(req.params.id);
  if (staticId.includes(id)) {
    const newResume = new Blob({
      user: id,
      jsonData: req.body.jsonData,
      theme: req.params.theme,
    });
    newResume.save().then(item => res.json(item));
  } else {
    return res.status(500).json({success: false, error: 'Sorry, error'});
  }
});

router.patch("/updateJson/:id/:theme", (req, res) => {
  const id = atob(req.params.id);
  if (staticId.includes(id)) {
    Blob.updateOne({ user: id, theme: req.params.theme }, { $set: { jsonData: req.body.jsonData }}, { $currentDate: { lastModified: true } })
      .then(() => Blob.find({ user: id }))
      .then(blob => res.json(blob))
      .catch(err => console.log(err));
  } else {
    return res.status(500).json({success: false, error: 'Sorry, error'});
  }
});

module.exports = router;