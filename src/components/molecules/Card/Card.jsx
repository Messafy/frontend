import './Card.scss'

export default function Card({
  children,
  variant = 'default',
  interactive = false,
  className = '',
  ...props
}) {
  const variantClass = variant !== 'default' ? `card--${variant}` : ''
  const interactiveClass = interactive ? 'card--interactive' : ''
  const classes = ['card', variantClass, interactiveClass, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}