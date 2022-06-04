import { useState } from 'react';
import EventEmitter from '../../plugins/EventEmitter'
import { removeContact } from '../../store/contacts'
import { useDispatch } from 'react-redux'
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

export default function ContactItem({ contact }) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <Avatar sx={{ mr: 2 }}>{ contact.name.slice(0, 1) }</Avatar>
        <ListItemText primary={contact.name} secondary={contact.phone} />
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
          {
            contact.email
            ?
              <Button sx={{ flexGrow: 1}} variant="outlined">
                <Mail sx={{ fontSize: 18, mr: 1 }} />
                Write
              </Button>
            : ''
          }
          <IconButton
            sx={{ p: '10px' }}
            onClick={() => EventEmitter.$emit('SHOW_ADD_EDIT_CONTACT_POPUP', contact)}
          >
            <Edit />
          </IconButton>
          <IconButton
            sx={{ p: '10px' }}
            onClick={() => dispatch(removeContact(contact.id))}
          >
            <Delete />
          </IconButton>
        </List>
      </Collapse>
    </div>
  );
}
