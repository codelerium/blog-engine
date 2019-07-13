import React, { Component } from 'react';
import { Article } from '../../components/Article';
import { API } from '../../endpoints';
import { Page } from "../Page";
import { Recommendations } from "../../components/Recomendations";
import Subscribe from '../../components/Subscribe'
import Comments from '../../components/Comments';
import { Loader } from '../../components/Loader';
import { PillarBox } from '../../components/PillarBox';

class ArticleListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      comments: [],
      recommendations: [],
    }

    window.scrollTo(0, 0);

    const { id } = this.props.match.params;
    
    API.RETRIEVE_ARTICLE({ slug: id })
      .then((article) => {
        setTimeout(() => {
          this.setState({ article });
        }, 1000);
      });

    API.RETRIEVE_RECOMMENDATIONS({ currentId: id })
      .then((recommendations) => {
        this.setState({ recommendations });
      });
  }

  render() {
    const { article, comments, recommendations } = this.state;
    return (
      <Page skipAuth>
        {
          article ? (
            <Article data={article} />
          ) : (
            <PillarBox>
              <div 
                style={{
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              > 
                <Loader />
              </div>
            </PillarBox>
          )
        }
        <Recommendations recommendations={recommendations} />
        {
          article && (
            <Comments 
              comments={comments}
              articleId={article._id}
            />
          )
        }
        <Subscribe />
      </Page>
    )
  }
}

export default ArticleListPage;