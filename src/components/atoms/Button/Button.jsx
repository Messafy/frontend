import { motion } from 'motion/react'
import PropTypes from 'prop-types'
import './Button.scss'

export default function Button ({ children, ...props }) {
    return (
        <motion.button
            className='button'
            type='button'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            {...props}
        >
            {children}
        </motion.button>
    )
}

Button.propTypes = {
    children: PropTypes.node,
}
