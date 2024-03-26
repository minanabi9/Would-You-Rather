import { Container, CssBaseline, List, ListItem } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Question } from './Question';


export const QuestionList = (props) => {
    let allQuestions = useSelector(state => state.questions)
    let questions = props.questions
    const users = useSelector(state => state.users)

    return (
        <div className='list'>
            <CssBaseline />
            <Container fixed>
                <List >
                    {questions.map((question) =>
                        <ListItem key={question}>
                            <Question askerID={allQuestions[question].author} askerName={users[allQuestions[question].author].name} questionID={question} />

                        </ListItem>)}
                </List>
            </Container>
        </div>
    )
}