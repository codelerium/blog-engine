import BASE from '../../base.css';

export default {
  IMAGE_WRAPPER_OUTER: {
    padding: '20px 0',
  },
  IMAGE_WRAPPER_MIDDLE: {
    position: 'relative',
    paddingBottom: '56.25%', // '75%', // '56.25%', // 9 / 16
    background: '#000',
  },
  IMAGE_WRAPPER_INNER: {
    ...BASE.ABSOLUTE_STRETCHED,
  },
  IMAGE: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  CAPTION: {
    fontSize: 14,
    textAlign: 'center',
    padding: '20px 0',
  }
}
