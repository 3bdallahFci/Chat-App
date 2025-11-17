import express from 'express';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './lib/db.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);


app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
  connectDB(process.env.MONGODB_URI);
});
