const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signUp = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ err: 'Username already exists' });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role: role || 'user',
    });

    const payload = { _id: user._id, username: user.username, role: user.role };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ err: 'Invalid credentials' });
    }

    const payload = { _id: user._id, username: user.username, role: user.role };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { signUp, signIn };
