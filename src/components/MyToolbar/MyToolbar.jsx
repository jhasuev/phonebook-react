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
import { useSelector } from 'react-redux'
import {
  Menu,
  Add,
  FileUpload,
  FileDownload,
  Article,
  Code,
} from '@mui/icons-material';

export default function MyToolbar() {
  const { contacts } = useSelector((state) => state.contacts)
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (state) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState(state);
  };

  const downloadInFile = (text, format = 'txt') => {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/' + format + ';charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'contacts_backup.' + format);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  
  const loadJSONData = () => {
    const data = JSON.stringify(contacts)
    downloadInFile(data, 'json')
  }
  
  const loadCSVData = () => {
    const data = contacts.reduce((acc, {name, phone, email}) => {
      return `${acc}\n${name},${phone},${email}`
    }, '').trim()
    downloadInFile(data, 'csv')
  }

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
        loadJSONData()
        break;
      }
      case 'export_to_csv': {
        loadCSVData()
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
          href='https://github.com/jhasuev/phonebook-react'
          target='_blank'
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
