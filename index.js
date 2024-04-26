import express from "express"
import { config } from "dotenv";
config({ path: "./config/.env" });
import { mongoConnection } from "./data/data.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import routes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { isAutheticated } from "./middleware/Autheticated.js";
import cors from "cors"

app.use(
    cors({
        options: [process.env.FORNTENDURL],
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
)

mongoConnection();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/user", routes);


app.get("/", isAutheticated, (req, res, next) => {
    try {
        res.status(200).json({
            message: "Home page"
        })
    } catch (error) {
        next(error);
    }
});

app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
    console.log(`server is on http://localhost:${process.env.PORT}`);
});