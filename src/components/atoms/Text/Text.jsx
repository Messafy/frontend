import PropTypes from 'prop-types'

import './Text.scss'
const TEXT_ELEMENTS = [
  'a',
  'b',
  'blockquote',
  'code',
  'div',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'i',
  'label',
  'li',
  'mark',
  'p',
  'pre',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'time',
  'u',
]

const COLOR_TOKENS = [
  'primary',
  'secondary',
  'muted',
  'rain',
  'rain-soft',
  'rain-deep',
  'danger',
  'warning',
  'success',
  'inherit',
]

const SIZE_TOKENS = [
  'small',
  'body',
  'link',
  'badge',
  'h3',
  'h2',
  'h1',
]

const WEIGHT_TOKENS = [
  'regular',
  'medium',
  'semibold',
  'bold',
]

const ALIGN_TOKENS = ['start', 'center', 'end', 'justify']

const TRANSFORM_TOKENS = ['none', 'uppercase', 'lowercase', 'capitalize']

const TRUNCATE_TOKENS = ['none', 'single', 'multi']

function buildClassName({
  align,
  block,
  className,
  color,
  italic,
  muted,
  size,
  strikethrough,
  transform,
  truncate,
  underline,
  weight,
}) {
  const classes = ['text']

  if (color) classes.push(`text--color-${color}`)
  if (size) classes.push(`text--size-${size}`)
  if (weight) classes.push(`text--weight-${weight}`)
  if (align) classes.push(`text--align-${align}`)
  if (transform && transform !== 'none') {
    classes.push(`text--transform-${transform}`)
  }
  if (truncate && truncate !== 'none') {
    classes.push(`text--truncate-${truncate}`)
  }
  if (italic) classes.push('text--italic')
  if (underline) classes.push('text--underline')
  if (strikethrough) classes.push('text--strikethrough')
  if (muted) classes.push('text--muted')
  if (block) classes.push('text--block')
  if (className) classes.push(className)

  return classes.join(' ')
}

export default function Text({
  align,
  as,
  block = false,
  children,
  className,
  color = 'inherit',
  italic = false,
  muted = false,
  size = 'body',
  strikethrough = false,
  transform = 'none',
  truncate = 'none',
  underline = false,
  weight,
  ...rest
}) {
  // Fallback to `p` if the caller passed an unknown tag.
  const Element = TEXT_ELEMENTS.includes(as) ? as : 'p'

  return (
    <Element
      className={buildClassName({
        align,
        block,
        className,
        color,
        italic,
        muted,
        size,
        strikethrough,
        transform,
        truncate,
        underline,
        weight,
      })}
      {...rest}
    >
      {children}
    </Element>
  )
}

Text.propTypes = {
  align: PropTypes.oneOf(ALIGN_TOKENS),
  as: PropTypes.oneOf(TEXT_ELEMENTS),
  block: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(COLOR_TOKENS),
  italic: PropTypes.bool,
  muted: PropTypes.bool,
  size: PropTypes.oneOf(SIZE_TOKENS),
  strikethrough: PropTypes.bool,
  transform: PropTypes.oneOf(TRANSFORM_TOKENS),
  truncate: PropTypes.oneOf(TRUNCATE_TOKENS),
  underline: PropTypes.bool,
  weight: PropTypes.oneOf(WEIGHT_TOKENS),
}
