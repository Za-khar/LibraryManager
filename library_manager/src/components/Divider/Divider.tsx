import React, { FC } from 'react'
import { TDividerProps } from './types'
import { Block } from './styled'

const Divider: FC<TDividerProps> = ({ width, height, background }) => {
  return (
    <Block
      styledWidth={width!}
      styledHeight={height!}
      background={background!}
    />
  )
}

Divider.defaultProps = {
  width: 0,
  height: 0,
  background: 'transparent',
}

export default Divider
