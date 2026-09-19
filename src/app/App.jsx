import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from 'react-router-dom'

import HomePage from '../components/pages/HomePage/HomePage.jsx'
import LoginPage from '../components/pages/LoginPage/LoginPage.jsx'
import NotePage from '../components/pages/NotePage/NotePage.jsx'
import RegisterPage from '../components/pages/RegisterPage/RegisterPage.jsx'

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

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        loader: requireGuest,
        element: <LoginPage />,
    },
    {
        path: '/register',
        loader: requireGuest,
        element: <RegisterPage />,
    },
    {
        path: '/notes',
        loader: requireAuth,
        element: <NotePage />,
    },
])

export default function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}