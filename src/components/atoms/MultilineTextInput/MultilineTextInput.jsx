import PropTypes from 'prop-types'
import './MultilineTextInput.scss'

export default function MultilineTextInput ({ ...props }) {
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

MultilineTextInput.propTypes = {
    placeholder: PropTypes.string,
}
