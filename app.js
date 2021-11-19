const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const bodyParser = require("body-parser");

const ProjectsInfoRouter = require("./routes/projectsInfoRouter");


dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

app.use("/projects", ProjectsInfoRouter);

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} made on port ${PORT}` )
);