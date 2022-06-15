import {
  addBook,
  deleteBook,
  getAllBooks,
  updateBook,
  clearBookError
} from './actions'
import { createReducer } from '@reduxjs/toolkit'
import { IBookState } from './types'

const InitialState: IBookState = {
  data: [],
  loading: false,
  total: 0,
  err: null
}

export const bookReducer = createReducer<IBookState>(
  InitialState,
  (builder) => {
    builder.addCase(getAllBooks.request, (state) => ({
      ...state,
      loading: true,
      error: null
    }))
    builder.addCase(getAllBooks.success, (state, { payload }) => ({
      ...state,
      loading: false,
      data: payload.data,
      total: payload.total
    }))
    builder.addCase(getAllBooks.failure, (state, { payload }) => ({
      ...state,
      loading: false,
      err: payload?.response
        ? payload.response?.data?.message
        : payload.toString()
    }))

    builder.addCase(addBook.request, (state) => ({
      ...state,
      loading: true,
      error: null
    }))
    builder.addCase(addBook.success, (state, { payload }) => ({
      ...state,
      loading: false
    }))
    builder.addCase(addBook.failure, (state, { payload }) => ({
      ...state,
      loading: false,
      err: payload?.response
        ? payload.response?.data?.message
        : payload.toString()
    }))

    builder.addCase(updateBook.request, (state) => ({
      ...state,
      loading: true,
      error: null
    }))
    builder.addCase(updateBook.success, (state, { payload }) => ({
      ...state,
      loading: false
    }))
    builder.addCase(updateBook.failure, (state, { payload }) => ({
      ...state,
      loading: false,
      err: payload?.response
        ? payload.response?.data?.message
        : payload.toString()
    }))

    builder.addCase(deleteBook.request, (state) => ({
      ...state,
      loading: true,
      error: null
    }))
    builder.addCase(deleteBook.success, (state, { payload }) => ({
      ...state,
      loading: false
    }))
    builder.addCase(deleteBook.failure, (state, { payload }) => ({
      ...state,
      loading: false,
      err: payload?.response
        ? payload.response?.data?.message
        : payload.toString()
    }))

    builder.addCase(clearBookError, (state, { payload }) => ({
      ...state,
      err: null
    }))
  }
)
