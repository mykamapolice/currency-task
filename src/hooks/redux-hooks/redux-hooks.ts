import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import {appDispatch, rootState} from "../../store";

export const useTypedSelector: TypedUseSelectorHook<rootState> = useSelector
export const useTypedDispatch = () => useDispatch<appDispatch>()
