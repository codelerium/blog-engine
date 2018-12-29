import React, { Component } from 'react';
import moment from 'moment';
import * as Guid from 'guid';
import { API } from '../../endpoints';
import { Page } from "../Page";
import { Input } from "../../components/Input";
import ArticleEditor from "../../components/ArticleEditor";
import s from './styles.css';
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import TableHead from "../../components/TableHead";
import TableBody from "../../components/TableBody";
import TableRow from "../../components/TableRow";
import {Button} from "../../components/Button";

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
      console.log(res);
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
        })
      }
    })
  }

  onEditArticle(id) {
    this.setState({
      selectedArticleId: id,
    });
  }

  render() {
    return (
      <Page>
        <div style={s.CONTAINER}>
          <main style={s.MAIN}>
            <div style={s.ARTICLES}>
              <Table>
                <TableHead columns={['Name', 'Slug', 'Created', 'Actions']} />
                <TableBody>
                  {
                      this.state.articles.map(article => (
                          <TableRow
                              key={article._id}
                              source={article}
                              properties={['title', 'slug', 'created']}
                              actions={{
                                onEdit: this.onEditArticle,
                                onDelete: this.onDeleteArticle,
                              }}
                          />
                      ))
                  }
                </TableBody>
              </Table>
              <div style={s.NEW_ARTICLE}>
                <Input placeholder="Add article" onChange={this.onArticleNameChange} value={this.state.articleName}/>
                <Button onClick={this.onAddArticle} title="Save"/>
              </div>
            </div>
            <div style={s.EDIT}>
              {
                this.state.articles.length > 0 && this.state.selectedArticleId &&
                  <ArticleEditor
                    article={this.state.articles.find(a => a._id === this.state.selectedArticleId)}
                  />
              }
            </div>
          </main>
        </div>
      </Page>
    )
  }
}

export default AdminPage;
