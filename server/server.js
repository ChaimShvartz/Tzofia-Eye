import express from "express";
import cors from "cors";
import alertRouter from "./routes/alerts.routes.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const { PORT } = process.env;
const server = express();

server.use(cors(), express.json());
server.use("/api/alerts", alertRouter);
server.use(notFoundHandler, errorHandler);

server.listen(PORT, (err) => {
    if (err) return console.error(err);
    console.log(`http://localhost:${PORT}`);
});
