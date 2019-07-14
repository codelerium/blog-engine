import React, { Component } from 'react';
import { Page } from "../Page";
import { API } from '../../endpoints';
import { PillarBox } from '../../components/PillarBox';
import Subscribe from '../../components/Subscribe';
import Tile from '../../components/Tile';
import { Loader } from '../../components/Loader';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    }
    window.scrollTo(0, 0);

    API.RETRIEVE_ALL_ARTICLES({ published: true })
      .then((articles) => {
        window.setTimeout(() => {
          this.setState({ articles })
        }, 1000);
      })
  }

  render() {
    const multiplier = Math.max(0.5, Math.min(1, window.innerWidth / 1000));
    const { articles } = this.state;
    return (
      <Page skipAuth>
        <PillarBox extended>
          {
            articles.length > 0 ? (
              <div>
                <div style={{ height: 240 }} />
                {
                  articles.reverse().map((article, i) => (
                    <Tile 
                      article={article}
                      key={article._id}
                      reversed={i % 2 === 0}
                    />
                  ))
                }
              </div>
            ) : (
              <div 
                style={{
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Loader/>
              </div>
            )
          }
        </PillarBox>
        <Subscribe />
      </Page>
    )
  }
}

export default HomePage;