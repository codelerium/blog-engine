import BASE from '../../base.css';

export default {
  IMAGE_WRAPPER_OUTER: {
    marginBottom: 30,
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
  },
  CAPTION: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: '60px',
  }
}