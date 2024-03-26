import background from './flat-thinking-concept.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthedUser } from '../Actions/authedUser'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'


export const LogIn = (props) => {
    let history = useHistory()
    let users = useSelector(state => state.users)
    let questions = useSelector(state => state.questions)
    const [authed, setAuthed] = useState('sarahedo')
    const dispatch = useDispatch()
    const handleLogin = (e) => {
        e.preventDefault()
        const { from } = props.location.state || {
            from: { pathname: '/home' }
        }
        dispatch(setAuthedUser(authed))
        if (!Object.keys(questions).includes(from.pathname.slice(11)) && from.pathname.slice(1, 9) === 'question') {
            history.push('/E404')
        } else {
            history.push(from)
        }
    }
    return (
        <div className='box'>
            <div className='welcome-box'>
                <div className='welcome'>
                    Welcome to the Would You Rather App
                </div>
                <div className='press'>
                    Press Sign in to continue
                </div>
            </div>
            <div className='thinking' style={{ backgroundImage: `url(${background})`, width: 186, height: 175 }}></div>
            <h1 className='sign'>Sign in</h1>
            <form>
                <div className='dropbox'>
                    <select onChange={(e) => setAuthed(e.target.value)}>
                        {
                            Object.keys(users).map((name) => <option key={name} value={name}>{users[name].name}</option>)
                        }
                    </select>
                </div>
                <input type='submit' className='login' value='Login' onClick={handleLogin} ></input>
            </form>
        </div>
    )
}