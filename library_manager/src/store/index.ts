import { applyMiddleware, createStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { TRootState } from './rootTypes'

const persistedReducer = persistReducer(
  {
    key: 'library.store',
    storage,
    blacklist: []
  },
  rootReducer
)

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, logger]

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export default store

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector
