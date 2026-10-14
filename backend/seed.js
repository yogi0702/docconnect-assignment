require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const User = require('./models/User')
const Post = require('./models/Post')
const Connection = require('./models/Connection')

// Names and avatars mirror the Figma, which repeats the same placeholder
// name across every card. Only the avatars differ between profiles.
const users = [
  {
    // Logged-in user. image-3 is the avatar on the Home screen in the design.
    name: 'Dr. Arjun Mehta',
    occupation: 'Cardiology',
    profileImage: '/assets/profile/image-3.png',
    connectionsCount: 2,
  },
  {
    // Author of every feed post, as shown in the design.
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

// Image order follows the design: the surgeon poster is the first post in the feed.
const posts = [
  { content: WELCOME, image: '/assets/posts/post-5.png', likes: 5, shares: 3 },
  { content: WELCOME, image: '/assets/posts/post-1.png', likes: 5, shares: 3 },
  {
    content:
      'Celebrating the people who hold our hospitals together. Share this with a colleague who deserves to hear it today.',
    image: '/assets/posts/post-3.png',
    likes: 8,
    shares: 2,
  },
  {
    content:
      'Wellness Week starts Tuesday. Sessions on burnout, sleep and mental health, open to every healthcare professional on Docconnect.',
    image: '/assets/posts/post-2.png',
    likes: 12,
    shares: 4,
  },
  {
    content:
      'New on Docconnect: find and connect with specialists by field and location. Tell us which features you want next.',
    image: '/assets/posts/post-4.png',
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

  // All feed posts come from the Docconnect account, matching the design.
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
