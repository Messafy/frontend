import PropTypes from 'prop-types'
import './TextInput.scss'

export default function TextInput ({ children, error = null, variant, className, ...props }) {
    const classes = [
        'input',
        className,
        error && 'input--error',
        variant && `input--${variant}`,
    ].filter(Boolean).join(' ')

    return (
        <label className={classes}>
            {children}
            <input
                className='input__control'
                type='text'
                autoCapitalize='sentences'
                spellCheck={false}
                aria-invalid={Boolean(error)}
                {...props}
                autoComplete='off'
            />
        </label>
    )
}

TextInput.propTypes = {
    children: PropTypes.node,
    error: PropTypes.instanceOf(Error),
    variant: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
}
