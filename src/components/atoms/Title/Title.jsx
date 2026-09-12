import PropTypes from 'prop-types';
import './Title.scss';
import Text from '../Text/Text.jsx';

export default function Title ({ children, text }) {
  const content = text ?? children ?? 'Not every message needs a name.';
  const contentString = typeof content === 'string' ? content : undefined;

  return (
    <Text
      as='h1'
      className='title'
      data-text={contentString}
    >
      {content}
    </Text>
  );
}

Title.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
};
