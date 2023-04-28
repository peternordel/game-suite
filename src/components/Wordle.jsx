import React, { useState, useEffect, useContext } from 'react'
import WordleLetterBox from './WordleLetterBox'
import { v4 as uuidv4 } from 'uuid'
import JSConfetti from 'js-confetti'
import PreferenceContext from '../context/PreferenceContext'
import ScoreContext from '../context/ScoreContext'

export default function Wordle ({}) {

    const { preferences } = useContext(PreferenceContext)
    const { handleNewScore } = useContext(ScoreContext)

    const jsConfetti = new JSConfetti();

    const [currentGuess, setCurrentGuess] = useState('')
    const [word, setWord] = useState('')
    const [guesses, setGuesses] = useState([])
    const [gameInProgress, setGameInProgress] = useState(true)
    const [newGame, setNewGame] = useState(true)
    const [scoreName, setScoreName] = useState('')

    const scoreObj = {
        game: "wordle",
        name: scoreName,
        score: guesses.length
    }
    let boxObjs = []
    let numCorrect = 0
    let displayElements = []

    function handleScoreName (e) {
        setScoreName(e.target.value)
    }

    useEffect(() => {
        fetch('https://random-word-api.herokuapp.com/word?length=5')
        .then(res => res.json())
        .then(data => {
            setWord(data[0])
            setCurrentGuess('')
            setGuesses([])
            setGameInProgress(true)
            console.log(data[0])
        })
    }, [newGame])

    function focusForm() {
        if(gameInProgress) {
            document.getElementById('wordle-input').focus()
        }
    }

    function handleKeyDown(e) {
        if (!((e.which >= 65 && e.which <= 90) || e.which === 8 || e.which === 13)) {
            e.preventDefault()
        }
    }

    function handleChange(e) {
        setCurrentGuess(e.target.value.toLowerCase())
    }

    function handleSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
        setGuesses(prevGuesses => [...prevGuesses, currentGuess])
        setCurrentGuess('')
    }

    function handleWin() {
        console.log(`Congratulations, you won in ${guesses.length} guesses!`)
        jsConfetti.addConfetti({
            emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
        }).then(() => jsConfetti.addConfetti({
            emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
        }))
        setGameInProgress(false)
    }

    function handleLose() {
        console.log(`You've reached the limit of your guesses. The correct word is ${word}`)
        setGameInProgress(false)
    }

    function resetGame(e) {
        e.stopPropagation()
        setNewGame(prevNewGame => !prevNewGame)
    }

    // create boxes for previous guesses (this is where all of the game logic happens)
    for (const guess of guesses) {
        let matchedIndexes = {}
        numCorrect = 0
        for (const guessIndex in guess) {
            const guessLetter = guess[guessIndex]
            let className = ''
            for (const wordIndex in word) {
                const wordLetter = word[wordIndex]
                if (guessLetter === wordLetter) {

                    // check for correct letter and correct place
                    if (guessIndex === wordIndex) {
                        matchedIndexes[wordIndex] = true
                        numCorrect++;
                        className = 'correct'
                        break
                    
                    // if there are duplicate letters in a guess, this prevents the first letter from matching if the second is an exact match.
                    } else if (guess[wordIndex] === wordLetter) {
                        continue
                    
                    // check for correct letter in the wrong place
                    } else if (!(wordIndex in matchedIndexes)) {
                        matchedIndexes[wordIndex] = true
                        className = 'wrong-place'
                        break
                    }
                }
                className = 'not-in-word'
            }
            boxObjs = [...boxObjs, {letter: guessLetter, className: className}]
        }


    }

    // create boxes for the current guess
    for (const letter of currentGuess) {
        boxObjs = [...boxObjs, {letter: letter, className: 'current'}]
    }

    // create boxes for all boxes in the future
    const numFutureBoxes = 30 - boxObjs.length
    for ( let i = 0 ; i < numFutureBoxes ; i++ ) {
        boxObjs = [ ...boxObjs, {letter: ' ', className: 'future'}]
    }

    const boxElements = boxObjs.map(box => <WordleLetterBox key={uuidv4()} box={box} />)

    // wrap each 5 elements in a div.guess-section, maximum 6 guesses
    for ( let i = 0 ; i < 6 ; i++ ) {
        let tempBoxes = []
        for ( let j = i * 5 ; j < i * 5 + 5 ; j++ ) {
            tempBoxes = [ ...tempBoxes, boxElements[j] ]
        }
        displayElements = [
            ...displayElements, 
            <div key = {uuidv4()} className = 'guess-section'>{tempBoxes}</div>
        ]
    }

    // check for win or lose
    if (!gameInProgress) {
    } else if(numCorrect === 5) {
        handleWin()
    } else if(guesses.length === 6) {
        handleLose()
    }

    return (
        <div className='outlet--item' onClick={focusForm}>
            {!gameInProgress && (
                <form onSubmit={(e) => handleNewScore(e, scoreObj)}>
                    <input
                        required
                        type="text"
                        placeholder="name"
                        onChange={handleScoreName}
                        name="scoreName"
                        value={scoreName}
                    />
                    <button className={preferences.isDarkMode ? 'dark' : ''}>Add Score!</button>
                </form>
            )}
            <h1 className={preferences.isDarkMode ? 'dark' : ''}>Wordle</h1>
            {displayElements}
            {gameInProgress && (
                <form onSubmit={handleSubmit}>
                    <input
                        onKeyDown={handleKeyDown}
                        id='wordle-input'
                        type="text"
                        name="currentGuess"
                        onChange={handleChange}
                        value={currentGuess}
                        maxLength={5}
                        minLength={5}
                        autoFocus
                        required
                    />
                    <button>Submit Guess</button>
                </form>
            )}
            <button className={preferences.isDarkMode ? 'dark' : ''} onClick={resetGame}>{gameInProgress ? 'Reset ' : 'New '} Game</button>
        </div>
    )
}
