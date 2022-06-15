import { takeLatest, call, put } from '@redux-saga/core/effects'

import { select } from 'redux-saga/effects'
import { getHistory } from './actions'
import { getUserSelector } from '../user'
import { getHistoryAPI } from './api'

function* getHistoryWorker({
  payload: { limit = 5, page }
}: ReturnType<typeof getHistory['request']>) {
  try {
    const { token } = yield select(getUserSelector)
    const { data }: { data: any } = yield call(
      getHistoryAPI,
      token,
      page,
      limit
    )

    yield put(getHistory.success(data))
  } catch (e: any) {
    yield put(getHistory.failure(e))
  }
}

export function* historyWatcher() {
  yield takeLatest(getHistory.request, getHistoryWorker)
}
