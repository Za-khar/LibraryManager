import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useTypedSelector } from '../store'

export const PrivateLayout = ({ component: Component, ...rest }: any) => {
  const { token } = useTypedSelector((state) => state.user)

  return (
    <Route
      {...rest}
      render={(props) => (
        <React.Fragment>
          <div className="contentBar">
            {!token ? (
              <Redirect
                to={{ pathname: '/auth', state: { from: props.location } }}
              />
            ) : (
              <Component {...props} />
            )}
          </div>
        </React.Fragment>
      )}
    />
  )
}
