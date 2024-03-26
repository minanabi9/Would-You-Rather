import { Button, Card, CardContent, CardHeader, TextField } from "@material-ui/core"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { handleSaveQuestion } from "../Actions/question"

export const NewQuestion = () => {
    const author = useSelector(state => state.authedUser)
    const [optionOneText, setoptionOneText] = useState('')
    const [optionTwoText, setOptionTwoText] = useState('')
    const dispatch = useDispatch()
    const [showHome,setShowHome]=useState(false)
    if(showHome){
        return <Redirect to='/home'></Redirect>
    }
    const handleSubmit = () => {
        if (optionOneText !== '' && optionTwoText !== '') {
            dispatch(handleSaveQuestion({ optionOneText, optionTwoText, author }))
            setShowHome(true)
        }
    }
    return (
        <div className='home'>
            <Card style={{ width: '50%', }}>
                <CardHeader title='Create New Question'></CardHeader>
                <CardContent>
                    <p style={{ fontSize: 'large', textAlign: 'left' }}>Complete the question</p>
                    <p style={{ fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Would you rather..</p>
                    <form>
                        <TextField label='Option One Text' variant="outlined" placeholder='Enter Option One Text Here' fullWidth onChange={(e) => setoptionOneText(e.target.value)}></TextField>
                        <p style={{ fontSize: 'large', fontWeight: 'bold', textAlign: 'center' }}>OR</p>
                        <TextField label='Option Two Text' variant="outlined" placeholder='Enter Option Two Text Here' fullWidth onChange={(e) => setOptionTwoText(e.target.value)}></TextField>
                        <Button variant='contained' fullWidth color='primary' style={{ height: '50px', marginTop: '30px' }} onClick={handleSubmit}>Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}