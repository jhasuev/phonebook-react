import { useState } from 'react';

import {
  List,
  ListItemButton,
  Avatar,
  ListItemText,
  Collapse,
  IconButton,
  Button,
} from '@mui/material';

import {
  ExpandLess,
  ExpandMore,
  Call,
  Mail,
  Edit,
  Delete,
} from '@mui/icons-material';

export default function ContactItem() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <Avatar sx={{ mr: 2 }}>H</Avatar>
        <ListItemText primary="Contact name" secondary="+23477654334" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          sx={{
            p: '10px 8px 10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
        }}
        >
          <Button sx={{ flexGrow: 1}} variant="outlined">
            <Call sx={{ fontSize: 18, mr: 1 }} />
            Call
          </Button>
          <Button sx={{ flexGrow: 1}} variant="outlined">
            <Mail sx={{ fontSize: 18, mr: 1 }} />
            Write
          </Button>
          <IconButton sx={{ p: '10px' }}>
            <Edit />
          </IconButton>
          <IconButton sx={{ p: '10px' }}>
            <Delete />
          </IconButton>
        </List>
      </Collapse>
    </div>
  );
}
