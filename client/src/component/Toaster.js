import { Alert, IconButton, Snackbar } from '@mui/material';
import React from 'react'

export default function Toaster({ message }) {
    const [open,setOpen] = React.useState(true);
    function handleClose(event,reason) {
        if(reason === "Clickaway"){
            return;
        }
        setOpen(false);
    }

  return (
    <div>
      <Snackbar anchorOrigin={{
        vertical:"top",horizontal:"right"
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      variant="warning"
      ContentProps={{ "aria-describedby": "message-id" }}
      message={message}
      action={[
        <IconButton key={close} onClick={handleClose}>
            <CloseIcon/>
        </IconButton>
      ]}
      >
        <Alert onClick={handleClose} severity='warning' sx={{width:'30vw'}}>
            {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
