import './HomeHeader.scss';
import { useEffect, useState } from 'react';
import Brand from '../../molecules/Brand/Brand.jsx';
import CollectionLinks from '../../molecules/CollectionLinks/CollectionLinks.jsx';
import Button from '../../atoms/Button/Button.jsx';
import Link from '../../atoms/Link/Link.jsx';

export default function HomeHeader() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`home-header${isScrolled ? ' home-header--scrolled' : ''}`}>
            <Brand />

            <CollectionLinks>
                <Link href='#features'>Features</Link>
                <Link href='#notes'>Notes</Link>
                <Link href='https://github.com/Messafy/frontend' target='_blank'>GitHub</Link>
            </CollectionLinks>

            <Link href='/login' className='home-header__cta'>
                <Button type='button'>Sign in</Button>
            </Link>
        </header>
    )
}
