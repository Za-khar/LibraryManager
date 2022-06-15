import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ModalContextProvider } from './contexts/Modals'
import { MainRouter } from './routes'

import store, { persistor } from './store'

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ModalContextProvider>
          <MainRouter />
        </ModalContextProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
