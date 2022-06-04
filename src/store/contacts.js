import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
  contacts: [
    {"name":"Anton","phone":"+9876545678","email":"anton@mail.ru"},
    {"name":"Alex","phone":"+4951234567890","email":""},
    {"name":"Виу-виу-виу","phone":"103","email":""},
    {"name":"Police","phone":"102","email":""},
    {"name":"Petr","phone":"+79090020122","email":""},
    {"name":"FIRE!!!","phone":"101","email":""},
    {"name":"Jamal","phone":"89286486178","email":"jhasuev@mail.ru"},
    {"name":"Ждунчик","phone":"88002000600","email":"poisk@vid.ru"}
  ],
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    changeSearch: (state, { payload }) => {
      state.search = String(payload)
    },

    addContact: (state, action) => {
      console.log('state', state);
      console.log('action', action);
    },
  },
})

export const { addContact, changeSearch } = contactsSlice.actions

export default contactsSlice.reducer
