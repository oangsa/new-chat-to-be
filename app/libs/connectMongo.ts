import mongoose from "mongoose";

export default async function connectMongo() {
    const url:any = process.env.DB_URLS
    if (mongoose.connection.readyState === 1) return mongoose.connection.asPromise();
    return await mongoose.connect(url);
}