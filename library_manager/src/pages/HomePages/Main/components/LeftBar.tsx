import { Button, Link } from '@material-ui/core'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Divider } from '../../../../components'
import { useTypedSelector } from '../../../../store'
import { logoutUser } from '../../../../store/user'
import { LeftBarContainer } from './styled'

export const LeftBar: FC<{
  setCurrentTab: (v: 'book' | 'history') => void
}> = ({ setCurrentTab }) => {
  const { data } = useTypedSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <LeftBarContainer>
      <h2>{(data?.firstName ?? '') + ' ' + (data?.lastName ?? '')}</h2>
      <Divider height={50} />
      <Button
        color="primary"
        onClick={() => {
          setCurrentTab('book')
        }}
      >
        Книги
      </Button>
      <Divider height={20} />
      <Button
        color="primary"
        onClick={() => {
          setCurrentTab('history')
        }}
      >
        Історія
      </Button>
      <Divider height={30} />

      <Button
        color="primary"
        onClick={() => {
          history.push('/auth')
          dispatch(logoutUser())
          window.location.reload()
        }}
      >
        Вихід
      </Button>
    </LeftBarContainer>
  )
}
