import { createReducer } from '@reduxjs/toolkit'
import { getHistory } from './actions'
import { IHistoryState } from './types'

const InitialState: IHistoryState = {
  data: [],
  loading: false,
  total: 0,
  err: null
}

export const historyReducer = createReducer<IHistoryState>(
  InitialState,
  (builder) => {
    builder.addCase(getHistory.request, (state) => ({
      ...state,
      loading: true,
      error: null
    }))
    builder.addCase(getHistory.success, (state, { payload }) => ({
      ...state,
      loading: false,
      data: payload.data,
      total: payload.total
    }))
    builder.addCase(getHistory.failure, (state, { payload }) => ({
      ...state,
      loading: false,
      err: payload?.response
        ? payload.response?.data?.message
        : payload.toString()
    }))
  }
)
