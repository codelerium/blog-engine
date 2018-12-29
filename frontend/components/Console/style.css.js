export default {
    CONSOLE: {
        position: 'fixed',
        bottom: '-100px',
        right: 20,
        height: 400,
        width: 300,
        fontFamily: 'monospace',
        background: 'rgba(0, 0, 0, .8)',
        color: 'white',
        border: '1px solid gray',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        boxShadow: '0 0 0 1px rgba(0, 0, 0, .75)',
        '-webkit-backdrop-filter': 'blur(12px)',
    },
    CONSOLE_INNER: {
        padding: 10,
    },
    PROMPT: {
        display: 'flex',
    },
    PROMPT_INPUT: {
        flex: 1,
        fontFamily: 'monospace',
        fontSize: '13px',
        color: 'white',
        padding: '0 10px',
        background: 'transparent',
        border: 'none',
        outline: 'none',
    },
    ACTIONS: {
        display: 'flex',
        alignItems: 'center',
        background: 'gray',
    },
    CLOSE: {
        border: 'none',
        width: 12,
        height: 12,
        margin: 4,
        background: '#ff4d4d',
        borderRadius: 6,
        padding: 0,
    }
}