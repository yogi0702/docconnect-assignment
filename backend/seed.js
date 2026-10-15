require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const User = require('./models/User')
const Post = require('./models/Post')
const Connection = require('./models/Connection')

const users = [
  {
    name: 'Dr. Arjun Mehta',
    occupation: 'Cardiology',
    profileImage: '/assets/profile/image-3.png',
    connectionsCount: 2,
  },
  {
    name: 'Docconnect',
    occupation: 'Healthcare Technology',
    profileImage: '/assets/profile/image-1.png',
    connectionsCount: 2,
  },
  {
    name: 'Dr. Arjun Mehta',
    occupation: 'Cardiology',
    profileImage: '/assets/profile/image-2.png',
    connectionsCount: 2,
  },
  {
    name: 'Dr. Arjun Mehta',
    occupation: 'Cardiology',
    profileImage: '/assets/profile/image.png',
    connectionsCount: 2,
  },
  {
    name: 'Dr. Arjun Mehta',
    occupation: 'Cardiology',
    profileImage: '/assets/profile/image-4.png',
    connectionsCount: 2,
  },
]

const WELCOME =
  "Welcome to Docconnect! We're building India's largest healthcare professional network. " +
  'Connect with doctors, nurses, pharmacists, and medical students across the country. ' +
  "Let's transform healthcare collaboration together. 🇮🇳"

const posts = [
  { content: WELCOME, images: ['/assets/posts/post-5.png'], likes: 5, shares: 3 },
  {
    content: WELCOME,
    images: ['/assets/posts/post-1.png', '/assets/posts/post-4.png'],
    likes: 5,
    shares: 3,
  },
  {
    content:
      'Celebrating the people who hold our hospitals together. Share this with a colleague who deserves to hear it today.',
    images: ['/assets/posts/post-3.png'],
    likes: 8,
    shares: 2,
  },
  {
    content:
      'Wellness Week starts Tuesday. Sessions on burnout, sleep and mental health, open to every healthcare professional on Docconnect.',
    images: ['/assets/posts/post-2.png'],
    likes: 12,
    shares: 4,
  },
  {
    content:
      'New on Docconnect: find and connect with specialists by field and location. Tell us which features you want next.',
    images: ['/assets/posts/post-5.png', '/assets/posts/post-3.png'],
    likes: 6,
    shares: 1,
  },
]

async function seed() {
  await connectDB()

  await Promise.all([
    User.deleteMany({}),
    Post.deleteMany({}),
    Connection.deleteMany({}),
  ])

  const createdUsers = await User.insertMany(users)

  const docconnect = createdUsers.find((user) => user.name === 'Docconnect')

  const now = Date.now()
  await Post.insertMany(
    posts.map((post, i) => ({
      ...post,
      author: docconnect._id,
      timestamp: new Date(now - i * 60 * 60 * 1000),
    }))
  )

  console.log(`Seeded ${createdUsers.length} users and ${posts.length} posts`)
  console.log(`Logged-in user id: ${createdUsers[0]._id}`)

  await mongoose.connection.close()
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
