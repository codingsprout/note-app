require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoute = require('./routes/userRoute');
const noteRoute = require('./routes/noteRoute');

//middleware
const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use('/user', userRoute);
app.use('/api/notes', noteRoute);

app.get('/', (req, res) => {
  res.json('Testing');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  }
);
