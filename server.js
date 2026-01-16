import "./config.js";
import { app } from './app.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 7000;


//connect to MongoDB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(async con => {
  console.log('Connection Successful to AMANAT Database !! 🎉');
});

app.listen(PORT, () => {
  console.log(`Server is running on port 🏠 ${PORT}`);
});