const { VITE_SWIT_API_BASEURL } = import.meta.env

export const PAGE_LIMIT = 20
export const RATE_LIMIT_INTERVAL = 60001
export const TOKEN_URL = VITE_SWIT_API_BASEURL + '/oauth/token'
export const AUTHORIZE_URL = VITE_SWIT_API_BASEURL + '/oauth/authorize'
export const GRANT_TYPE = 'authorization_code'
