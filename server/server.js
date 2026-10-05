import express from "express";
import cors from "cors";
import alertRouter from "./routes/alerts.routes.js";

const { PORT } = process.env;
const server = express();

server.use(cors(), express.json());
server.use("/api/alerts", alertRouter);

server.listen(PORT, (err) => {
    if (err) return console.error(err);
    console.log(`http://localhost:${PORT}`);
});
