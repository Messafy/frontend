import './Input.scss'

export default function Input ({children, className = '', ...props}) {
    return (
        <label className={`input ${className}`.trim()}>
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
