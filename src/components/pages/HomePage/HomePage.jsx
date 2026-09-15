import './HomePage.scss'
import Rain from '../../molecules/Rain/Rain.jsx'
import HomeHeader from '../../organisms/HomeHeader/HomeHeader.jsx'
import HeroSection from '../../organisms/HeroSection/HeroSection.jsx'
import NotesAppPreview from "../../organisms/NotesAppPreview/NotesAppPreview.jsx";

export default function HomePage () {
    return (
        <div className='home-page'>
            <Rain />
            <HomeHeader />
            <main className='home-page__main' id='main-content'>
                <div className="home-page__main__title">
                    <HeroSection />
                    <NotesAppPreview />
                </div>
            </main>
        </div>
    )
}
