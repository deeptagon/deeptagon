import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import {useState} from "react"
import classNames from "classnames"
export const useConfirmationDialog = ({ title, message, button = {} }) => {
  const initialState = { resolve: null, reject: null }
  const [state, setState] = useState({ ...initialState })
  const confirm = () => new Promise((resolve, reject) => {
    setState({ resolve, reject })
  })
  const onAction = (reply) => () => {
    setState({ ...initialState })
    state[reply]()
  }
  const dialog = <Dialog open={!!state.resolve}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent><DialogContentText>{message}</DialogContentText></DialogContent>
    <DialogActions>
      <Button aria-label='Cancel' onClick={onAction('reject')}>Cancel</Button>
      <Button
        aria-label={button.ariaLabel || "Confirm"}
        className={classNames('btn btn-confirm', button.className)}
        onClick={onAction('resolve')}
      >
        {button.text || 'Confirm'}
      </Button>
    </DialogActions>
  </Dialog>
  return [dialog, confirm]
}