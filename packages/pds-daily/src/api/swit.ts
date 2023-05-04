import axios from 'axios'

const {
  VITE_AUTH_ENDPOINT,
  VITE_TOKEN_ENDPOINT,
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_AUTH_REDIRECT_URI: redirect_uri,
} = import.meta.env

const grant_type = 'authorization_code'
const client = axios.create({ baseURL: VITE_AUTH_ENDPOINT })

export const authorizeURL = VITE_AUTH_ENDPOINT
export const tokenURL = VITE_TOKEN_ENDPOINT

export const requestConfig = {
  authorize: () => {
    const client_id = VITE_CLIENT_ID
    const response_type = 'code'
    const scope = 'project:read'
    const params = { client_id, redirect_uri, response_type, scope }
    return { params }
  },
  token: (code) => {
    const client_id = VITE_CLIENT_ID
    const params = {
      grant_type,
      client_id,
      client_secret: VITE_CLIENT_SECRET,
      redirect_uri,
      code,
    }
    return [
      params,
      // config
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    ]
  },
}

export const authorize = () => {
  const client_id = VITE_CLIENT_ID
  const response_type = 'code'
  const scope = 'project:read'
  const params = { client_id, redirect_uri, response_type, scope }

  return client.get('/', {
    params,
  })
}

export default client
