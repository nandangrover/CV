const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BlobSchema = new Schema({
  user: String,
  jsonData: String,
});

module.exports = Blob = mongoose.model('users', BlobSchema);