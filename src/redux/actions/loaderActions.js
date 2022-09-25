import * as types from '@redux/types';

export const loaderAction = ({isLoading, message=''}) => ({
  type: types.TOGGLE_LOADER,
  payload: {
    isLoading,
    message,
  },
})