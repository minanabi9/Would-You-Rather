import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { setAuthedUser } from "../Actions/authedUser"
import React from 'react'

export const NavBar = () => {
    const authedUser = useSelector(state => state.authedUser)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    return (
        <nav>
            <ul>
                <li><NavLink exact to='/home'>Home</NavLink></li>
                <li><NavLink exact to='/add'>NewQuestion</NavLink></li>
                <li><NavLink exact to='/leaderboard'>LeaderBoard</NavLink></li>
                <li className='profile'><div className='avatar' style={{ backgroundImage: `url(${users[authedUser].avatarURL})`,backgroundRepeat:"no-repeat",backgroundSize:'20%',height:'50px',width:'200px' ,marginLeft:'200px'}}>{users[authedUser].name}</div></li>
                <li><NavLink exact to='/login'><div onClick={() => dispatch(setAuthedUser(null))}>LOGOUT</div></NavLink></li>
            </ul>
        </nav>
    )
}