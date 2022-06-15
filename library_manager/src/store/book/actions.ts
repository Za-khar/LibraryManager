import { TBook } from './types'
import { createActionTypes, createApiActions } from '../rootActions'
import { TAxiosError } from '../rootTypes'
import { createAction } from '@reduxjs/toolkit'

export const getAllBooks = createApiActions<
  { limit?: number; page: number },
  any,
  TAxiosError
>(createActionTypes('BOOK/GET_ALL'))

export const addBook = createApiActions<
  { limit?: number; page: number } & TBook,
  any,
  TAxiosError
>(createActionTypes('BOOK/ADD_BOOK'))

export const updateBook = createApiActions<
  { limit?: number; page: number } & TBook,
  any,
  TAxiosError
>(createActionTypes('BOOK/UPDATE_BOOK'))

export const deleteBook = createApiActions<
  { limit?: number; page: number } & { book_id: number },
  any,
  TAxiosError
>(createActionTypes('BOOK/DLETE_BOOK'))

export const clearBookError = createAction<void>('BOOK/CLEAR_ERROR')
