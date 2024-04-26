import mongoose from "mongoose";

export const mongoConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI, { dbName: "CRUD" })
        .then(() => console.log("Database connected succesfully"))
        .catch((err) => console.log(`Error While database connnectrion ${err}`))
} 
