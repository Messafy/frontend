import './Input.scss'

export default function Input ({children, ...props}) {
    return (
        <label className='input'>
            {children}
            <input className='input__control' type="text" {...props} />
        </label>
    )
}
