import './input.scss'

export default function Input ({children, ...props}) {
    return (
        <label className='input-field'>
            {children}
            <input className='input' {...props} />
        </label>
    )
}
