import express, { Request, Response } from "express";
import dotenv from "dotenv";
import journalRoutes from "./routes/journalRoutes";
import logger from "./middleware/logger";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/", journalRoutes)
app.use(logger)
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Personal Journal API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
