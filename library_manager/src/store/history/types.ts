import { TAPIState } from './../rootTypes'

export type IHistoryState = {
  data: Array<THistory>
  total: number
} & TAPIState

export type THistory = {
  id: string
  bookName: string
  studentName: string
  returnDate: string
  dueDate: string
  loanedDate: string
}
