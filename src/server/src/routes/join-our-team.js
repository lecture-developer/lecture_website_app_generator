import express from 'express';
import Mailing from '../../emailController';
import { generateUserJoinsOurTeamEmail } from '../resources/emails';

const router = express.Router();


// Send email to the admin with the input from the form
router.post("/", (req, res) => {
  const { name, phone, email, shortBio } = req.body;

  const data = generateUserJoinsOurTeamEmail(name, phone, email, shortBio);
  Mailing.sendEmail(data);
  
  res.send("Sent email to the admin");
});

export default router;
