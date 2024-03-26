import { LOGOUT, SET_AUTHED_USER } from "../types"



export const setAuthedUser = (id) => ({ type: SET_AUTHED_USER, id })


export const logout = () => ({ type: LOGOUT, id: null })
