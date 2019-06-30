import React from 'react';
import { FacebookProvider } from 'react-facebook';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ArticleListPage from "./pages/ArticleListPage";
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import AdminListPage from './pages/AdminListPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import RoadmapPage from './pages/RoadmapPage';
import ContactPage from './pages/ContactPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

const appId = '133205694265094';

const theme = {
  color: {
    white: '#fff',
    black: '#000',
    red: '#ff2700',
    yellow: '#ffd900',
    green: '#00ff8f',
    'gray-0': 'hsl(0, 0%, 100%)',
    'gray-1': 'hsl(0, 0%, 99%)',
    'gray-2': 'hsl(0, 0%, 98%)',
    'gray-5': 'hsl(0, 0%, 95%)',
    'gray-10': 'hsl(0, 0%, 90%)',
    'gray-20': 'hsl(0, 0%, 80%)',
    'gray-30': 'hsl(0, 0%, 70%)',
    'gray-40': 'hsl(0, 0%, 60%)',
    'gray-50': 'hsl(0, 0%, 50%)',
    'gray-60': 'hsl(0, 0%, 40%)',
    'gray-70': 'hsl(0, 0%, 30%)',
    'gray-80': 'hsl(0, 0%, 20%)',
    'gray-90': 'hsl(0, 0%, 10%)',
    'gray-100': 'hsl(0, 0%, 0)',
  },
  font: {
    h4: '1.5em',
  },
  spacing: {
    xs: '10px',
    sm: '20px',
    md: '40px',
    lg: '60px',
  }
}

export const App = () => (
  <FacebookProvider wait appId={appId}>
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/article/:id" component={ArticleListPage} />
          <Route path="/admin/:id" component={AdminListPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/roadmap" component={RoadmapPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/verify/:verification" component={VerifyEmailPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  </FacebookProvider>
);
