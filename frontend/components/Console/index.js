import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

export default class Console extends Component {
    constructor(props) {
        super(props);

        this.state = {
            command: '',
            commandStack: [],
            stackPointer: 0,
            lines: [...props.messages],
        };
        this.inputRef = null;

        this.onCommand = this.onCommand.bind(this);
        this.onTyping = this.onTyping.bind(this);
    }

    componentDidMount() {
        if (this.inputRef) {
            this.inputRef.addEventListener('keydown', this.onTyping);
        }
    }

    componentDidUpdate() {
        if (this.inputRef) {
            this.inputRef.focus();
        }
    }

    onCommand(e) {
        this.setState({ command: e.target.value });
    }

    onTyping(e) {
        const { command, commandStack, lines, stackPointer } = this.state;
        if (e.key === 'Enter') {
            const result = this.evaluate(command);
            if (result !== false) {
                this.setState({ 
                    command: '',
                    commandStack: [...commandStack, command],
                    stackPointer: commandStack.length,
                    lines: [...lines, result],
                }, () => {
                    console.log(this.state);
                });
            }
        }
        if (e.key === 'ArrowUp') {
            const newStackPointer = Math.max(0, stackPointer - 1);
            this.setState({
                command: commandStack[newStackPointer],
                stackPointer: newStackPointer,
            });
        }
        
        if (e.key === 'ArrowDown') {
            const newStackPointer = Math.min(commandStack.length - 1, stackPointer + 1);
            this.setState({
                command: commandStack[newStackPointer],
                stackPointer: newStackPointer,
            });
        }
    }

    evaluate(cmd) {
        switch(cmd) {
            case '':
                return '';
            case 'help':
                return 'available commands: help exit clear'
            case 'clear':
                this.setState({ 
                    command: '',
                    lines: [],
                    commandStack: [...this.state.commandStack, cmd],
                });
                return false;
            case 'exit':
                this.props.onClose();
                return false;
            default:
                return `unknown command '${cmd}'`;
        }
    }

    renderPrompt() {
        const { command } = this.state;
        return (
            <div style={s.PROMPT}>
                <span style={{ color: 'lightgreen' }}>bot@codelirium</span>:
                <span style={{ color: 'coral' }}>~</span>$
                <input
                    style={s.PROMPT_INPUT}
                    type="text"
                    onChange={this.onCommand}
                    value={command}
                    ref={i => this.inputRef = i}
                />
            </div>
        )
    }

    renderLines() {
        const { lines } = this.state;
        return lines.map((line, i) => (
            <div key={i}>
                <div>
                    <span style={{ color: 'lightgreen' }}>bot@codelirium</span>:
                    <span style={{ color: 'coral' }}>~</span>$
                </div>
                {line}
            </div>
        ));
    }

    render() {
        const { open } = this.props;
        return (
            <div
                style={{
                    ...s.CONSOLE,
                    ...(open ? { display: 'block' } : { display: 'none' })
                }}
            >
                <div style={s.ACTIONS}>
                    <button onClick={this.props.onClose} style={s.CLOSE} />
                </div>
                <div style={s.CONSOLE_INNER}>
                    {this.renderLines()}
                    {this.renderPrompt()}
                </div>                
            </div>
        )
    }
}