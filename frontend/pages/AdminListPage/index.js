import React, { Component } from 'react';
import { API } from '../../endpoints';
import { Page } from "../Page";
import { UIBox } from "../../components/UIBox";
import ArticleEditor from "../../components/ArticleEditor";
import { Loader } from '../../components/Loader';
import styled from 'styled-components';

class AdminListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
    };
    this.onArticleNameChange = this.onArticleNameChange.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    
    API.RETRIEVE_ARTICLE({ slug: id })
      .then((article) => {
        setTimeout(() => {
          this.setState({ article });
        }, 1000);
      });
  }

  onArticleNameChange(e) {
    this.setState({ articleName: e.target.value });
  }

  render() {
    return (
      <Page header={false}>
        <UIBox>
          {
            this.state.article ? (
              <ArticleEditor
                article={this.state.article}
              />
            ) : (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            )
          }
        </UIBox>
      </Page>
    )
  }
}

export default AdminListPage;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;