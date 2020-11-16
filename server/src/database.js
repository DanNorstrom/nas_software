const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// mongoose options
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0
};

// mongodb environment variables from .env
const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT
} = process.env;

// connect to GLobal MongoDB cluster trough Admin account using Mongoose
const dbConnectionURL = {
    'LOCALURL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`,
    'GLOBALURL': 'mongodb+srv://Admin:ACg6iKJY9vGUznX@cluster0.lirlf.gcp.mongodb.net/NAS?retryWrites=true&w=majority'
};

mongoose.connect(dbConnectionURL.GLOBALURL, options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongodb Connection Error:' + dbConnectionURL.LOCALURL));

db.once('open', () => {
     // we're connected !
     console.log('Mongodb Connection Successful');
});
