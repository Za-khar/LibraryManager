import axios from 'axios'
import { default_api } from '../../consts'
import { TUserLoginRequest, TUserRegistrationRequest } from './types'

export const loginUserAPI = async (data: TUserLoginRequest) => {
  return axios.post(`${default_api}/auth/login`, data, {
    headers: {}
  })
}

export const registrationUserAPI = async (data: TUserRegistrationRequest) => {
  return axios.post(`${default_api}/auth/registration`, data, {
    headers: {}
  })
}

export const getUserAPI = async (token: string) => {
  return axios.get(`${default_api}/user`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
