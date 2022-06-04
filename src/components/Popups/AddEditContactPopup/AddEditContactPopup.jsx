import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Slide,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { addContact, editContact } from '../../../store/contacts'

import EventEmitter from '../../../plugins/EventEmitter'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AddContactPopup() {
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)

  const [editId, setEditId] = React.useState(-1)
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')

  const initErrors = { name: '', phone: '' }
  const [errors, setErrors] = React.useState(initErrors)

  const close = () => {
    setOpen(false)

    setEditId(-1)
    setName('')
    setPhone('')
    setEmail('')

    setErrors(initErrors)
  }

  const onSubmit = () => {
    setErrors({ ...initErrors })

    if (!name.trim()) return setErrors({...errors, name: "Could't be empty"})
    if (!phone.trim()) return setErrors({...errors, phone: "Could't be empty"})

    if (editId < 0) {
      dispatch(addContact({ name, phone, email }))
    } else {
      dispatch(editContact({ name, phone, email, id: editId }))
    }

    close()
  }

  EventEmitter.$on('SHOW_ADD_EDIT_CONTACT_POPUP', ({ id, name, phone, email } = {}) => {
    if (id >= 0) {
      setEditId(id)
      setName(name)
      setPhone(phone)
      setEmail(email)
    }

    setOpen(true)
  })

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={close}
    >
      <DialogTitle>
        {
          editId < 0
          ? 'Add contact'
          : 'Edit contact'
        }
      </DialogTitle>
      <DialogContent style={ {paddingTop: '5px'} }>
        <div style={ {marginBottom: '15px'} }>
          <TextField
            type='text'
            label="Contact name"
            variant="outlined"

            error={!!errors.name}
            helperText={errors.name}
            
            value={name}
            onInput={(e) => setName(e.target.value)}
          />
        </div>
        <div style={ {marginBottom: '15px'} }>
          <TextField
            type='phone'
            label="Phone number"
            variant="outlined"
            error={!!errors.phone}
            helperText={errors.phone}
            value={phone}
            onInput={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <TextField
            type='email'
            label="Email address"
            variant="outlined"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained">
          {
            editId < 0
            ? 'Add'
            : 'Edit'
          }
        </Button>
      </DialogActions>
    </Dialog>
  )
}
