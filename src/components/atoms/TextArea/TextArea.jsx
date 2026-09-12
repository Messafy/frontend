import './TextArea.scss'

export default function TextArea ({ className = '', rows = 5, ...props }) {
    return (
        <textarea
            className={`textarea ${className}`.trim()}
            autoCapitalize='sentences'
            autoComplete='off'
            spellCheck={true}
            rows={rows}
            {...props}
        />
    )
}
