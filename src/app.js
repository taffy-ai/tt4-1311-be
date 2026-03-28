const express = require("express");
const authRouter = require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");


const app = express();

app.use(express.json());


app.use("/auth", authRouter);
app.use("/api", taskRouter);


module.exports = app;