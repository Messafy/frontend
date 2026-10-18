import './TagList.scss'
import PropTypes from 'prop-types'
import { Children } from 'react'
import RemovableTag from '../../atoms/RemovableTag/RemovableTag.jsx'

export default function TagList ({
                                            children, maxLength = 5 }) {
    const tags = Children.toArray(children)
    const hiddenCount = tags.length - maxLength

    return (
        <div className='collection-tags'>
            {tags.slice(0, maxLength)}
            {hiddenCount > 0 && <RemovableTag>+{
                hiddenCount} more</RemovableTag>}
        </div>
    )
}

TagList.propTypes = {
    children: PropTypes.node,
    maxLength: PropTypes.number,
}