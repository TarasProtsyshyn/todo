import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useReduxAction = (action) => {
  const dispatch = useDispatch();

  return useCallback((...payload) => dispatch(action(...payload)), [action, dispatch]);
};
