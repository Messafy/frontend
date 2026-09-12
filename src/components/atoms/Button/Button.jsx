import { motion } from 'motion/react'
import './Button.scss'

export default function Button ({children, className = '', variant = 'primary', ...props}) {
    const buttonClass = `button ${variant !== 'primary' ? `button--${variant}` : ''} ${className}`.trim()

    return (
        <motion.button
            className={buttonClass}
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
