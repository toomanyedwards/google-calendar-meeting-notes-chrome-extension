import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const AddingMeetingNotesDialog = ({open}) => {  
    return (
        <Dialog maxWidth="lg" open={open}  aria-labelledby="form-dialog-title">
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Adding meeting notes...
            </DialogContentText>
            <div style={{
            position: 'relative',
            display:'flex',
            width:"100%",
            justifyContent: 'center'
    
            }}>
        
                <CircularProgress />
            </div>
        </DialogContent>
        </Dialog>
        
    )
    /*return 
    (<Dialog maxWidth="lg" open={open}  aria-labelledby="form-dialog-title">
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Adding meeting notes...
            </DialogContentText>
            <div style={{
            position: 'relative',
            display:'flex',
            width:"100%",
            justifyContent: 'center'
    
            }}>
        
                <CircularProgress />
            </div>
        </DialogContent>
    </Dialog>)*/
}


export default AddingMeetingNotesDialog;