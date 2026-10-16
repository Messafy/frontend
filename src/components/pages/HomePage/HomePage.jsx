import { lazy, Suspense } from 'react'
import './HomePage.scss'
import HomeHeader from '../../organisms/HomeHeader/HomeHeader.jsx'
import HeroSection from '../../organisms/HeroSection/HeroSection.jsx'

const Rain = lazy(() => import('../../molecules/Rain/Rain.jsx'))
const NotesAppPreview = lazy(() => import('../../organisms/NotesAppPreview/NotesAppPreview.jsx'))

export default function HomePage () {
    return (
        <div className='home-page'>
            <Suspense fallback={null}>
                <Rain />
            </Suspense>
            <HomeHeader />
            <main className='home-page__main' id='main-content'>
                <div className="home-page__main__title">
                    <HeroSection />
                    <Suspense fallback={null}>
                        <NotesAppPreview />
                    </Suspense>
                </div>
            </main>
        </div>
    )
}
