import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');
console.log('Loading env from', envPath);
dotenv.config({ path: envPath });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI missing in backend .env');
  process.exit(1);
}

const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model('User', userSchema, 'users');

const skills = [
  'JavaScript',
  'React',
  'Node.js',
  'MongoDB',
  'Express',
  'Python',
  'Docker',
  'AWS',
  'TypeScript',
  'HTML',
  'CSS',
];

const users = [
  {
    name: 'Aarav Kapoor',
    email: 'aarav.kapoor@example.com',
    username: 'everything1',
    password: await bcrypt.hash('Aarav123!', 10),
    picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK4qEfbnd-RN82wdL2awn_PMviy_pelocqQ',
    rating: 5,
    linkedinLink: 'https://www.linkedin.com/in/everything1',
    githubLink: 'https://github.com/everything1',
    portfolioLink: 'https://everything1.dev',
    skillsProficientAt: skills,
    skillsToLearn: skills,
    bio: 'Full-stack engineer with broad expertise across frontend, backend, and cloud infrastructure.',
    education: [],
    projects: [],
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    username: 'everything2',
    password: await bcrypt.hash('Priya123!', 10),
    picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK4qEfbnd-RN82wdL2awn_PMviy_pelocqQ',
    rating: 5,
    linkedinLink: 'https://www.linkedin.com/in/everything2',
    githubLink: 'https://github.com/everything2',
    portfolioLink: 'https://everything2.dev',
    skillsProficientAt: skills,
    skillsToLearn: skills,
    bio: 'Engineering leader who knows everything from APIs to deployment pipelines.',
    education: [],
    projects: [],
  },
  {
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    username: 'everything3',
    password: await bcrypt.hash('Rohan123!', 10),
    picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK4qEfbnd-RN82wdL2awn_PMviy_pelocqQ',
    rating: 5,
    linkedinLink: 'https://www.linkedin.com/in/everything3',
    githubLink: 'https://github.com/everything3',
    portfolioLink: 'https://everything3.dev',
    skillsProficientAt: skills,
    skillsToLearn: skills,
    bio: 'Polyglot developer with an everything mindset ready for any challenge.',
    education: [],
    projects: [],
  },
];

async function run() {
  await mongoose.connect(uri);
  const deleteResult = await User.deleteMany({});

  const inserted = await User.insertMany(users);
  console.log('deleted:', deleteResult.deletedCount, 'inserted:', inserted.length);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
