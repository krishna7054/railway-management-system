const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');
require('dotenv').config();

// register a user 
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await createUser(username, email, hashedPassword, role);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await findUserByEmail(email); // This returns an array
    const user = result[0]; // Extract the first user from the result array

    console.log("user:", user); // Should show the user object
    if (!user) return res.status(404).json({ error: 'User not found' });

    console.log('Password Match:', user.password); // Should log the password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    req.user = { id: user.id, role: user.role }; 
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error logging in:', err); // Log the actual error for debugging
    res.status(500).json({ error: 'Error logging in' });
  }
};


module.exports = { registerUser, loginUser };
