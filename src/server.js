require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db.config');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

// middleware.
app.use(express.json());
app.use(cors());
app.use(helmet());


// Connecting mongoDB.
connectDB()


// Routing.
app.use('/api',routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  });
  

// Run the server.
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})