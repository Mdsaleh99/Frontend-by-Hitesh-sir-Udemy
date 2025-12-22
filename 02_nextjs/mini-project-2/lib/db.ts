import mongoose, { Error } from "mongoose";


export default async function connectToDatabase() {
    let isConnected = false;
    const MONGODB_URI: string = process.env.NEXT_MONGODB_URI || '';
    if (isConnected) {
        console.log(`Mongodb is already Connected`);
        return;
    }
    try {
        const db = await mongoose.connect(MONGODB_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log(`Connected to DB!!`);
    } catch (error) {
        const err = error as Error.MongooseServerSelectionError;
        console.error(`Mongodb connection failed: `, err.message);
        throw err;
    }
}