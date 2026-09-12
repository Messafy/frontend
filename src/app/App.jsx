import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from 'react-router-dom'

import HomePage from '../components/pages/HomePage/HomePage.jsx'
import LoginPage from '../components/pages/LoginPage/LoginPage.jsx'
import NotePage from '../components/pages/NotePage/NotePage.jsx'

function requireAuth() {
    const token = localStorage.getItem('token')

    if (!token) {
        throw redirect('/login')
    }

    return null
}

function requireGuest() {
    const token = localStorage.getItem('token')

    if (token) {
        throw redirect('/notes')
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
        path: '/notes',
        loader: requireAuth,
        element: <NotePage />,
    },
])

export default function App() {
    return <RouterProvider router={router} />
}