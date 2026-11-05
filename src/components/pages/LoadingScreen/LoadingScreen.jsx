import './LoadingScreen.scss'

export default function LoadingScreen() {
    return (
        <div className='loading-page' role='status' aria-label='Loading'>
            <span className='loading-page__dot' />
            <span className='loading-page__dot' />
            <span className='loading-page__dot' />
        </div>
    )
}
