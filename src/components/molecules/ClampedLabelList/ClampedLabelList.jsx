import './ClampedLabelList.scss'
import PropTypes from 'prop-types'
import { Children } from 'react'

export default function ClampedLabelList({ children, maxLength = 5 }) {
    const labels = Children.toArray(children)

    return (
        <div className='collection-labels'>
            {labels.slice(0, maxLength)}
        </div>
    )
}

ClampedLabelList.propTypes = {
    children: PropTypes.node,
    maxLength: PropTypes.number,
}
