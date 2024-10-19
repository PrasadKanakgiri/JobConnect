import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env' // Adjusted to relative path
});


connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("Error before listening the app: ", error);
        throw error
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is succesfully running on http://localhost:${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MONGODB Connection failed in index.js: ", error);
})