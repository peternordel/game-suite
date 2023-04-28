import React, { createContext, useState, useEffect } from 'react'

const ScoreContext = createContext()

export function ScoreProvider({ children }) {

    const [scores, setScores] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/scores')
        .then(res => res.json())
        .then(data => setScores(data))
    }, [])

    function handleNewScore(e, scoreObj) {
        e.preventDefault()
        fetch('http://localhost:3000/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(scoreObj)
        })
        .then(res => res.json())
        .then(data => setScores(prevScores => [...prevScores, data]))
    }

    return (
        <ScoreContext.Provider value={{ scores, handleNewScore }}>
            {children}
        </ScoreContext.Provider>
    )
}

export default ScoreContext