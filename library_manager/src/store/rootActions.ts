import { createAction } from '@reduxjs/toolkit'

export const createActionTypes = (action: string) => ({
  REQUEST: `${action.toUpperCase()}_REQUEST`,
  SUCCESS: `${action.toUpperCase()}_SUCCESS`,
  FAILURE: `${action.toUpperCase()}_FAILURE`
})

/**
 *
 * @typeParam `R` the request payload type
 * @typeParam `S` the success payload type
 * @typeParam `F` the failure payload type
 */

export const createApiActions = <R, S, F>(
  actionTypes: ReturnType<typeof createActionTypes>
) => ({
  request: createAction<R>(actionTypes.REQUEST),
  success: createAction<S>(actionTypes.SUCCESS),
  failure: createAction<F>(actionTypes.FAILURE)
})

export type createActionTypes = typeof createActionTypes
export type createApiActions = typeof createApiActions
