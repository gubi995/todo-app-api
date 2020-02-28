import mongoose from 'mongoose';

const MONGO_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    console.log('MongoDB connecting...');

    const mongooseConnection = await mongoose.connect(process.env.MONGO_URI!, MONGO_CONFIG);

    console.log(`MongoDB connected: ${mongooseConnection.connection.host}`);
  } catch (error) {
    console.log(`MongoDB error: ${JSON.stringify(error)}`);

    process.exit(1);
  }
};

export default connectDB;
