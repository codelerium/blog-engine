import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row } from '../Row';
import { Col } from '../Col';
import { Image } from '../Image';
import styled from 'styled-components';

export default class Tile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { article } = this.props;
        return (
            <Row style={{ marginBottom: 120 }}>
                <Col ratio={1}/>
                <Col ratio={2}>
                    <Row>
                        { 
                            !this.props.reversed && (
                                <Col>
                                    <Image url={article.thumbnail} />
                                </Col>
                            )
                        }
                        <Col>
                            <Row>
                                { !this.props.reversed && (<Col ratio={1} />) }
                                <Col ratio={7}>
                                    <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                        <div>
                                            <h2 style={{ marginTop: 0 }}>{article.title}</h2>
                                            <p style={{ fontSize: '14px', marginBottom: 30 }}>
                                                {
                                                    article.intro && article.intro.length > 120
                                                    ? `${article.intro.substring(0, 120)}...`
                                                    : article.intro
                                                }
                                            </p>
                                            <Anchor to={`/article/${article.slug}`}>Read more</Anchor>
                                        </div>
                                    </div>
                                </Col>
                                { this.props.reversed && (<Col ratio={1} />) }
                            </Row>
                        </Col>
                        { 
                            this.props.reversed && (
                                <Col>
                                    <Image url={article.thumbnail} />
                                </Col>
                            )
                        }
                    </Row>
                </Col>
                <Col ratio={1}/>
            </Row>
        )
    }
}


const Anchor = styled(Link)`
    color: ${p => p.theme.color.black};
    font-size: 14px;
    text-decoration: none;
    border: 1px solid ${p => p.theme.color.black};
    padding: 4px 8px;

    &:hover {
        color: ${p => p.theme.color.white};
        background: ${p => p.theme.color.black};
    }
`;