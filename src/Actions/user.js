import { GET_ALL_USERS, RECEIVE_USERS } from "../types"

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users,
})



export const getAllUsers = (users) => ({
    type: GET_ALL_USERS,
    users,
})