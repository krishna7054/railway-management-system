const { modelbookSeats, modelcheckAvailability, modelgetBookingDetails } = require('../models/bookingModel');
const Train = require('../models/trainModel'); // Ensure you import Train model

// Check availability of trains based on source, destination, and date
const checkAvailability = async (req, res) => {
  const { source, destination } = req.query; // Assuming date is passed in query

  try {
    const availableTrains = await modelcheckAvailability(source, destination); // Call the model method
    res.status(200).json(availableTrains);
  } catch (err) {
    console.error('Error checking availability:', err);
    res.status(500).json({ error: 'Error checking availability' });
  }
};

// Book seats for a train
const bookSeats = async (req, res) => {
  const { trainId } = req.body;
  const userId = req.user.id; // Get user ID from the token

  try {
    const booking = await modelbookSeats(userId, trainId); // Call the model method
    res.status(201).json(booking);
  } catch (err) {
    console.error('Error booking seats:', err);
    res.status(500).json({ error: 'Error booking seats' });
  }
};

// Get booking details for a user
const getBookingDetails = async (req, res) => {
  const userId = req.user.id; // Get user ID from the token

  try {
    const bookings = await modelgetBookingDetails(userId); // Call the model method
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error getting booking details:', err);
    res.status(500).json({ error: 'Error getting booking details' });
  }
};

module.exports = { checkAvailability, bookSeats, getBookingDetails };
