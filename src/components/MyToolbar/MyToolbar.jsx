import { useState } from 'react';

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
                text: 'New contact',
                icon: 'Add'
              },
              {
                text: 'Import',
                icon: 'FileDownload',
              },
              {
                text: 'Export',
                icon: 'FileUpload',
              },
              {
                text: 'Export to CSV',
                icon: 'Article',
              }
            ].map(({text, icon}, index) => (
              <ListItem key={text} disablePadding>
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
