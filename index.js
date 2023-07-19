const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const dotenv = require("dotenv");
const paymentRoutes = require("./routes/payment");
const webHookRoutes = require("./routes/webhook");
const app = express().use(body_parser.json())

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/payment/", paymentRoutes);
app.use("/", webHookRoutes);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));