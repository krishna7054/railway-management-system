const { createTrain, updateSeats } = require('../models/trainModel');

// Controller to add a new train
const addTrain = async (req, res) => {
  const { train_name,source, destination, total_seats } = req.body;

  try {
    const newTrain = await createTrain(train_name, source, destination, total_seats);
    res.status(201).json(newTrain);
  } catch (err) {
    console.error('Error adding train:', err);
    res.status(500).json({ error: 'Error adding train' });
  }
};

// Controller to update available seats
const updateTrainSeats = async (req, res) => {
  const { id } = req.params; // Train ID
  const { total_seats } = req.body;

  try {
    const updatedTrain = await updateSeats(id, total_seats);
    if (!updatedTrain) {
      return res.status(404).json({ error: 'Train not found' });
    }
    res.status(200).json(updatedTrain);
  } catch (err) {
    console.error('Error updating seats:', err);
    res.status(500).json({ error: 'Error updating seats' });
  }
};

module.exports = { addTrain, updateTrainSeats };
