import { AxiosError } from 'axios'
import rootReducer from './rootReducer'

export type TRootState = ReturnType<typeof rootReducer>

export type TAPIState = {
  loading: boolean
  err: null | string
}

export type TResponseWithMessage = {
  message: string
}

export type TReturnPromiseType<T> = T extends PromiseLike<infer U> ? U : T

export type TAxiosError = {
  response: { data: { message: string } }
}
