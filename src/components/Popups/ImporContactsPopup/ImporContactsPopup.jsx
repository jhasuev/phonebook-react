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
import { addContacts } from '../../../store/contacts'

import EventEmitter from '../../../plugins/EventEmitter'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AddContactPopup() {
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)

  const [jsonText, setJsonText] = React.useState('')
  
  const initErrors = { jsonText: '' }
  const [errors, setErrors] = React.useState(initErrors)

  const close = () => {
    setOpen(false)
    setJsonText('')
    setErrors(initErrors)
  }

  const onSubmit = () => {
    setErrors({ ...initErrors })

    if(!jsonText) {
      return setErrors({...errors, jsonText: "Could't be empty"})
    }

    try {
      const newContacts = JSON.parse(jsonText)
      dispatch(addContacts(newContacts))
    } catch (e) {
      return setErrors({...errors, jsonText: "Invalid JSON string..."})
    }

    close()
  }

  EventEmitter.$on('SHOW_IMPORT_CONTACT_POPUP', () => {
    setOpen(true)
  })

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={close}
    >
      <DialogTitle>Import contacts</DialogTitle>
      <DialogContent style={ {paddingTop: '5px'} }>
        <TextField
          multiline
          minRows={1}
          maxRows={6}
          placeholder="Enter json data here..."
          error={!!errors.jsonText}
          helperText={errors.jsonText}
          value={jsonText}
          onInput={e => setJsonText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained">Import</Button>
      </DialogActions>
    </Dialog>
  )
}
