const express = require("express");
const cors = require("cors");
import InitAPI from "./routers/api";
require("dotenv").config();

const app = express();

const corsOpts = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOpts));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

InitAPI(app);

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
