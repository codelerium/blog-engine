import React from 'react';
import { Grid } from "../../components/Grid/index";
import Header from '../../components/Header';
import { Loader } from '../../components/Loader';

export const Page = props => (
  <div>
    {/* <Loader /> */}
    <Header />
    {props.children}
    {/* <Grid columnWidth={35} columnNumber={12} gutterWidth={15}/> */}
    {/* <Grid columnWidth={45} columnNumber={24} gutterWidth={15}/> */}
  </div>
);
