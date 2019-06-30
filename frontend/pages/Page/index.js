import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { Grid } from "../../components/Grid/index";
import { Loader } from '../../components/Loader';

export const Page = ({ header, skipAuth, children }) => {
  const isAuthenticated = () => {
    return !!localStorage.getItem('c_token');
  }

  return (isAuthenticated() || skipAuth) ? (
    <div>
      {
        header && (
          <Header />
        )
      }
      {children}
      {/* <Grid columnWidth={35} columnNumber={12} gutterWidth={15}/> */}
      {/* <Grid columnWidth={45} columnNumber={24} gutterWidth={15}/> */}
    </div>
  ) : (
    <Redirect to="/login"/>
  )
};

Page.defaultProps = {
  header: true,
  skipAuth: false,
}

Page.propTypes = {
  header: PropTypes.bool,
  children: PropTypes.node.isRequired,
  skipAuth: PropTypes.bool,
}

