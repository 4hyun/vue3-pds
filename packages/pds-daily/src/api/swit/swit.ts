import axios from 'axios'
import { Projects, Auth } from './apis'

const { VITE_SWIT_API_BASEURL } = import.meta.env

const client = axios.create({ baseURL: VITE_SWIT_API_BASEURL })
export const TOKEN_URL = VITE_SWIT_API_BASEURL + '/oauth/token'
export const AUTHORIZE_URL = VITE_SWIT_API_BASEURL + '/oauth/authorize'

export const apis = {
  Auth,
  Projects,
}

export default client
