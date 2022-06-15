import { bookReducer } from './book/reducer'
import { combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './user'
import { historyReducer } from './history'

export default combineReducers({
  user: userReducer,
  book: bookReducer,
  history: historyReducer
})
