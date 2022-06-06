import { useState } from 'react';
import EventEmitter from '../../plugins/EventEmitter'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import {
  Menu,
  Add,
  FileUpload,
  FileDownload,
  Article,
  Code,
} from '@mui/icons-material';

export default function MyToolbar() {
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (state) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState(state);
  };

  const onMenuClick = (type) => {
    switch (type) {
      case 'add': {
        EventEmitter.$emit('SHOW_ADD_EDIT_CONTACT_POPUP')
        break;
      }
      case 'import': {
        EventEmitter.$emit('SHOW_IMPORT_CONTACT_POPUP')
        break;
      }
      case 'export': {
        break;
      }
      case 'export_to_csv': {
        break;
      }
      default: {}
    }

    setDrawerState(false)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          React Phonebook
        </Typography>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
        >
          <Code />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor='left'
        open={drawerState}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {[
              {
                name: 'add',
                text: 'New contact',
                icon: 'Add'
              },
              {
                name: 'import',
                text: 'Import',
                icon: 'FileDownload',
              },
              {
                name: 'export',
                text: 'Export',
                icon: 'FileUpload',
              },
              {
                name: 'export_to_csv',
                text: 'Export to CSV',
                icon: 'Article',
              }
            ].map(({name, text, icon}, index) => (
              <ListItem
                key={text}
                disablePadding
                onClick={() => onMenuClick(name)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {icon === 'Add' ? <Add /> : ''}
                    {icon === 'FileDownload' ? <FileDownload /> : ''}
                    {icon === 'FileUpload' ? <FileUpload /> : ''}
                    {icon === 'Article' ? <Article /> : ''}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
