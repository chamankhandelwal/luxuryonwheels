import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const port = process.env.PORT || 5000;

await connectDB();

app.listen(port, () => {
  console.log(`Luxury on Wheels API running on port ${port}`);
});
