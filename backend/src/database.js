const mongoose = require('mongoose');
const URI = 'mongodb://0.0.0.0:27017/enerbit';
mongoose.set("strictQuery", false);
mongoose.connect(URI)
  .then(db => console.log('Database is connected',))
  .catch(error => console.error(error));

module.exports = mongoose;