import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import PreferenceContext from '../context/PreferenceContext'

export default function Root ({}) {

    const { preferences } = useContext(PreferenceContext)

    return (
        <div>
            <nav className={preferences.isDarkMode ? 'game-navbar dark' : 'game-navbar'}>
                <NavLink
                    className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" }
                    style={{marginRight: 'auto'}}
                    to='/'
                >
                    <img style={preferences.isDarkMode ? {filter: 'invert(1)'} : {}} className='logo' src='https://cdn-icons-png.flaticon.com/512/1014/1014393.png' alt='coffee'/>
                </NavLink>
                <NavLink
                    className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" }
                    to='concentration'>Concentration</NavLink>
                <NavLink
                    className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } 
                    to='/wordle'>Wordle</NavLink>
                {/*<NavLink
                    className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } 
                    to='/minesweeper'>Minesweeper</NavLink>
                <NavLink
                    className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } 
                    to='/snake'>Snake</NavLink>
                <NavLink
                    className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } 
                    to='/typeracer'>Typeracer</NavLink>
                <NavLink
                    className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } 
                    to='/pong'>Pong</NavLink>
                <NavLink
                    className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } 
                    to='/cribbage'>Cribbage</NavLink>
                <NavLink
                    className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } 
                    to='/hearts'>Hearts</NavLink>
                <NavLink
                    className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } 
                    to='/solitaire'>Solitaire</NavLink> */}
            </nav>
            <div className={preferences.isDarkMode ? 'body dark' : 'body'}>
                <div className={preferences.isDarkMode ? 'options-sidebar--dark' : 'options-sidebar'}>
                    <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } to='profile'>Profile</NavLink>
                    <br />
                    <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } to='scores'>Scores</NavLink>
                </div>
                <div className={preferences.isDarkMode ? 'outlet--dark' : 'outlet'}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
