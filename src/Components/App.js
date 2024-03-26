import '../App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { NavBar } from './NavBar';
import { LogIn } from './Log';
import { Home } from './Home';
import { NewQuestion } from './NewQuestion';
import { LeaderBoard } from './LeaderBoard';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { handleInitialData } from '../Actions/shared'
import { Poll } from './Poll';
import { E404 } from './E404';

const ProtectedRoute = ({ component: Component, authedUser, ...rest }) =>
  <Route
    {...rest}
    render={
      (props) =>
        authedUser !== null ?
          <Component {...props} />
          :
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />}
  />

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => { dispatch(handleInitialData()) }, [dispatch])
  const authedUser = useSelector(state => state.authedUser)
  return (
    <div className="App">
      <Router>
        <div>
          {authedUser !== null && <NavBar />}
          <Switch>
            <Route path='/login' exact component={LogIn} />
            <ProtectedRoute path='/home' exact authedUser={authedUser} component={Home} />
            <ProtectedRoute path='/add' exact authedUser={authedUser} component={NewQuestion} />
            <ProtectedRoute path='/leaderboard' authedUser={authedUser} component={LeaderBoard} />
            <ProtectedRoute path='/questions/:questionID' authedUser={authedUser} component={Poll} />
            <Route path='/E404' component={E404}/>
          </Switch>
        </div>
        {/* <Switch>
          <Route exact path='/home'><Home /></Route>
          <Route exact path='/add'><NewQuestion /></Route>
          <Route exact path='/leaderboard'><LeaderBoard /></Route>
          <Route exact path='/login'><LogIn /></Route>
          <Route path='/questions/:questionID'><Poll /></Route>
        </Switch> */}
        {/* {authedUser === null ? <Redirect to='/login'></Redirect> :
          <div> */}
        {/* <Redirect to='/home'></Redirect> */}
        {/* <NavBar /> */}
        {/* </div>} */}
      </Router>

    </div>
  );
}

export default App;
