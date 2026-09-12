import './Badge.scss'

export default function Badge ({ text, children }) {
    return (
        <span className='badge'>
            {children ?? text}
        </span>
    )
}
