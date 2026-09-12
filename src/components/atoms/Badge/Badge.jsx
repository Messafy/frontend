import './Badge.scss'

export default function Badge({ text, children, className = '', ...props }) {
    return (
        <span className={`badge ${className}`.trim()} {...props}>
            {children ?? text}
        </span>
    )
}