import React from 'react';
import { Grid } from "../Grid/index";

export const Page = props => (
  <div>
    {props.children}
    <Grid columnWidth={45} columnNumber={12} gutterWidth={15}/>
  </div>
);
