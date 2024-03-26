import { setAuthedUser } from '../Actions/authedUser'
import { getInitialData } from '../Utils/api'
import { receiveUsers } from './user'
import { receiveQuestions } from './question'

const AUTHED_ID = null;

export const handleInitialData = () => dispatch => getInitialData()
    .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
    })
