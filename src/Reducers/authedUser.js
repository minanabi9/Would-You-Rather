import { LOGOUT, SET_AUTHED_USER } from "../types"

export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return action.id
        case LOGOUT:
            return null
        default:
            return state
    }
}