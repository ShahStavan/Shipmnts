import React from 'react';
import { List, ListItem } from '@material-ui/core';

const FileBrowser = ({ files }) => (
  <List>
    {files.map(file => (
      <ListItem key={file.name}>
        {file.name}
      </ListItem>
    ))} 
  </List>
);

export default FileBrowser;
