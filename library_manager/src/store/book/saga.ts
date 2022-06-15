import { addBook, deleteBook, getAllBooks, updateBook } from './actions'
import { AxiosError } from 'axios'
import { takeLatest, call, put } from '@redux-saga/core/effects'

import { select } from 'redux-saga/effects'
import { getUserSelector } from './selectors'
import { addBookAPI, deleteBookAPI, getAllBooksAPI, updateBookAPI } from './api'

function* getAllBooksWorker({
  payload: { limit = 5, page }
}: ReturnType<typeof getAllBooks['request']>) {
  try {
    const { token } = yield select(getUserSelector)
    const { data }: { data: any } = yield call(
      getAllBooksAPI,
      token,
      page,
      limit
    )

    yield put(getAllBooks.success(data))
  } catch (e: any) {
    yield put(getAllBooks.failure(e))
  }
}

function* addBookWorker({
  payload: { limit = 5, page, ...bookData }
}: ReturnType<typeof addBook['request']>) {
  try {
    const { token } = yield select(getUserSelector)
    const { data }: { data: any } = yield call(addBookAPI, token, bookData)

    yield put(addBook.success(data))
    yield put(getAllBooks.request({ limit, page }))
  } catch (e: any) {
    yield put(addBook.failure(e))
  }
}

function* updateBookWorker({
  payload: { limit = 5, page, ...bookData }
}: ReturnType<typeof updateBook['request']>) {
  try {
    const { token } = yield select(getUserSelector)
    const { data }: { data: any } = yield call(updateBookAPI, token, bookData)

    yield put(updateBook.success(data))
    yield put(getAllBooks.request({ limit, page }))
  } catch (e: any) {
    yield put(updateBook.failure(e))
  }
}

function* deleteBookWorker({
  payload: { limit = 5, page, book_id }
}: ReturnType<typeof deleteBook['request']>) {
  try {
    const { token } = yield select(getUserSelector)
    const { data }: { data: any } = yield call(deleteBookAPI, token, book_id)

    yield put(deleteBook.success(data))
    yield put(getAllBooks.request({ limit, page }))
  } catch (e: any) {
    yield put(deleteBook.failure(e))
  }
}

export function* bookWatcher() {
  yield takeLatest(getAllBooks.request, getAllBooksWorker)
  yield takeLatest(addBook.request, addBookWorker)
  yield takeLatest(updateBook.request, updateBookWorker)
  yield takeLatest(deleteBook.request, deleteBookWorker)
}
