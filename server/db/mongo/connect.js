import mongoose from 'mongoose';
import { db } from './constants';
import loadModels from './models';

export default () => {
  // Find the appropriate database to connect to, default to localhost if not found.
  const connect = () => {
    mongoose.Promise = require('bluebird');
    const mongo = mongoose.connect(db, { useMongoClient: true });
    mongo.then(() => {
      console.log(`===>  Succeeded in connecting to ${db}`);
    }).catch(err => {
      console.log(`===>  Error connecting to ${db}`);
      console.log(`Reason: ${err}`);
    });
  };
  connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);

  loadModels();
};
