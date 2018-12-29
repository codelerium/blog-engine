import React, { Component } from 'react';
import { Page } from "../Page";
import { API } from '../../endpoints';
import { PillarBox } from '../../components/PillarBox';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    }

    API.RETRIEVE_ALL_ARTICLES()
      .then(articles => this.setState({ articles }))
  }

  render() {
    const multiplier = Math.max(0.5, Math.min(1, window.innerWidth / 1000));
    console.log(multiplier);
    return (
      <Page>
        <PillarBox>
          <h1 style={{ 
            fontSize: 64 * multiplier, margin: `${120 * multiplier}px 0` }}>Codelirum fuses coding and art together</h1>
          {
            this.state.articles.map((article) => (
              <div key={article._id}>
                <h2>{article.title}</h2>
                <a href={`/article/${article.slug}`}>Read more</a>
              </div>
            ))
          }
        </PillarBox>
      </Page>
    )
  }
}

export default HomePage;