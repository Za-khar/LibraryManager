import { AxiosError } from 'axios'
import { takeLatest, call, put } from '@redux-saga/core/effects'
import {
  clearUserError,
  getUserAction,
  initAppAction,
  loginAction,
  registrationAction
} from './actions'
import { getUserAPI, loginUserAPI, registrationUserAPI } from './api'
import {
  TGetUserResponse,
  TUserLoginResponse,
  TUserRegistrationResponse
} from './types'
import { select } from 'redux-saga/effects'
import { getUserSelector } from './selectors'

function* loginUserWorker({
  payload
}: ReturnType<typeof loginAction['request']>) {
  try {
    const { data }: { data: TUserLoginResponse } = yield call(
      loginUserAPI,
      payload
    )

    yield put(loginAction.success(data))
    window.location.reload()
  } catch (e: any) {
    yield put(loginAction.failure(e))
  }
}

function* registrationUserWorker({
  payload
}: ReturnType<typeof registrationAction['request']>) {
  try {
    const { data }: { data: TUserRegistrationResponse } = yield call(
      registrationUserAPI,
      payload
    )

    yield put(registrationAction.success(data))
    window.location.reload()
  } catch (e: any) {
    yield put(registrationAction.failure(e))
  }
}

function* getUserWorker() {
  try {
    const { token } = yield select(getUserSelector)

    const { data }: { data: TGetUserResponse } = yield call(getUserAPI, token)
    yield put(getUserAction.success(data))
  } catch (e: any) {
    yield put(getUserAction.failure(e))
    yield put(clearUserError())
  }
}

function* initAppWorker({
  payload
}: ReturnType<typeof initAppAction['request']>) {
  try {
    yield put(getUserAction.request())
    yield put(initAppAction.success())
  } catch (e: any) {
    yield put(initAppAction.failure(e))
    yield put(clearUserError())
  }
}

export function* userWatcher() {
  yield takeLatest(loginAction.request, loginUserWorker)
  yield takeLatest(registrationAction.request, registrationUserWorker)
  yield takeLatest(initAppAction.request, initAppWorker)
  yield takeLatest(getUserAction.request, getUserWorker)
}
