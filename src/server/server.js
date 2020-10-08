import { generateDbConnectionFailedEmail } from "./src/resources/emails";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routers from "./src/routes/";
dotenv.config();
import logger from './logger';
import Mailing from './emailController'
import ActivationReminderJob from './src/jobs/ActivationReminderJob'

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
  // send email about db connection error
  logger.info("Trying to send email to admin about error...");
  const data = generateDbConnectionFailedEmail(err);
  Mailing.sendEmail(data);
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
  // Sign for beta landing page routing
  app.use('/sign-for-beta', routers.signForBetaRouter);
  // Join our team landing page routing
  app.use('/join-our-team', routers.joinOurTeamRouter);
  // Contact us landing page routing
  app.use('/contact-us', routers.contactUsRouter);
}

// Heroku
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('src/client/public'));

  // Load the static
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'../src/client','public','index.html'));
  });
}

/*
* Starts the server
*/
const startServer = () => {
  const port = process.env.PORT;
  app.listen(port, () => {
    logger.info(`Server is running on port: ${port}`);
  });
  ActivationReminderJob();
}

connetToMongo();  // Mongo setup
addRoutes();      // Adds routings to the relevant pages
startServer();    // Starts the server
