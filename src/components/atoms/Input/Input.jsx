import PropTypes from 'prop-types'
import './Input.scss'

export default function Input ({ children, variant, ...props }) {
    const classes = [
        'input',
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
                {...props}
            />
        </label>
    )
}

Input.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.string,
    placeholder: PropTypes.string,
}
