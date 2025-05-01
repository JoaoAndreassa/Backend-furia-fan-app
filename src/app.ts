import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import { errorMiddleware } from "./errors/error.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
	res.send("Furia Fans API running!");
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
