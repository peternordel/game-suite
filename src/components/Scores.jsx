import React, { useContext } from 'react'
import ScoreContext from '../context/ScoreContext'
import { v4 as uuidv4 } from 'uuid'

export default function Scores ({}) {
    const { scores } = useContext(ScoreContext)

    console.log(scores)

    const allScoreElements = scores.map(score => {
        return (
            <tr key={uuidv4()} game={score.game} score={score.score}>
                <td>{score.name}</td>
                <td>{score.score}</td>
            </tr>
        )})

    const wordleScoreElements = allScoreElements.filter(element => element.props.game === 'wordle')

    const test = wordleScoreElements.sort((a, b) => (a.props.score - b.props.score))
    const concentrationScoreElements = allScoreElements.filter(element => element.props.game === 'concentration')

    return (
        <div className='outlet--item'>
            <h1>Scores</h1>
            <br/>
            <br/>
            <h2>Wordle</h2>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                    {wordleScoreElements}
                </tbody>
            </table>
            <br/>
            <br/>
            <h2>Concentration</h2>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                    {concentrationScoreElements}
                </tbody>
            </table>
        </div>
    )
}
