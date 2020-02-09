import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function FormDialog() {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [files, setFiles] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadHandler = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image()
      img.src = reader.result

      images = [...images]
      images.push(img)
      setImages(images)
    }

    e.target.files.map(f => {
      reader.readAsDataURL(f)
    });

    setFiles(e.target.files);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Upload Images
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upload some images to Pin them to the Map!
          </DialogContentText>
          {/* <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {tileData.map(tile => (
              <GridListTile key={tile.img} cols={tile.cols || 1}>
                <img src={tile.img} alt={tile.title} />
              </GridListTile>
            ))}
          </GridList> */}
        </DialogContent>
        <DialogActions>
        
        <input
            accept="image/*"
            className={classes.input}
            id="text-button-file"
            multiple
            type="file"
            onChange={uploadHandler}
        />
        <label htmlFor="text-button-file">
            <Button variant="contained" color="primary" component="span">
                Upload
            </Button>
        </label>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}