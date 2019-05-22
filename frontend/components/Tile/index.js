import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row } from '../Row';
import { Col } from '../Col';
import { Image } from '../Image';
import s from './style.less';

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
                                            <p style={{ fontSize: '14px' }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                            <Link className={s.anchor} to={`/article/${article.slug}`}>Read more</Link>
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