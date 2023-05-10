import type { AxiosResponse } from 'axios'

const PAGE_LIMIT = 20

export const usePageParams = (response: AxiosResponse) => {
  const offset = response.data.offset
  console.log(`Next page offset: ${offset}`)
  const limit = PAGE_LIMIT
  const qs = `limit=${limit}&offset=${offset}`
  return { offset, limit, qs }
}
