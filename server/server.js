import express from "express";
import cors from "cors";

const { PORT } = process.env;
const server = express();

server.use(cors(), express.json());

server.listen(PORT, (err) => {
    if (err) return console.error(err);
    console.log(`http://localhost:${PORT}`);
});
