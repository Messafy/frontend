export function getSession() {
    const storedSession = localStorage.getItem('session')

    if (!storedSession) {
        return null
    }

    try {
        return JSON.parse(storedSession)
    } catch {
        localStorage.removeItem('session')
        return null
    }
}

export function saveSession(session) {
    localStorage.setItem('session', JSON.stringify(session))
}

export function removeSession() {
    localStorage.removeItem('session')
}