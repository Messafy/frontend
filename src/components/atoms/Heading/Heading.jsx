import PropTypes from 'prop-types';
import './Heading.scss';
import StyledText from '../StyledText/StyledText.jsx';

export default function Heading ({ children, text }) {
  const content = text ?? children ?? 'Not every message needs a name.';
  const contentString = typeof content === 'string' ? content : undefined;

  return (
    <StyledText
      as='h1'
      className='title'
      data-text={contentString}
    >
      {content}
    </StyledText>
  );
}

Heading.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
};
