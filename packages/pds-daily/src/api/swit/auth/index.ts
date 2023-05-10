import type { AxiosRequestConfig } from 'axios'
import { AUTHORIZE_URL, GRANT_TYPE } from '../constants'
const {
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_AUTH_REDIRECT_URI: redirect_uri,
} = import.meta.env

const grant_type = GRANT_TYPE
const response_type = 'code'

export const authorize = () => {
  const client_id = VITE_CLIENT_ID
  const scope = 'project:read'
  const params = { client_id, redirect_uri, response_type, scope }
  return { url: AUTHORIZE_URL, params }
}

type AuthParams = {
  client_id: string
  redirect_uri: string
  response_type: 'code'
  scope: string
}
export const authorizeWithParams = (options: {
  params: Pick<AuthParams, 'client_id' | 'redirect_uri'>
}) => {
  const scope = 'project:read task:read'
  const params = { ...options.params, response_type, scope }
  return { url: AUTHORIZE_URL, params }
}

export const token = (
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
}
