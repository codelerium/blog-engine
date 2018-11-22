import React, { Component } from 'react';
import { Article } from '../../components/Article';
import { API } from '../../endpoints';
import { Page } from "../Page";
// import { Recommendations } from "../Recomendations";
// import { Footer } from "../Footer";
// import Comments from '../Comments';

const testComments = [
  {
    name: 'Jung Dániel',
    text: 'Voronoi is a simple idea, that can difficult to implement in higher dimensions! Well explained! :)',
  },
  {
    name: 'Schmiz Péter',
    text: 'Woww! Nice',
  },
];

class ArticleListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
    }

    const { id } = this.props.match.params;
    API.RETRIEVE_ARTICLE({ slug: id })
      .then(article => this.setState({ article }));
  }

  render() {
    return (
      <Page>
        {
          this.state.article &&
            <Article data={this.state.article} />
        }
        {/* <Recommendations/> */}
        {/* <Comments comments={testComments}/> */}
        {/* <Footer/> */}
      </Page>
    )
  }
}

export default ArticleListPage;