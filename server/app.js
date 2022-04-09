const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require("./config/bd")


// Connecting to database
connectDB();

const app = express();

// work in http
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(cors());

// Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/travel",require("./routes/travelRoutes"))



const PORT = process.env.PORT || 8080;
app.listen(PORT,()=> console.log(`server running on port: ${PORT}`));