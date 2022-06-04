import * as React from 'react';
import EventEmitter from '../../plugins/EventEmitter'
import {
  Paper,
  InputBase,
  Divider,
  IconButton,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { changeSearch } from '../../store/contacts'

import { useSelector, useDispatch } from 'react-redux'

export default function Search() {
  const { search } = useSelector((state) => state.contacts)
  const dispatch = useDispatch()
  
  return (
    <Paper
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', shadow: 'none', bgcolor: '#f6f6f6'}}
      elevation={0}
      square={true}
      variant='outlined'
    >
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        value={search}
        onInput={(e) => dispatch(changeSearch(e.target.value))}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: '10px' }}
        aria-label="directions"
        onClick={() => EventEmitter.$emit('SHOW_ADD_EDIT_CONTACT_POPUP')}
      >
        <AddIcon />
      </IconButton>
    </Paper>
  );
}
