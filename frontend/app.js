import React from 'react';
import { FacebookProvider } from 'react-facebook';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleListPage from "./pages/ArticleListPage";
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import RoadmapPage from './pages/RoadmapPage';
import ContactPage from './pages/ContactPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

const appId = '133205694265094';

export const App = () => (
  <FacebookProvider wait appId={appId}>
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/article/:id" component={ArticleListPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/roadmap" component={RoadmapPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/verify/:verification" component={VerifyEmailPage} />
      </Switch>
    </Router>
  </FacebookProvider>
);
