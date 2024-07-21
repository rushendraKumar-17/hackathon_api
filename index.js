const express = require("express");
const cors = require("cors");
const connectToDb = require("./ConnectDB");
const app = express();

app.use(express.json());

app.use(cors());

connectToDb();

const port = 8000;
app.use("/api/create/",require("./Routes/auth"));
// app.use("/event/",require("./Routes/events"));


app.listen(port,()=>console.log("Server running at "+port));