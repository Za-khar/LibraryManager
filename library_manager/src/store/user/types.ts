import { TAPIState } from './../rootTypes'

export type IUserState = {
  token: string
  data: {
    id: string
    email: string
    firstName: string
    lastName: string
    photo?: string
  } | null
} & TAPIState

export type TUserLoginRequest = {
  email: string
  password: string
}

export type TUserLoginResponse = IUserState['data'] & { token: string }

export type TUserRegistrationRequest = {
  email: string
  firstName: string
  lastName: string
  password: string
}

export type TUserRegistrationResponse = IUserState['data'] & { token: string }

export type TGetUserResponse = IUserState['data']
