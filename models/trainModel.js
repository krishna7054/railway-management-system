const sql = require('../config/db');

// Function to create a new train
const createTrain = async (train_name, source, destination, total_seats) => {
  console.log(train_name, source, destination, total_seats);
  return await sql`
    INSERT INTO trains (train_name, source, destination, total_seats)
    VALUES (${train_name}, ${source}, ${destination}, ${total_seats})
    RETURNING *
  `;
};

// Function to update available seats for a train
const updateSeats = async (trainId, total_seats) => {
  return await sql`
    UPDATE trains 
    SET total_seats = ${total_seats} 
    WHERE id = ${trainId} 
    RETURNING *
  `;
};

module.exports = { createTrain, updateSeats };
