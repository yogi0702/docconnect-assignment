const BASE_URL = 'http://localhost:5000'

export const CURRENT_USER_ID = '6ad06cff0354652bd86637c3'

async function request(path, options) {
  const response = await fetch(`${BASE_URL}${path}`, options)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

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
