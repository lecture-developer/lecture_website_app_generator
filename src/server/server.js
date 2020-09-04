import User from "./src/models/user";
import mailgun from "mailgun-js";
import { generateDbConnectionFailedEmail } from "./src/resources/emails";
import path from "path";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routers from "./src/routes/";
dotenv.config();
import logger from './logger';

const app = express();
app.use(cors());
app.use(express.json());

// Mongo setup
const uri = process.env.ATLAS_URI;
try {
  mongoose.connect(
    uri,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    () => logger.info("DB connection established successfully")
  );
} catch (err) {
  logger.error("DB connection error: " + err);
  try {
    logger.info("Trying to send email to admin about error...");
    const mg = mailgun({
      apiKey: process.env.MAILGUN_APIKEY,
      domain: process.env.MAILGUN_DOMAIN,
    });
    const data = generateDbConnectionFailedEmail(err);
    mg.messages().send(data, function (error, body) {
      logger.info(body);
    });
  } catch (err) {
    logger.error("Sending email failed with error: " + err);
  }
}

// User page routing
app.use("/users", routers.userRouter);

// Index page routing
app.use("/index", routers.indexRouter);

const port = process.env.PORT;

// Starts the server
app.listen(port, () => {
  logger.info(`Server is running on port: ${port}`);
});
