// Change this to your machine's LAN IP - a phone running Expo Go cannot reach localhost.
const BASE_URL = 'http://192.168.29.202:5000'

// No auth in this assignment, so the first seeded user is treated as the logged-in user.
export const CURRENT_USER_ID = '6acf1879aaf3a5e13c72ebe7'

async function request(path, options) {
  const response = await fetch(`${BASE_URL}${path}`, options)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

// The API stores relative paths so the data is not tied to one host.
export function imageUrl(path) {
  return path ? `${BASE_URL}${path}` : null
}

export function getPosts() {
  return request('/posts')
}

export function getUsers(currentUserId) {
  return request(`/users?currentUserId=${currentUserId}`)
}

export function getUser(id) {
  return request(`/users/${id}`)
}

export function sendConnect(from, to) {
  return request('/connect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to }),
  })
}
