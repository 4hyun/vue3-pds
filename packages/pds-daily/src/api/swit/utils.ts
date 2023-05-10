import type { AxiosResponse } from 'axios'
import { PAGE_LIMIT } from './constants'

export const usePageParams = (response: AxiosResponse) => {
  const offset = response.data.offset
  console.log(`Next page offset: ${offset}`)
  const limit = PAGE_LIMIT
  const qs = `limit=${limit}&offset=${offset}`
  return { offset, limit, qs }
}
