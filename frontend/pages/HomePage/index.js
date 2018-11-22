import React, { Component } from 'react';
import { Page } from "../Page";
import { API } from '../../endpoints';
import { PillarBox } from '../../components/PillarBox';
import { Title } from '../../components/Title';

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
    return (
      <Page>
        <PillarBox>
          {
            this.state.articles.map((article) => (
              <div>
                <Title
                  key={article._id}
                  text={article.title} 
                  created={article.created}
                />
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