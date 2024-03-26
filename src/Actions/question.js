import { _saveQuestion, _saveQuestionAnswer } from '../Utils/_DATA'
import { ADD_QUESTION, RECEIVE_QUESTIONS, SAVE_ANSWER } from '../types'


export const receiveQuestions = questions => ({
    type: RECEIVE_QUESTIONS,
    questions,
})


export const addQuestion = question => ({ type: ADD_QUESTION, question })


export const handleSaveQuestion = question => dispatch => _saveQuestion(question)
    .then(question => dispatch(addQuestion(question)))


export const saveUserAnswer = ({ authedUser, qid, answer }) => ({ type: SAVE_ANSWER, authedUser, qid, answer })


export const handleSaveAnswer = info => dispatch => _saveQuestionAnswer(info)
    .then(() => dispatch(saveUserAnswer(info)))



