import { createActionTypes, createApiActions } from '../rootActions'
import { TAxiosError } from '../rootTypes'

export const getHistory = createApiActions<
  { limit?: number; page: number },
  any,
  TAxiosError
>(createActionTypes('HISTORY/GET'))
