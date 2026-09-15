import PropTypes from 'prop-types'
import './Input.scss'

export default function Input ({ children, error = null, variant, ...props }) {
    const classes = [
        'input',
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
                autoComplete='off'
                spellCheck={false}
                aria-invalid={Boolean(error)}
                {...props}
            />
        </label>
    )
}

Input.propTypes = {
    children: PropTypes.node,
    error: PropTypes.instanceOf(Error),
    variant: PropTypes.string,
    placeholder: PropTypes.string,
}
