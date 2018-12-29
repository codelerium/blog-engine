import React from 'react';
import { Grid } from "../../components/Grid/index";
import Header from '../../components/Header';

export const Page = props => (
  <div>
    <Header />
    {props.children}
    {/* <Grid columnWidth={45} columnNumber={12} gutterWidth={15}/> */}
  </div>
);
