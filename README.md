# DocConnect

React Native (Expo) app with a Node.js / Express / MongoDB backend, implementing
the Home and Discover screens from the supplied Figma file.

## What is implemented

- **Home** - logged-in user's profile header and a scrollable feed of 5 posts,
  with loading and error states.
- **Discover** - list of users with a Connect button. Tapping it sends a connect
  request and the button becomes "Requested". The state is stored on the server,
  so it survives closing and reopening the app.

## Requirements

- Node.js 18+
- MongoDB running locally on the default port (27017)
- Expo Go on a physical device, or an Android emulator

## Backend

```
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

`.env` values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/docconnect
```

The seed script clears the collections and inserts 5 users and 5 posts, so it is
safe to run repeatedly. It prints the id of the first user, which is treated as
the logged-in user:

```
Logged-in user id: 6acf78d56b028d11e9ab5896
```

### Endpoints

| Method | Route | Description |
| --- | --- | --- |
| GET | `/posts` | All posts, newest first, with the author populated |
| GET | `/users?currentUserId=<id>` | All users except the current one, each with a `requested` flag |
| GET | `/users/:id` | A single user, used for the Home profile header |
| POST | `/connect` | Body `{ from, to }`. Creates a connection request |
| GET | `/health` | Returns `{ ok: true }` |

Images are served from `/assets`. The database stores relative paths such as
`/assets/profile/image-1.png`, and the app prefixes them with its base URL, so
changing machines does not require re-seeding.

## App

```
cd app
npm install
npx expo start
```

Open the project in Expo Go.

**Before running, check two values in `src/api/client.js`:**

```js
const BASE_URL = 'http://localhost:5000'
export const CURRENT_USER_ID = '6acf78d56b028d11e9ab5896'
```

There are two ways to let the device reach the backend. Pick either.

**With adb** (what the committed value assumes) - forward the ports once, and
the device's `localhost` tunnels to this machine:

```
adb reverse tcp:5000 tcp:5000
adb reverse tcp:8081 tcp:8081
```

**Without adb** - set `BASE_URL` to your machine's LAN IP, which a phone on the
same network can reach:

```js
const BASE_URL = 'http://192.168.1.15:5000'
```

Find it with `ipconfig` on Windows or `ifconfig` on macOS and Linux. A bare
`localhost` will not work in this case, because it resolves to the phone itself.

`CURRENT_USER_ID` must match the id printed by the seed script. Re-running the
seed generates new ids, so this needs updating each time.

If the app loads but every request fails, allow port 5000 through your firewall.

## Project structure

```
backend/
  config/db.js          Mongo connection
  models/               User, Post, Connection
  routes/               posts, users, connect
  seed.js               Clears and repopulates the database
  server.js             Express setup, static assets, error handling
  assets/               Profile and post images from the supplied ZIP

app/
  App.js                Font loading and bottom tab navigation
  assets/icons/         Supplied SVG icons
  src/api/client.js     Base URL and all network calls
  src/theme/            Colours and type scale from the handoff document
  src/components/       ProfileHeader, PostCard, UserCard, Loading, ErrorView
  src/screens/          HomeScreen, DiscoverScreen
```

## How the Requested state persists

Connect requests are stored server-side in a `Connection` collection rather than
in device storage. `GET /users` reads the current user's existing requests and
returns a `requested` flag on each user, so the app renders the correct button
state from the API on every launch. A connection request is shared state between
two users rather than a device preference, and device storage would not survive a
reinstall or a second device.

A unique compound index on `{ from, to }` prevents duplicate requests at the
database level. A repeated request returns 200 rather than an error, because the
state the caller wanted already holds.

## Notes and decisions

- **Colours and typography** come from the supplied handoff PDF and live in
  `src/theme/`. DM Sans is loaded through `@expo-google-fonts/dm-sans`.
- **Icons** are the supplied SVGs, imported as components via
  `react-native-svg-transformer`. Their hardcoded fills were changed to
  `currentColor` so the tab icons can be tinted when active. The small icon next
  to "2 Connects" is not in the supplied set, so a Feather icon is used there.
- **Seed names** mirror the Figma, which repeats the same placeholder name across
  cards. "Docconnect" exists as a user because every feed post in the design is
  authored by that account and the brief asks for five users in total.
- **Like and share counts** are seeded values rendered as plain text. The brief
  excludes extra interactions, so they are not tappable.
- **The search bar** on Discover is rendered to match the design but is not wired
  up, as search is a separate screen that is out of scope.
- **Bottom navigation** shows all three icons from the design, but only Home and
  Discover navigate. Chat is excluded by the brief, so its icon is rendered to
  match the layout and tapping it does nothing.
- **One image per post.** The design shows a carousel on one post; carousels were
  treated as an extra feature.
- **The Requested button style** is not specified in the design, so it uses the
  outlined treatment from the design's secondary button.
- **Discover excludes the logged-in user.**
