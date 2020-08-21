import express from 'express';
import fs from 'fs';

const router = express.Router();

const createJsonFile = (name, data) => {

}

// Create data
router.post('/', (req, res) => {
  const data = req.body;

  fs.writeFile('index-data.json', JSON.stringify(data), (err) => {
    if (err) res.send('Error creating the file: ', err);
    res.send('Successfully created the data file');
  });
});

// Get data

// Update data

export default router;
