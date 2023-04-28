import React, { useContext } from 'react'
import PreferenceContext from '../context/PreferenceContext'

export default function Card ({ cardData, handleClick }) {
    const { image, isSelected, isMatched } = cardData

    const { preferences } = useContext(PreferenceContext)

    return (
        <div className={preferences.isDarkMode ? (isMatched ? 'matched dark' : 'card dark'): (isMatched ? 'matched' : 'card')} >
            <img src={ isSelected ? image : preferences.image } onClick={ handleClick }/>
        </div>
    )
}
