import axios from 'axios'
import { default_api } from '../../consts'
import { TBook } from './types'

export const getAllBooksAPI = async (
  token: string,
  page: number,
  limit: number
) => {
  return axios.get(`${default_api}/book?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const addBookAPI = async (token: string, data: TBook) => {
  return axios.post(`${default_api}/book`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const updateBookAPI = async (token: string, data: TBook) => {
  return axios.put(`${default_api}/book`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const deleteBookAPI = async (token: string, book_id: number) => {
  return axios.delete(`${default_api}/book?book_id=${book_id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
