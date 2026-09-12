import './CollectionTags.scss'
import PropTypes from 'prop-types'
import { Children } from 'react'
import Tag from '../../atoms/Tag/Tag.jsx'

export default function CollectionTags ({
                                            children, maxLength = 5 }) {
    const tags = Children.toArray(children)
    const hiddenCount = tags.length - maxLength

    return (
        <div className='collection-tags'>
            {tags.slice(0, maxLength)}
            {hiddenCount > 0 && <Tag>+{
                hiddenCount} more</Tag>}
        </div>
    )
}

CollectionTags.propTypes = {
    children: PropTypes.node,
    maxLength: PropTypes.number,
}