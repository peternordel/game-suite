import React, { useContext } from 'react'
import PreferenceContext from '../context/PreferenceContext'


export default function Home ({}) {

    const { preferences } = useContext(PreferenceContext)

    return (
        <div className='outlet--item'>
            <h1>Go play some games!</h1>
        </div>
    )
}
