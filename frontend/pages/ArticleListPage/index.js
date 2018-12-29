import React, { Component } from 'react';
import { Article } from '../../components/Article';
import { API } from '../../endpoints';
import { Page } from "../Page";
import Subscribe from '../../components/Subscribe'
// import { Recommendations } from "../Recomendations";
import { Footer } from "../../components/Footer";
import Comments from '../../components/Comments';

const testComments = [
  {
    id: '0',
    name: 'Jung Dániel',
    text: 'Voronoi is a simple idea, that can difficult to implement in higher dimensions! Well explained! :)',
    likes: 2,
    timestamp: '21min ago',
    replies: [
      {
        id: '1',
        name: 'Juhasz Gergely',
        text: 'Dude! That\'s gay',
        likes: 0,
        timestamp: '10min ago',
      },
      {
        id: '3',
        name: 'Jung Dániel',
        likes: 1,
        text: 'Thanks, never got nicer compliment from you!',
        timestamp: '3min ago',
      }
    ]
  },
  {
    id: '2',
    name: 'Schmiz Péter',
    text: 'Woww! Nice',
    likes: 0,
    replies: [],
    timestamp: '3h ago',
  },
  {
    id: '5',
    name: 'Ken Perlin',
    text: 'The animation below is the 2D variant of Ken Perlin\'s algorithm. To create this fluid-like animation, I rotated the gradient vectors around there center and recalculated the pixels. I also applied a gradient mapping to the resulting values to achieve a vivid result. Don\'t worry I\'ll explain the steps in detail.',
    likes: 0,
    replies: [
      {
        id: '6',
        name: 'Jung Daniel',
        text: 'Deserves more likes!',
        likes: 0,
        timestamp: 'Yesterday',
      }
    ],
    timestamp: '1997 Aug',
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
        <Comments comments={testComments}/>
        <Subscribe />
        {/* <Recommendations/> */}
        <Footer/>
      </Page>
    )
  }
}

export default ArticleListPage;