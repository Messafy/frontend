import PropTypes from 'prop-types';
import './Title.scss';

export default function Title ({ children, text }) {
  const content = text ?? children ?? 'Not every message needs a name.';
  const contentString = typeof content === 'string' ? content : undefined;

  return (
    <h1
      className='title'
      data-text={contentString}
    >
      {content}
    </h1>
  );
}

Title.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
};
