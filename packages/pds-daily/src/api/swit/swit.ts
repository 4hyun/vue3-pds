import axios, { type AxiosRequestConfig } from 'axios'
import { Projects } from './apis'

const {
  VITE_SWIT_API_BASEURL,
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_AUTH_REDIRECT_URI: redirect_uri,
} = import.meta.env

const grant_type = 'authorization_code'
const client = axios.create({ baseURL: VITE_SWIT_API_BASEURL })
export const tokenURL = VITE_SWIT_API_BASEURL + '/oauth/token'
export const authorizeURL = VITE_SWIT_API_BASEURL + '/oauth/authorize'

export const apis = {
  authorize: () => {
    const client_id = VITE_CLIENT_ID
    const response_type = 'code'
    const scope = 'project:read'
    const params = { client_id, redirect_uri, response_type, scope }
    return { url: authorizeURL, params }
  },
  token: (
    code: string
  ): [
    string,
    {
      grant_type: string
      client_id: any
      client_secret: any
      redirect_uri: any
      code: string
    },
    AxiosRequestConfig
  ] => {
    const client_id = VITE_CLIENT_ID
    const params = {
      grant_type,
      client_id,
      client_secret: VITE_CLIENT_SECRET,
      redirect_uri,
      code,
    }
    return [
      '/oauth/token',
      params,
      {
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    ]
  },
  Projects,
}

export default client
