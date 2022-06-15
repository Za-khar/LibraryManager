import React from 'react'
import { Route } from 'react-router-dom'

export const PublicLayout = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <React.Fragment>{<Component {...props} />}</React.Fragment>
      )}
    />
  )
}
