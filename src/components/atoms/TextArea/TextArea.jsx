import './TextArea.scss'

export default function TextArea ({ ...props }) {
    return (
        <textarea
            className='textarea'
            autoCapitalize='sentences'
            autoComplete='off'
            spellCheck={true}
            rows={5}
            {...props}
        />
    )
}
