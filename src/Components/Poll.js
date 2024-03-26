import { Avatar, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, LinearProgress, Radio, RadioGroup, withStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { handleSaveAnswer } from '../Actions/question'

export const Poll = () => {

    const authedUser = useSelector(state => state.authedUser)
    const path = useParams()
    let questions = useSelector(state => state.questions)
    let users = useSelector(state => state.users)
    let anserwedQuestionsID = authedUser ? Object.keys(users[authedUser].answers) : null


    const [option, setOption] = useState('undefiend')
    const handleChange = (e) => { setOption(e.target.value) }
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(handleSaveAnswer({ authedUser: authedUser, qid: path.questionID, answer: option }))
        return <Redirect to={`/questions/${path.questionID}`}></Redirect>
    }

    if (authedUser === null) {
        return <Redirect to={{ pathname: '/login', from: `/questions/${path.questionID}` }}></Redirect>
    }
    const BorderLinearProgress = withStyles((theme) => ({
        root: {
            height: 10,
            borderRadius: 5,
        },
        colorPrimary: {
            backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        bar: {
            borderRadius: 5,
            backgroundColor: 'crimson',
        },
    }))(LinearProgress);
    let allVotes = questions[path.questionID].optionOne.votes.length + questions[path.questionID].optionTwo.votes.length
    let optionOneVotesPercision = Number.parseFloat((questions[path.questionID].optionOne.votes.length / allVotes) * 100).toPrecision(3)
    let optionTwoVotesPercision = Number.parseFloat((questions[path.questionID].optionTwo.votes.length / allVotes) * 100).toPrecision(3)
    return <div className='home'>
        {anserwedQuestionsID.includes(path.questionID) ?
            <Card style={{ width: '45%' }}>
                <CardHeader style={{ textAlign: 'left', fontWeight: 'bold' }} title={`Asked by ${users[questions[path.questionID].author].name}`} avatar={<Avatar src={`/${questions[path.questionID].author}.png`} />}></CardHeader>
                <CardContent>
                    <p style={{ fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Results:</p>
                    <div style={{ border: 'thick solid crimson', padding: '20px', marginBottom: '20px' }}>
                        {users[authedUser].answers[path.questionID] === 'optionOne' && <span style={{ fontWeight: 'bold', textAlign: 'center', color: 'crimson' }}>YOUR SELECTED ANSWER</span>}
                        <p style={{ fontWeight: 'bold' }}>{`Would you Rather ${questions[path.questionID].optionOne.text}`}</p>
                        <BorderLinearProgress variant='determinate' value={parseFloat(optionOneVotesPercision)}></BorderLinearProgress>
                        <span>{`${optionOneVotesPercision}%`}</span>
                        <span style={{ fontWeight: 'bold', display: 'block' }}>{`${questions[path.questionID].optionOne.votes.length} out of ${allVotes} votes`}</span>
                    </div>
                    <div style={{ border: 'thick solid crimson', padding: '20px' }}>
                        {users[authedUser].answers[path.questionID] === 'optionTwo' && <span style={{ fontWeight: 'bold', textAlign: 'center', color: 'crimson' }}>YOUR SELECTED ANSWER</span>}
                        <p style={{ fontWeight: 'bold' }}>{`Would you Rather ${questions[path.questionID].optionTwo.text}`}</p>
                        <BorderLinearProgress variant='determinate' value={parseFloat(optionTwoVotesPercision)}></BorderLinearProgress>
                        <span>{`${optionTwoVotesPercision}%`}</span>
                        <span style={{ fontWeight: 'bold', display: 'block' }}>{`${questions[path.questionID].optionTwo.votes.length} out of ${allVotes} votes`}</span>
                    </div>
                </CardContent>
            </Card>
            :
            <Card style={{ width: '45%' }}>
                <CardHeader title={`${users[questions[path.questionID].author].name} asks:`} subheader='Would You Rather' avatar={<Avatar src={`/${questions[path.questionID].author}.png`} />}></CardHeader>
                <CardContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend"></FormLabel>
                        <RadioGroup aria-label="options" name="option" value={option} onChange={handleChange}>
                            <FormControlLabel value='optionOne' control={<Radio />} label={questions[path.questionID].optionOne.text} />
                            <FormControlLabel value='optionTwo' control={<Radio />} label={questions[path.questionID].optionTwo.text} />
                        </RadioGroup>
                    </FormControl>

                </CardContent>
                <CardActions>
                    <Button type='submit' variant='outlined' onClick={handleSubmit} style={{ width: '90%', marginRight: '9%', marginLeft: '9%', marginBottom: '4%' }}>Submit</Button>
                </CardActions>
            </Card>
        }
    </div>
}