import express from 'express';
import Mailing from '../../emailController';
import { generateUserContactsUsEmail } from '../resources/emails';

const router = express.Router();


// Send email to the admin with the input from the form
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  const data = generateUserContactsUsEmail(name, email, message);
  Mailing.sendEmail(data);
  
  res.send("Sent email to the admin");
});

export default router;
