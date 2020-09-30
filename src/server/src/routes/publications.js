import express from "express";
import fs from "fs";
import { createUserDataDir, getUserDataDir } from "../resources/methods";

const router = express.Router();

// Create data
router.post("/", (req, res) => {
  const { userId, data } = req.body;

  const dirPath = createUserDataDir(userId);
  const filePath = dirPath + '/publications.json';

  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) res.send("Error creating the file: ", err);
    res.send("Successfully created the data file");
  });
});

// Get data
router.get("/", (req, res) => {
  const { userId } = req.query;
  
  const dirPath = getUserDataDir(userId);
  const filePath = dirPath + '/publications.json';

  const data = fs.readFileSync(filePath);
  res.send(JSON.parse(data));

  // fs.readFile(filePath, (err, data) => {
  //   if (err) res.send(`Error getting user ${userId} publications items: `, err);
  //   res.send(JSON.parse(data));
  // })
});

// Update data

export default router;
