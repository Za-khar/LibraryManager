import { TAPIState } from './../rootTypes'

export type IBookState = {
  data: Array<TBook>
  total: number
} & TAPIState

export type TBook = {
  book_id: number
  name: string
  author: string
  year: number
  count: number
}
