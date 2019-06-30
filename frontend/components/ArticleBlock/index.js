import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from "../Button";
import { renderBlock } from "../Block";
import { PillarBox } from '../PillarBox';
import { Editable } from '../Editable';

export default class ArticleBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
        }
    }

    render() {
        return(
            <Editable>
                <PillarBox>
                    {renderBlock(this.props.block)}
                </PillarBox>
                <div>
                    <Button onClick={this.props.onSelect} title="Edit"/>
                    <Button onClick={this.props.onDelete} title="Delete"/>
                    <Button onClick={this.props.onMoveUp} title="Move up"/>
                    <Button onClick={this.props.onMoveDown} title="Move down"/>
                    <Button onClick={this.props.onInsertDown} title="Insert block"/>
                </div>
            </Editable>
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