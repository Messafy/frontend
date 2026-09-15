import './HeroSection.scss'
import Badge from '../../atoms/Badge/Badge.jsx'
import Link from '../../atoms/Link/Link.jsx'
import Text from '../../atoms/Text/Text.jsx'
import Title from '../../atoms/Title/Title.jsx'

export default function HeroSection() {
    return (
        <section className='hero-section'>
            <div className='hero-section__content'>
                <Badge text='Write without friction' />
                <Title text='Your thoughts, without the noise.' />
                <Text className='hero-section__description' color='secondary' align='start'>
                    Messafy is a private space for notes that stays out of your way.
                    Capture ideas, organize what matters, and pick up exactly where you left off.
                </Text>

                <div className='hero-section__actions'>
                    <Link href='/login' className='hero-section__action hero-section__action--primary'>
                        Try for free
                    </Link>
                    <Link href='#features' className='hero-section__action hero-section__action--secondary'>
                        See how it works
                    </Link>
                </div>
            </div>
        </section>
    )
}
