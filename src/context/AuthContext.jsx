import { useState } from 'react'

import {
    getSession,
    removeSession,
    saveSession,
} from './authSession.js'
import { AuthContext } from './authContext.js'

export default function AuthProvider({ children }) {
    const [session, setSession] = useState(() => getSession())

    function login(newSession) {
        saveSession(newSession)
        setSession(newSession)
    }

    function logout() {
        removeSession()
        setSession(null)
    }

    const value = {
        session,
        login,
        logout,
        isAuthenticated: Boolean(session?.token),
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
