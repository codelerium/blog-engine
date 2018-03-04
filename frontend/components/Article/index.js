import React from 'react';

export const Article = props => (
  <div>
    <h1>{props.data.title}</h1>
    <span>{props.data.created}</span>
    <span>{props.data.author_id}</span>
  </div>
);
