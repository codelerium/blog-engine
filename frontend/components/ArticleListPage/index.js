import React, { Component } from 'react';
import { Article } from '../Article';
import { API } from '../../endpoints';

class ArticleListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
    }
  }

  componentWillMount() {
    API.RETRIEVE_ALL_ARTICLES()
      .then(articles => this.setState({ articles }));
  }

  renderArticles() {
    console.log(this.state.articles);
    if (!this.state.articles) return;
    return this.state.articles.map(article => (
      <Article data={article} />
    ))
  }

  render() {
    return (
      <div>
        {this.renderArticles()}
      </div>
    )
  }
}

export default ArticleListPage;