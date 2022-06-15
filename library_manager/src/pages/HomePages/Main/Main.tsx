import React, { useState } from 'react'
import { useTypedSelector } from '../../../store'
import { BookPage } from '../Book'
import { HistoryPage } from '../History'

import { LeftBar } from './components'
import { Container } from './styled'

export const MainPage = () => {
  const [currentTab, setCurrentTab] = useState<'book' | 'history'>('book')

  return (
    <Container>
      <LeftBar setCurrentTab={setCurrentTab} />
      {currentTab === 'book' ? <BookPage /> : <HistoryPage />}
    </Container>
  )
}
