import './TimedProgressBar.scss'

export default function TimedProgressBar({duration = 5000}) {
    return <span className='progress' style={{'--progress-duration': `${duration}ms`}} aria-hidden='true' />
}
