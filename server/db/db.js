import { MongoClient } from "mongodb";

const {MONGO_URI} = process.env
const client = new MongoClient(MONGO_URI);

const connectToMongo = async () => {
    try {
        await client.connect();
        console.log("Connected to Mongo DB successfully");
        return client.db("tzofia-eye");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const db = await connectToMongo();
export default db;
