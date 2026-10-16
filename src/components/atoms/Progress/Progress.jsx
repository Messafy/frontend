import './Progress.scss'

export default function Progress({duration = 5000}) {
    return <span className='progress' style={{'--progress-duration': `${duration}ms`}} aria-hidden='true' />
}
