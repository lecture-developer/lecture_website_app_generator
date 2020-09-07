import express from "express";
import fs from "fs";
import { createUserDataDir } from "../resources/methods";

const router = express.Router();

// Create data
router.post("/", (req, res) => {
  const { userId, data } = req.body;

  const dirPath = createUserDataDir(userId);
  const filePath = dirPath + '/publications-data.json';

  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) res.send("Error creating the file: ", err);
    res.send("Successfully created the data file");
  });
});

// Get data

// Update data

export default router;
