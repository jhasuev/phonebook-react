import * as React from 'react';

import {
  ListSubheader,
  List,
  Divider,
} from '@mui/material';

import ContactItem from '../ContactItem/ContactItem';
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

import Search from '../Search/Search';

export default function MyContent() {
  const { contacts, search } = useSelector((state) => state.contacts)

  const filteredContacts = useMemo(() => {
    const searchWord = search.trim().toLowerCase()
    let filtered = [...contacts]

    if (searchWord) {
      filtered = contacts.filter(contact => {
        const isNameMatching = ~contact.name.toLowerCase().indexOf(searchWord)
        const isPhoneMatching = ~contact.phone.toLowerCase().indexOf(searchWord)
        const isEmailMatching = ~contact.email.toLowerCase().indexOf(searchWord)
  
        return isNameMatching || isPhoneMatching || isEmailMatching
      })
    }

    return filtered.sort((a, b) => (
      a.name
        .toLowerCase()
        .localeCompare(
          b.name.toLowerCase()
        )
    ))
  }, [ contacts, search ])

  const getContactNameLetter = (contact) => {
    return contact?.name?.slice(0, 1).toUpperCase()
  }

  return (
    <List
      sx={{ width: '100%', boxShadow: '0 0 10px rgba(0,0,0,.1)'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <div>
          <Search />
          <ListSubheader component="div" id="nested-list-subheader">
            Contacts count: {filteredContacts.length}
          </ListSubheader>
        </div>
      }
    >
      <Divider />
      <div>
        {
          !filteredContacts.length
          ?
            <ListSubheader component="div" sx={{ textAlign: 'center'}}>
              {
                search.trim()
                ? <span>Contacts Was Not Found</span>
                : <span>Contact list is empty</span>
              }
            </ListSubheader>
          : ''
        }
        {filteredContacts.map((contact, i) => (
          <div key={contact.id}>
            { i ? <Divider /> : '' }
            {
              (getContactNameLetter(filteredContacts[i - 1]) !== getContactNameLetter(contact))
              ? 
                <ListSubheader inset>{ getContactNameLetter(contact) }</ListSubheader>
              : ''
            }
            <ContactItem contact={contact} />
          </div>
        ))}
      </div>
    </List>
  );
}
