require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./db');
const User = require('./models/User');

async function seed() {
  try {
    await connectDB();

    const email = 'test@example.com';
    const existing = await User.findOne({ email });

    if (existing) {
      console.log('Seed user already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('password123', 10);
    await User.create({
      name: 'Test User',
      email,
      password: hashedPassword
    });

    console.log('Seed user created');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();
