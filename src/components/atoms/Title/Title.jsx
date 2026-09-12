import './Title.scss';

export default function Title({
  children,
  text,
  as: Component = 'h1',
  variant = 'default',
  size = 'hero',
  className = '',
  id,
  ...props
}) {
  const content = text ?? children ?? 'Not every message needs a name.';
  const contentString = typeof content === 'string' ? content : undefined;

  const classes = [
    'title',
    size && size !== 'hero' ? `title--${size}` : '',
    variant && variant !== 'default' ? `title--${variant}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      className={classes}
      data-text={contentString}
      id={id}
      {...props}
    >
      {content}
    </Component>
  );
}
