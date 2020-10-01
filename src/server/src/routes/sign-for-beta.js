import express from 'express';
import Mailing from '../../emailController';
import { generateUserSignedForBetaEmail } from '../resources/emails';

const router = express.Router();


// Send email to the admin with the input from the form
router.post("/", (req, res) => {
  const { name, email, institution, research } = req.body;

  const data = generateUserSignedForBetaEmail(name, email, institution, research);
  Mailing.sendEmail(data);
  
  res.send("Sent email to the admin");
});

export default router;
