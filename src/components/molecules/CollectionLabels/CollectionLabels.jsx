import './CollectionLabels.scss'
import PropTypes from 'prop-types'
import { Children } from 'react'

export default function CollectionLabels({ children, maxLength = 5 }) {
    const labels = Children.toArray(children)

    return (
        <div className='collection-labels'>
            {labels.slice(0, maxLength)}
        </div>
    )
}

CollectionLabels.propTypes = {
    children: PropTypes.node,
    maxLength: PropTypes.number,
}
