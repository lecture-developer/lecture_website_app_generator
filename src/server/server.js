import { generateDbConnectionFailedEmail } from "./src/resources/emails";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routers from "./src/routes/";
dotenv.config();
import logger from './logger';
import transporter from './email'

// app configuration
const app = express();
app.use(cors());
app.use(express.json());

/*
* Mongo setup
*/
const connetToMongo = () => {
const uri = process.env.ATLAS_URI;  // Used to connect to the relevant collection in the DB
try {
  // Trying to connect to the DB
  mongoose.connect(
    uri,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    () => logger.info("DB connection established successfully")
  );
} catch (err) {
  logger.error("DB connection error: " + err);
  try {
    // send email about db connection error
    logger.info("Trying to send email to admin about error...");
    const data = generateDbConnectionFailedEmail(err);
    transporter.sendMail(data, function(err, info){
      if(err) {
        logger.error(err);
      } else {
        logger.info('Email sent');
      }
    });
  } catch (err) {
    logger.error("Sending email failed with error: " + err);
  }
}
};

/*
* Adding routings tp the relevant pages
*/
const addRoutes = () => {
  // User page routing
  app.use("/users", routers.userRouter);
  // Index page routing
  app.use("/index", routers.indexRouter);
  // Publications page routing
  app.use("/publications", routers.publicationsRouter);
}

/*
* Starts the server
*/
const startServer = () => {
  const port = process.env.PORT;
  app.listen(port, () => {
    logger.info(`Server is running on port: ${port}`);
  });
}

connetToMongo();  // Mongo setup
addRoutes();      // Adds routings to the relevant pages
startServer();    // Starts the server
