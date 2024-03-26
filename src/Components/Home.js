import { AppBar, Tab, Tabs } from "@material-ui/core"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { QuestionList } from "./QuestionList"

export const Home = () => {
  const authedUser = useSelector(state => state.authedUser)
  let users = useSelector(state => state.users)
  let allQuestions = useSelector(state => state.questions)
  const [selectedTab, setSelectedTab] = useState(0)
  if (authedUser === null) {
    return <Redirect to='/login'></Redirect>
  }
  let answeredQuestions = Object.keys(users[authedUser].answers).sort((a, b) => allQuestions[b].timestamp - allQuestions[a].timestamp)
  let unansweredQuestions = Object.keys(allQuestions).filter(questionID => !answeredQuestions.includes(questionID)).sort((a, b) => allQuestions[b].timestamp - allQuestions[a].timestamp)
  
  const handleChangeTab = (e, tab) => {
    setSelectedTab(tab)
  }
  return (
    <div>
      <AppBar position='fixed' className='home'>
        <Tabs value={selectedTab} onChange={handleChangeTab} >
          <Tab label='Unanswered Questions' />
          <Tab label='Answered Questions' />
        </Tabs>
      </AppBar>
      {selectedTab === 1 && <QuestionList questions={answeredQuestions} />}
      {selectedTab === 0 && <QuestionList questions={unansweredQuestions} />}
    </div>
  )
}