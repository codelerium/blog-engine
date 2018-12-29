export default {
  CONTAINER: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  SIDEBAR: {
    width: 240,
    height: '100%',
    background: '#555',
    color: '#f5f5f5',
  },
  MAIN: {
    display: 'flex',
    width: '100%',
    height: '100%',
    background: '#fbfbfb',
  },
  ARTICLES: {
    borderRight: '1px solid lightgray',
    flex: '0 0 50%',
    boxSizing: 'border-box',
    padding: 30,
  },
  EDIT: {
    flex: '0 0 50%',
    overflow: 'auto',
    boxSizing: 'border-box',
    padding: 30,
  },
  NEW_ARTICLE: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  }
}
