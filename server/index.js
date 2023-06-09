const express = require('express');
const app = express();
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DashBoard = require('./routes/DashBoard');
const User = require('./routes/user');
const File = require('./routes/File');

var cors = require('cors');

// Connect to DB
mongoose.connect(
  'mongodb://127.0.0.1:27017/TeamsWonderDataBase',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  mongoose.set('strictQuery', true);

let gfs; // Declare the gfs variable

mongoose.connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
});

app.use(express.json());
app.use(cors());
app.use(methodOverride('_method'));

// Router Middlewares
app.use('/api/user', User);
app.use('/api/DashBoard', DashBoard);
app.use('/api/File', File);

app.listen(5000, () => {
  console.log('Server is up and running');
});
