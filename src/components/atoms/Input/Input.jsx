import './Input.scss'

export default function Input ({ children, ...props }) {
    return (
        <label className='input'>
            {children}
            <input
                className='input__control'
                type='text'
                autoCapitalize='sentences'
                autoComplete='off'
                spellCheck={false}
                {...props}
            />
        </label>
    )
}
