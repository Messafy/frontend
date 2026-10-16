import { lazy, Suspense } from 'react'

import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from 'react-router-dom'

import HomePage from '../components/pages/HomePage/HomePage.jsx'
import LoadingPage from '../components/pages/LoadingPage/LoadingPage.jsx'

const LoginPage = lazy(
    () => import('../components/pages/LoginPage/LoginPage.jsx')
)

const RegisterPage = lazy(
    () => import('../components/pages/RegisterPage/RegisterPage.jsx')
)

const NotePage = lazy(
    () => import('../components/pages/NotePage/NotePage.jsx')
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

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        loader: requireGuest,
        element: (
            <Suspense fallback={<LoadingPage />}>
                <LoginPage />
            </Suspense>
        ),
    },
    {
        path: '/register',
        loader: requireGuest,
        element: (
            <Suspense fallback={<LoadingPage />}>
                <RegisterPage />
            </Suspense>
        ),
    },
    {
        path: '/notes',
        loader: requireAuth,
        element: (
            <Suspense fallback={<LoadingPage />}>
                <NotePage />
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
