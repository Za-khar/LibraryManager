import axios from 'axios'
import { default_api } from '../../consts'

export const getHistoryAPI = async (
  token: string,
  page: number,
  limit: number
) => {
  return axios.get(`${default_api}/history?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
