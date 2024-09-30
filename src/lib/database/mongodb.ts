import { MongoClient } from 'mongodb';
const MONGODB_URI = "mongodb://dh2643-db:cbNUpkCX10rUY2FZ30qEBflWHhQJtt6itDCmHz8W8gbiai2bupYV4ZrqWOvhmdBbyP3rAAVrb3xSACDbjZ015Q%3D%3D@dh2643-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@dh2643-db@";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export default clientPromise;


/**
 * DEPRECATED: Mongoose is not used in this project yet!
 */

// import mongoose from 'mongoose';

// const uri = "mongodb://dh2643-db:cbNUpkCX10rUY2FZ30qEBflWHhQJtt6itDCmHz8W8gbiai2bupYV4ZrqWOvhmdBbyP3rAAVrb3xSACDbjZ015Q%3D%3D@dh2643-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@dh2643-db@/database";

// const connectMongoDB = async () =>{
//     if(mongoose.connection.readyState === 1){
//         console.log("MongoDB already connected");
//         return;
//     }

//     try{
//         await mongoose.connect(uri);
//         console.log("MongoDB connected");
//     }
//     catch(error){
//         console.error("MongoDB connection error: ", error);
//         throw error;
//     }
// }



// export default connectMongoDB;


