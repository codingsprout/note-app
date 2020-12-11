const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userControl = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await Users.findOne({ email: email });

      if (user)
        return res
          .status(400)
          .json({ message: 'The email has already been used' });

      const hash_password = await bcrypt.hash(password, 10);
      const newUser = new Users({
        username,
        email,
        password: hash_password,
      });
      await newUser.save();
      res.json({ message: 'Sign up success' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ message: 'User does not exist' });

      //if login success create token
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ message: 'Password did not match, please try again' });

      const payload = { id: user._id, name: user.username };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '1d',
      });
      res.json({ token });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  verifiedToken: (req, res) => {
    try {
      const token = req.header('Authorization');
      if (!token) return res.send(false);

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        if (err) return res.send(false);

        const user = await Users.findById(verified.id);
        if (!user) return res.send(false);

        return res.send(true);
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = userControl;
