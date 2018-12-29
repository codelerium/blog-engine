import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextArea } from '../Textarea';
import { BLOCK_TYPES } from '../../config/dev';
import {Button} from "../Button";

export default class ArticleBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
        }
    }

    renderTypes() {
        return(
            <select 
                onChange={e => this.props.onBlockTypeChange(e.target.value)}
                style={{
                    background: 'linear-gradient(rgb(255, 255, 255), rgb(239, 239, 239))',
                    border: '1px solid rgb(221, 221, 221)',
                    borderRadius: 2,
                    padding: '0px 15px',
                    fontSize: 12,
                    margin: 5,
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    WebkitAppearance: 'none',
                }}
            >
                {
                    Object.entries(BLOCK_TYPES).map(([, val]) => (
                        this.props.type === val ?
                        <option selected key={val}>{val}</option> :
                        <option key={val}>{val}</option>
                    ))
                }
            </select>
        )
    }

    render() {
        return(
            <div style={{ 
                border: '1px solid lightgray', 
                margin: '20px 0',
                background: 'white',
            }}>
                <div style={{ 
                    display: 'flex',     
                    borderBottom: '3px solid lightgray',
                    height: 50,
                    alignItems: 'center',
                    padding: '0 5px',
                }}>
                    {
                        this.renderTypes()
                    }
                    <Button onClick={this.props.onDelete} title="Delete"/>
                    <Button onClick={this.props.onMoveUp} title="Move up"/>
                    <Button onClick={this.props.onMoveDown} title="Move down"/>
                    <Button onClick={this.props.onInsertDown} title="Insert block"/>
                </div>
                <TextArea
                    onChange={e => this.props.onTextChange(e.target.value)}
                    value={this.props.content}
                />
            </div>
        )
    }
}

ArticleBlock.defaultProps = {
    onTextChange: () => {},
}

ArticleBlock.propTypes = {
    type: PropTypes.string,
    content: PropTypes.string,
    onTextChange: PropTypes.func,
}
