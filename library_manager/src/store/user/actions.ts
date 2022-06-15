import { createAction } from '@reduxjs/toolkit'
import {
  TUserLoginRequest,
  TUserLoginResponse,
  TUserRegistrationRequest,
  TUserRegistrationResponse,
  TGetUserResponse
} from './types'
import { createActionTypes, createApiActions } from '../rootActions'
import { TAxiosError } from '../rootTypes'

export const loginAction = createApiActions<
  TUserLoginRequest,
  TUserLoginResponse,
  TAxiosError
>(createActionTypes('USER/LOGIN'))

export const registrationAction = createApiActions<
  TUserRegistrationRequest,
  TUserRegistrationResponse,
  TAxiosError
>(createActionTypes('USER/REGISTRATION'))

export const getUserAction = createApiActions<
  void,
  TGetUserResponse,
  TAxiosError
>(createActionTypes('USER/GET'))

export const initAppAction = createApiActions<void, void, TAxiosError>(
  createActionTypes('USER/INIT')
)

export const clearUserError = createAction<void>('USER/CLEAR_ERROR')
export const logoutUser = createAction<void>('USER/LOGOUT')
