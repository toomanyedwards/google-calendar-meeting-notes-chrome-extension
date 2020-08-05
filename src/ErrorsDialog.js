import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ErrorsDialog({open, onClose, title="Error", errors}) {
  
  return (
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {
              errors.map(
                error => (
                <DialogContentText id="alert-dialog-description">
                  {error.message}
                </DialogContentText>
                )
              )
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
    </Dialog>
  );
}
