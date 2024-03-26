import { Avatar, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Redirect } from 'react-router-dom'
import { handleSaveAnswer } from '../Actions/question'

export const Question = (props) => {
    const {askerID,askerName,questionID} = props
    const authedUser = useSelector(state => state.authedUser)
    let allQuestions = useSelector(state => state.questions)
    let users = useSelector(state => state.users)
    const [option, setOption] = useState(Object.keys(users[authedUser].answers).includes(questionID) ? users[authedUser].answers[questionID]:'undefiend')
    const dispatch = useDispatch()
    const handleChange = (e) => {setOption(e.target.value) }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(handleSaveAnswer({authedUser:authedUser, qid:questionID, answer:option}))
    }
    const [viewPoll, setViewPoll] = useState(false) 
    const handleViewPoll = (e) => {
        setViewPoll(true)
    }
    if(viewPoll){
        return <Redirect to = {`/questions/${questionID}`}></Redirect>
    }
    return <>
        <Card >
            <CardHeader title={`${askerName} asks:`} subheader='Would You Rather' avatar={<Avatar src={`/${askerID}.png`} />}></CardHeader>
            <CardContent>
                <FormControl component="fieldset">
                    <FormLabel component="legend"></FormLabel>
                    <RadioGroup aria-label="options" name="option" value={option} onChange={handleChange}>
                        <FormControlLabel value='optionOne' control={<Radio />} label={allQuestions[questionID].optionOne.text} />
                        <FormControlLabel value='optionTwo' control={<Radio />} label={allQuestions[questionID].optionTwo.text} />
                    </RadioGroup>
                </FormControl>

            </CardContent>
            <CardActions>
                <Button type='submit' variant='outlined' onClick={handleSubmit}>Submit</Button>
                <Button type='Button' variant='outlined' onClick={handleViewPoll} >View Poll</Button>
            </CardActions>
        </Card>
    </>
}