import express from "express";
import fs from "fs";
import { createJsonFilePath } from "../resources/methods";

const router = express.Router();

// Create data
router.post("/", (req, res) => {
  const data = req.body;
  const file = createJsonFilePath("index-data.json");

  fs.writeFile(file, JSON.stringify(data), (err) => {
    if (err) res.send("Error creating the file: ", err);
    res.send("Successfully created the data file");
  });
});

// Get data

// Update data

export default router;
