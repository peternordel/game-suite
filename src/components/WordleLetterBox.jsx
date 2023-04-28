import React, { useContext } from 'react'
import PreferenceContext from '../context/PreferenceContext'

export default function WordleLetterBox({ box }) {
    const { letter, className } = box
    const { preferences } = useContext(PreferenceContext)

    return (
        <div className={preferences.isDarkMode ? className + ' dark' : className}>
            {letter}
        </div>
    )
}
