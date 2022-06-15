import { all } from 'redux-saga/effects'
import { bookWatcher } from './book'
import { historyWatcher } from './history'
import { userWatcher } from './user'

function* rootSaga() {
  yield all([userWatcher(), bookWatcher(), historyWatcher()])
}

export default rootSaga
