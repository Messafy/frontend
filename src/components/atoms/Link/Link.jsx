import { motion } from 'motion/react'
import PropTypes from 'prop-types'
import './Link.scss'

export default function Link({ children, href, rel, target, ...props}) {
    const safeRel = target === '_blank' ? rel ?? 'noreferrer' : rel

    return (
        <motion.a
            className='link'
            href={href}
            rel={safeRel}
            target={target}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ transformOrigin: 'center', display: 'inline-block' }}
            {...props}
        >
            {children}
        </motion.a>
    )
}

Link.propTypes = {
    children: PropTypes.node,
    href: PropTypes.string.isRequired,
    rel: PropTypes.string,
    target: PropTypes.string,
}
