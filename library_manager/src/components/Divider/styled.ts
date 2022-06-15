import styled from 'styled-components'
import { TStyledDividerProps } from './types'

export const Block = styled.div<TStyledDividerProps>(
  ({ styledWidth: width, styledHeight: height, background }) => `
  width: ${width}px;
  height: ${height}px;
  background-color: ${background};
`,
)
