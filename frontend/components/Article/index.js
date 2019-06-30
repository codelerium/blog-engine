import React, { Component } from 'react';
import { PillarBox } from "../PillarBox";
import { Loader } from "../Loader";
import { Title } from '../Title';
import { renderBlock } from '../Block';
import s from './styles.css';

export class Article extends Component {
  constructor(props) {
    super(props);
    this.state ={
      scroll: 0,
    };

    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnMount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    this.setState({ scroll: this.getScrollPercent() });
  }

  getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
  }

  render() {
    const { data } = this.props;
    return (
      <div style={s.ARTICLE}>
        <PillarBox>
          <Title text={data.title} created={data.created}/>
          {
            data.blocks.map(block => renderBlock(block))
          }
        </PillarBox>
      </div>
    )
  }
}

export class ArticleSkeleton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={s.ARTICLE}>
        <PillarBox>
          <Loader width="75%" minWidth="200px" height="45px" margin="40px 0 0" />
          <Loader width="20%" minWidth="100px" height="15px" margin="10px 0 80px" />
          <Loader width="100%" minWidth="400px" height="100px" margin="0 0 240px" />
        </PillarBox>
      </div>
    )
  }
}