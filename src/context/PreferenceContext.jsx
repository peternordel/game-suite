import React, { createContext, useState } from 'react'

const PreferenceContext = createContext()

export function PreferenceProvider({ children }) {

    const [preferences, setPreferences] = useState({ image: '/src/assets/card-back-green.jpg', isDarkMode: false })

    return (
        <PreferenceContext.Provider value={{ preferences, setPreferences }}>
            {children}
        </PreferenceContext.Provider>
    )
}

export default PreferenceContext