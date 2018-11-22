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
            <select onChange={e => this.props.onBlockTypeChange(e.target.value)}>
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
            <div>
                {
                    this.renderTypes()
                }
                <Button onClick={this.props.onDelete} title="Delete"/>
                <Button onClick={this.props.onMoveUp} title="Move up"/>
                <Button onClick={this.props.onMoveDown} title="Move down"/>
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
