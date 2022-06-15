import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { AuthPage, MainPage } from '../pages'
import { useTypedSelector } from '../store'
import { initAppAction } from '../store/user'
import { PublicLayout } from './AuthRouter'
import { PrivateLayout } from './HomeRouter'

export const MainRouter = () => {
  const { token } = useTypedSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAppAction.request())
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <PublicLayout path="/auth" exact component={AuthPage} />
        <PrivateLayout path="/home" exact component={MainPage} />
        <Redirect to={token ? '/home' : '/auth'} />
      </Switch>
    </BrowserRouter>
  )
}
