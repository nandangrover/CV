const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BlobSchema = new Schema({
  user: String,
  jsonData: String,
  theme: String,
});

module.exports = Blob = mongoose.model('blob', BlobSchema);