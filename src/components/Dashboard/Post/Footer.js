import PropTypes from 'prop-types';

export default function Footer({ caption }) {
  return (
    <div className="caption">
      {caption}
    </div>
  );
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
};
