import React, { Component } from 'react';
import moment from 'moment';
import * as Guid from 'guid';
import { API } from '../../endpoints';
import { Page } from "../Page";
import { Input } from "../../components/Input";
import Table from "../../components/Table";
import TableHead from "../../components/TableHead";
import TableBody from "../../components/TableBody";
import TableRow from "../../components/TableRow";
import { Button } from "../../components/Button";
import { UIBox } from "../../components/UIBox";
import styled from 'styled-components';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleName: '',
      articles: [],
      selectedArticleId: '',
    };
    this.onArticleNameChange = this.onArticleNameChange.bind(this);
    this.onAddArticle = this.onAddArticle.bind(this);
    this.onDeleteArticle = this.onDeleteArticle.bind(this);
    this.onEditArticle = this.onEditArticle.bind(this);
    this.onPublishChange = this.onPublishChange.bind(this);
  }

  componentWillMount() {
    API.RETRIEVE_ALL_ARTICLES().then((res) => {
      this.setState({ articles: res, selectedArticleId: res[0]._id });
    });
  }

  onArticleNameChange(e) {
    this.setState({ articleName: e.target.value });
  }

  onAddArticle() {
    API.CREATE_ARTICLE({
      title: this.state.articleName,
      created: moment().format('YYYY-MM-DD'),
      id: Guid.raw(),
      slug: this.state.articleName.toLowerCase().split(' ').join('-'),
      authorId: '1',
    }).then(res => {
      this.setState({
        articles: [
          ...this.state.articles,
          res,
        ]
      })
    });
  }

  onDeleteArticle(id) {
    API.DELETE_ARTICLE({ id }).then(res => {
      if (res.isSuccess) {
        this.setState({
          articles: this.state.articles.filter(a => a._id !== id),
        });
      }
    })
  }

  onPublishChange(id, newPublished) {
    API.PUBLISH_ARTICLE({ id, published: newPublished }).then(updatedArticle => {
      this.setState({
        articles: this.state.articles
          .map(article => article._id === updatedArticle._id
            ? updatedArticle
            : article
          ),
      });
    });
  }

  onEditArticle(id) {
    this.setState({
      selectedArticleId: id,
    });
  }

  render() {
    return (
      <Page header={false}>
        <UIBox>
          <AdminPageWrapper>
            <CreateAction>
              <CreateActionInput>
                <Input
                  placeholder="Add article"
                  onChange={this.onArticleNameChange}
                  value={this.state.articleName}
                />
              </CreateActionInput>
              <Button onClick={this.onAddArticle} title="Save" />
            </CreateAction>
            <Table>
              <TableHead columns={['Name', 'Slug', 'Created', 'Published', '']} />
              <TableBody>
                {
                  this.state.articles.map((article) => (
                    <TableRow
                      key={article._id}
                      source={article}
                      properties={['title', 'slug', 'created', 'published']}
                      actions={{
                        onDelete: () => this.onDeleteArticle(article._id),
                        onPublishChange: this.onPublishChange,
                      }}
                    />
                  ))
                }
              </TableBody>
            </Table>
          </AdminPageWrapper>
        </UIBox>
      </Page>
    )
  }
}

export default AdminPage;

const AdminPageWrapper = styled.div`
  width: 100%;
  padding: ${p => p.theme.spacing.md};
`;

const CreateAction = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const CreateActionInput = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding-right: 20px;
`;