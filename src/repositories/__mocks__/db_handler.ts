import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export const connect = async() => {
  //const uri = await mongod.getConnectionString(); // deprecated
  const uri = await mongod.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: 5,
    reconnectInterval: 1000
  };
  await mongoose.connect(uri, mongooseOpts);
};

export const closeDatabase = async() => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};