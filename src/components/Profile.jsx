import React, { useState, useEffect, useContext } from 'react'
import cardBackBlue from '../assets/card-back-blue.jpg'
import cardBackGreen from '../assets/card-back-green.jpg'
import cardBackPsych from '../assets/card-back-psych.jpg'
import cardBackRed from '../assets/card-back-red.jpg'
import { v4 as uuidv4 } from 'uuid'
import PreferenceContext from '../context/PreferenceContext'

export default function Profile ({}) {
    
    const [newProfileName, setNewProfileName] = useState('')
    const [profiles, setProfiles] = useState([])
    const [selectProfileName, setSelectProfileName] = useState('')

    useEffect( () => {
        fetch('http://localhost:3000/profiles')
        .then(res => res.json())
        .then(data => setProfiles(data))
    }, [])

    console.log(profiles)
    function handleEnterNewProfileName(e) {
        setNewProfileName(e.target.value)
    }

    function handleNewProfile(e) {
        e.preventDefault()

        const newProfile = {
            "name": newProfileName,
            "image": preferences.image,
            "isDarkMode": preferences.isDarkMode
        }

        console.log(newProfile)

        fetch(`http://localhost:3000/profiles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newProfile)
        })
        .then(res => res.json())
        .then(data => setProfiles(prevProfiles => [...prevProfiles, data]))
    }
    
    function handleProfileSelect(e) {
        setSelectProfileName(e.target.value)
        for (const profile of profiles) {
            if(profile.name === e.target.value) {
                setPreferences({image: profile.image, isDarkMode: profile.isDarkMode})
                break
            }
        }
    }

    const { preferences, setPreferences } = useContext(PreferenceContext)
    
    const imageOptions = [cardBackBlue, cardBackGreen, cardBackPsych, cardBackRed]

    const imageElements = imageOptions.map(image => {
        const className = image === preferences.image ? 'selected' : 'card'
        return (
            <img
                key={uuidv4()}
                className={className}
                src={image}
                onClick={() => handleCardBackImageClick(image)} 
            />
        )
    })

    function handleCardBackImageClick (image) {
        setPreferences(prevPreferences => ({...prevPreferences, image: image}))
    }

    function handleDarkModeToggle() {
        setPreferences(prevPreferences => {
            prevPreferences.isDarkMode = !prevPreferences.isDarkMode
            return {...prevPreferences}
        })
    }

    return (
        <div className='outlet--item'>
            <h1 className={preferences.isDarkMode ? 'dark' : ''}>Profile</h1>
            <div className={preferences.isDarkMode ? 'dark' : ''}>
                <form>
                    <select 
                        id="selectProfileName"
                        value={selectProfileName}
                        onChange={handleProfileSelect}
                        name="selectProfileName"
                    >
                        <option className={preferences.isDarkMode ? 'dark' : ''} value="">--- CHOOSE ---</option>
                        {profiles.map(profile => <option key={uuidv4()} className={preferences.isDarkMode ? 'dark' : ''} value={profile.name}>{profile.name}</option>)}
                    </select>
                </form>
            </div>
            <br />
            <div className={preferences.isDarkMode ? 'dark' : ''}>
                <form onSubmit={handleNewProfile}>
                    <input
                        required
                        type="text"
                        placeholder="profile name"
                        onChange={handleEnterNewProfileName}
                        name="newProfileName"
                        value={newProfileName}
                    />
                    <button className={preferences.isDarkMode ? 'dark' : ''}>Create New Profile</button>
                </form>
            </div>
            <br/>
            <div 
                className="toggler" 
            >
                <p className="toggler--light">Light</p>
                <div 
                    className="toggler--slider"
                    onClick={handleDarkModeToggle}
                >
                    <div className="toggler--slider--circle"></div>
                </div>
                <p className="toggler--dark">Dark</p>
            </div>
            <br/>
            <h3>Card back options: </h3>
            <div className={preferences.isDarkMode ? 'image-options dark' : 'image-options'}>
                {imageElements}
            </div>
        </div>
    )
}