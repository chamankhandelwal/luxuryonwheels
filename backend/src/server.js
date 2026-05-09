import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';
import { seedIfEmpty } from './seed/seedIfEmpty.js';

const port = process.env.PORT || 5000;

const mongoConnected = await connectDB();
if (mongoConnected) {
  await seedIfEmpty();
}

app.listen(port, () => {
  console.log(`Luxury on Wheels API running on port ${port}`);
});
