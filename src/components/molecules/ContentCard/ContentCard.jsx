import PropTypes from 'prop-types'
import './ContentCard.scss'

export default function ContentCard ({ as = 'div', children, ...props }) {
  const Element = as

  return (
    <Element className='card' {...props}>
      {children}
    </Element>
  )
}

ContentCard.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
}
