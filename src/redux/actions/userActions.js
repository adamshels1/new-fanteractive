import * as types from '@redux/types';

export const setUserAction = item => ({
  type: types.SET_USER,
  payload: item
})

export const setTokenAction = item => ({
  type: types.SET_TOKEN,
  payload: item
})


export const logout = () => ({
  type: types.LOGOUT,
})