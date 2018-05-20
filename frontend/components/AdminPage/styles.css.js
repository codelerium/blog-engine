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
    width: 'calc(100% - 240px)',
    height: '100%',
  },
  ARTICLES: {
    background: '#f5f5f5',
    flex: 1,
    padding: 60,
  },
  EDIT: {
    background: '#fff',
    flex: 1,
    overflow: 'auto',
  },
}