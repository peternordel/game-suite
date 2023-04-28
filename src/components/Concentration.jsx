import React, { useState, useEffect, useContext } from 'react'
import ConcentrationCard from './ConcentrationCard'
import PreferenceContext from '../context/PreferenceContext'

export default function Concentration () {

    const [deckData, setDeckData] = useState([])
    const [checkMatch, setCheckMatch] = useState([])
    const [isTimingOut, setIsTimingOut] = useState(false)
    const [gameStats, setGameStats] = useState({numberMatched: 0, numberGuesses: 0})
    const [newGame, setNewGame] = useState(true)

    const { preferences } = useContext(PreferenceContext)

    useEffect(() => {
        fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/`)
        .then(res => res.json())
        .then(deck => {
            fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=52`)
            .then(res => res.json())
            .then(deckFetch => {
                setDeckData(deckFetch.cards)
                setDeckData(prevDeckData => prevDeckData.map(card => ({...card, isSelected: false, isMatched: false})))
                setCheckMatch([])
                setIsTimingOut(false)
                setGameStats({numberMatched: 0, numberGuesses: 0})
            })
        })
    }, [newGame])

    function resetGame() {
        setNewGame(prevNewGame => !prevNewGame)
    }

    // game logic
    function handleClick(index) {
        const prevIndex = checkMatch[0]

        if (isTimingOut) {
            console.log('Less clicking, more memorizing!')
            return
        }

        if (index === prevIndex) {
            console.log('You clicked the same card...')
            return
        }

        setDeckData(prevDeckData => {
            prevDeckData[index].isSelected = true
            return [...prevDeckData]
        })
        
        // add one to handle index 0
        if (!(prevIndex + 1)) {
            setCheckMatch([index])
        }
        else {
            setIsTimingOut(true)
            setTimeout(() => {
                setGameStats(prevGameStats => {
                    prevGameStats.numberGuesses++
                    return {...prevGameStats}
                })
                if (deckData[prevIndex].value === deckData[index].value) {
                    console.log('Match!')
                    setGameStats(prevGameStats => {
                        prevGameStats.numberMatched++
                        return {...prevGameStats}
                    })
                    setDeckData(prevDeckData => {
                        prevDeckData[prevIndex].isMatched = true
                        prevDeckData[index].isMatched = true
                        return [...prevDeckData]
                    })
                }
                else {
                    console.log('Not a match!')
                    setDeckData(prevDeckData => {
                        prevDeckData[prevIndex].isSelected = false
                        prevDeckData[index].isSelected = false
                        return [...prevDeckData]
                    })
                }
                setCheckMatch([])
                setIsTimingOut(false)
            }, 1000)
        }
    }

    const cardElements = deckData.map((cardData, index) => {
        return <ConcentrationCard key={cardData.code} cardData={cardData} handleClick={() => handleClick(index)}/>
    })

    return (
        <div className='outlet--item'>
            <div className={preferences.isDarkMode ? 'concentration-game dark': 'concentration-game'}>   
                {cardElements}
            </div>
            <div>
                <button className={preferences.isDarkMode ? 'dark' : ''} onClick={resetGame}>{gameStats.numberMatched < 26 ? 'Reset ' : 'New '} Game</button>
            </div>
        </div>
    )
}
