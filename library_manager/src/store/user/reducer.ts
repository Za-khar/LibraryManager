import { createReducer } from '@reduxjs/toolkit'

import {
  getUserAction,
  loginAction,
  registrationAction,
  clearUserError,
  logoutUser
} from './actions'
import { IUserState } from './types'

const InitialState: IUserState = {
  data: null,
  token: '',
  loading: false,
  err: null
}

export const userReducer = createReducer<IUserState>(
  InitialState,
  (builder) => {
    builder.addCase(loginAction.request, (state) => ({
      ...state,
      loading: true,
      error: null
    }))
    builder.addCase(loginAction.success, (state, { payload }) => ({
      ...state,
      loading: false,
      data: payload,
      token: payload.token
    }))
    builder.addCase(loginAction.failure, (state, { payload }) => ({
      ...state,
      loading: false,
      err: payload?.response
        ? payload.response?.data?.message
        : payload.toString()
    }))

    builder.addCase(registrationAction.request, (state) => ({
      ...state,
      loading: true,
      error: null
    }))
    builder.addCase(registrationAction.success, (state, { payload }) => ({
      ...state,
      loading: false,
      data: payload,
      token: payload.token
    }))
    builder.addCase(registrationAction.failure, (state, { payload }) => ({
      ...state,
      loading: false,
      err: payload?.response
        ? payload.response?.data?.message
        : payload.toString()
    }))

    builder.addCase(getUserAction.request, (state) => ({
      ...state,
      loading: true,
      error: null
    }))
    builder.addCase(getUserAction.success, (state, { payload }) => ({
      ...state,
      loading: false,
      data: payload
    }))
    builder.addCase(getUserAction.failure, (state, { payload }) => ({
      ...state,
      loading: false,
      err: payload?.response
        ? payload.response?.data?.message
        : payload.toString()
    }))
    builder.addCase(clearUserError, (state) => ({
      ...state,
      err: null
    }))
    builder.addCase(logoutUser, (state) => ({
      ...state,
      data: null,
      token: '',
      err: null
    }))
  }
)
