import PropTypes from 'prop-types'
import './Card.scss'

export default function Card ({ as = 'div', children, ...props }) {
  const Element = as

  return (
    <Element className='card' {...props}>
      {children}
    </Element>
  )
}

Card.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
}
