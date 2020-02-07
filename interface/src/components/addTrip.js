import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { ListItemAvatar } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 100,
    },
    input: {
        display: 'none',
    },
}));


export default function AddTrip() {

    const [tripUpload, setTripUpload] = useState(null);
    const [documents, setDocuments] = useState([]);

    const handleTripUploadOpen = () => {
        setTripUpload(true);
    }
    const handleTripUploadClose = () => {
        setTripUpload(false);
    }

    // function arrayRemove(arr, value) {

    //     return arr.filter(function(ele){
    //         return ele.name !== value;
    //     });
     
    //  }

    // function removeDocument(docName) {
    //     setDocuments(arrayRemove(documents, docName));
    // }

    const classes = useStyles();

    return (
        <div className={classes.fab} >
            <Fab color="primary" aria-label="add" onClick={handleTripUploadOpen} >
                <AddIcon />
            </Fab>
            <Dialog open={tripUpload} onClose={() => { handleTripUploadClose(); setDocuments([]); }} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">
                    <TextField
                        margin="dense"
                        id="name"
                        label="Trip Name"
                        type="tripName"
                        fullWidth
                        size='medium'
                    />
                </DialogTitle>

                <DialogContent>
                    <List >
                        {documents.map(document => (
                            <ListItem button key={document.name}>
                                <ListItemAvatar>
                                    <AttachFileIcon />
                                </ListItemAvatar>
                                <ListItemText primary={document.name} />
                                <ListItemSecondaryAction onClick={console.log(document.name)}>
                                    <IconButton   >
                                        <ClearIcon  />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                        )}
                    </List>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="file"
                        multiple
                        size='medium'
                        type="file"
                        onChange={e => { setDocuments([...e.target.files]); }}
                    />
                    <label htmlFor="file">
                        <Button raised component="span" className={classes.button} >
                            Upload
                        </Button>
                    </label>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleTripUploadClose(); setDocuments([]); }} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleTripUploadClose} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}