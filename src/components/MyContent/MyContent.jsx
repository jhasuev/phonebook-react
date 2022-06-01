import * as React from 'react';

import {
  ListSubheader,
  List,
  Divider,
} from '@mui/material';

import Contacts from '../Contacts/Contacts';
import Search from '../Search/Search';

export default function MyContent() {
  return (
    <List
      sx={{ width: '100%', boxShadow: '0 0 10px rgba(0,0,0,.1)'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <div>
          <Search />
          <ListSubheader component="div" id="nested-list-subheader">
            All contacts: 8
          </ListSubheader>
        </div>
      }
    >
      <Divider />
      <Contacts />
    </List>
  );
}
