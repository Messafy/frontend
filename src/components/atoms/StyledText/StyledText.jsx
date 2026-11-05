import PropTypes from 'prop-types'

import './StyledText.scss'

const TEXT_ELEMENTS = ['div', 'h1', 'h2', 'h3', 'label', 'li', 'p', 'span', 'strong', 'time']
const COLOR_TOKENS = ['secondary', 'muted', 'danger', 'inherit']
const SIZE_TOKENS = ['small', 'body', 'display', 'h2', 'h1']
const WEIGHT_TOKENS = ['regular', 'medium', 'semibold']
const ALIGN_TOKENS = ['start', 'center', 'end']

export default function StyledText({
    align,
    as,
    children,
    className,
    color = 'inherit',
    size = 'body',
    weight,
    ...rest
}) {
    const Element = TEXT_ELEMENTS.includes(as) ? as : 'p'
    const classes = [
        'text',
        `text--color-${color}`,
        `text--size-${size}`,
        weight && `text--weight-${weight}`,
        align && `text--align-${align}`,
        className,
    ].filter(Boolean).join(' ')

    return (
        <Element className={classes} {...rest}>
            {children}
        </Element>
    )
}

StyledText.propTypes = {
    align: PropTypes.oneOf(ALIGN_TOKENS),
    as: PropTypes.oneOf(TEXT_ELEMENTS),
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.oneOf(COLOR_TOKENS),
    size: PropTypes.oneOf(SIZE_TOKENS),
    weight: PropTypes.oneOf(WEIGHT_TOKENS),
}
