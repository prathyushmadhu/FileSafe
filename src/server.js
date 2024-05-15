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

// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Failed to connect to MongoDB:', error);
//   });



// Connecting mongoDB.
connectDB()


// Routing.
app.use('/api',routes);

// Run the server.
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})