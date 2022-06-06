import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
  contacts: [
    {"id": 1,"name":"Anton","phone":"+9876545678","email":"anton@mail.ru"},
    {"id": 2,"name":"Alex","phone":"+4951234567890","email":""},
    {"id": 3,"name":"Виу-виу-виу","phone":"103","email":""},
    {"id": 4,"name":"Police","phone":"102","email":""},
    {"id": 5,"name":"Petr","phone":"+79090020122","email":""},
    {"id": 6,"name":"FIRE!!!","phone":"101","email":""},
    {"id": 7,"name":"Jamal","phone":"89286486178","email":"jhasuev@mail.ru"},
    {"id": 8,"name":"Ждунчик","phone":"88002000600","email":"poisk@vid.ru"}
  ],
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    changeSearch: (state, { payload }) => {
      state.search = String(payload)
    },

    addContact: (state, { payload }) => {
      state.contacts.push({
        id: parseInt(Math.random() * 10 ** 18 + Date.now()).toString(36),
        ...payload,
      })
    },

    addContacts: (state, { payload: contacts }) => {
      const mustAddContacts = []

      contacts.forEach((newContact, i) => {
        if(!newContact.name && !newContact.phone) return

        const exist = state.contacts.some(oldContact => {
          const sameName = oldContact.name === newContact.name
          const samePhone = oldContact.phone === newContact.phone
          const sameEmail = oldContact.email === newContact.email

          return sameName && samePhone & sameEmail
        })

        if (!exist) {
          mustAddContacts.push({
            ...newContact,
            id: parseInt(Math.random() * 10 ** 18 + Date.now() + i).toString(36)
          })
        }
      })

      state.contacts.push(...mustAddContacts)
    },

    editContact: (state, { payload }) => {
      state.contacts = state.contacts.map(contact => {
        if (payload.id === contact.id) {
          contact = payload
        }

        return contact
      })
    },

    removeContact: (state, { payload: id }) => {
      state.contacts = state.contacts.filter(contact => (
        id !== contact.id
      ))
    },
  },
})

export const {
  addContact,
  addContacts,
  editContact,
  removeContact,
  changeSearch,
} = contactsSlice.actions

export default contactsSlice.reducer
