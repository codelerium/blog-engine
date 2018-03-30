import React, { Component } from 'react';
import moment from 'moment';
import { API } from '../../endpoints';
import { Page } from "../Page";
import { Input } from "../Input/index";
import s from './styles.css';
import ArticleEditor from "../ArticleEditor/index";

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
      id: this.state.articleName.toLowerCase().split(' ').join('-'),
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
        })
      }
    })
  }

  onEditArticle(id) {
    this.setState({
      selectedArticleId: id,
    });
  }

  renderArticles() {
    return this.state.articles.map(article => (
      <tr key={article._id}>
        <td>{article.title}</td>
        <td>{article._id}</td>
        <td>{article.created}</td>
        <td>
          <button onClick={() => this.onDeleteArticle(article._id)}>delete</button>
          <button onClick={() => this.onEditArticle(article._id)}>edit</button>
        </td>
      </tr>
    ))
  }

  render() {
    console.log(this.state, this.state.articles.find(a => a._id === this.state.selectedArticleId));
    return (
      <Page>
        <div style={s.CONTAINER}>
          <main style={s.MAIN}>
            <div style={s.ARTICLES}>
              <table>
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Id</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.renderArticles()}
                </tbody>
                <Input onChange={this.onArticleNameChange} value={this.state.articleName}/>
                <button onClick={this.onAddArticle}>Save article</button>
              </table>
            </div>
            <div style={s.EDIT}>
              {
                this.state.articles.length > 0 &&
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