import { lazy, Suspense } from 'react'

import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from 'react-router-dom'

import LoadingScreen from '../components/pages/LoadingScreen/LoadingScreen.jsx'

const LoginScreen = lazy(
    () => import('../components/pages/LoginScreen/LoginScreen.jsx')
)

const RegistrationScreen = lazy(
    () => import('../components/pages/RegistrationScreen/RegistrationScreen.jsx')
)

const NotesWorkspacePage = lazy(
    () => import('../components/pages/NotesWorkspacePage/NotesWorkspacePage.jsx')
)

import AuthProvider from '../context/AuthContext.jsx'
import { getSession } from '../context/authSession.js'

function requireAuth() {
    const session = getSession()

    if (!session?.token) {
        return redirect('/login')
    }

    return null
}

function requireGuest() {
    const session = getSession()

    if (session?.token) {
        return redirect('/notes')
    }

    return null
}

function redirectHome() {
    return redirect(getSession()?.token ? '/notes' : '/login')
}

const router = createBrowserRouter([
    {
        path: '/',
        loader: redirectHome,
    },
    {
        path: '/login',
        loader: requireGuest,
        element: (
            <Suspense fallback={<LoadingScreen />}>
                <LoginScreen />
            </Suspense>
        ),
    },
    {
        path: '/register',
        loader: requireGuest,
        element: (
            <Suspense fallback={<LoadingScreen />}>
                <RegistrationScreen />
            </Suspense>
        ),
    },
    {
        path: '/notes',
        loader: requireAuth,
        element: (
            <Suspense fallback={<LoadingScreen />}>
                <NotesWorkspacePage />
            </Suspense>
        ),
    },
])

export default function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}
