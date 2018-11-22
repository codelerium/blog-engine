import BASE from '../../base.css';

export default {
  IMAGE_WRAPPER_OUTER: {

  },
  IMAGE_WRAPPER_MIDDLE: {
    position: 'relative',
    paddingBottom: '75%',
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
    margin: '20px 0',
  }
}