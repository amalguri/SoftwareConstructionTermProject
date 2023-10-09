require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const cors = require("cors");
const router = require("./routes/router");

const port = process.env.PORT || 8003;

// Middleware
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.json("server start")
})
// Routes
app.use(router);

app.listen(port, () => {
    console.log(`server is up and running on port: ${port}`);
});
