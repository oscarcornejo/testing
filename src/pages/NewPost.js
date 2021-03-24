import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

const NewPost = () => {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [bodyPost, setBodypost] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handlePost = (e) => {
    e.preventDefault();

    if (!title && !bodyPost) {
      console.log('Campos obligatorios');
      return false;
    } else if (!title) {
      console.log('Campo Title obligatorio');
      return false;
    } else if (!setBodypost) {
      console.log('Campo Post obligatorio');
      return false;
    }

    const urlEndpoint = 'https://jsonplaceholder.typicode.com/posts';
    const data = { title, bodyPost };
    const headersConfig = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    axios
      .post(urlEndpoint, data, headersConfig)
      .then((resp) => {
        const data = resp.data;
        setTitle('');
        setBodypost('');
        setMessage('Send Post Ok!');
        setOpen(true);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        setMessage('Not Send Post :(');
        setOpen(true);
      });
  };

  return (
    <>
      <form className={classes.root} noValidate autoComplete='off' onSubmit={handlePost}>
        <div>
          <TextField
            required
            id='standard-required'
            label='Title'
            fullWidth
            placeholder='Enter title...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id='standard-multiline-static'
            label='Body Post'
            multiline
            rows={4}
            fullWidth
            placeholder='Enter text...'
            value={bodyPost}
            onChange={(e) => setBodypost(e.target.value)}
            style={{ marginBottom: 20 }}
          />

          <Button type='submit' variant='contained' color='primary' fullWidth>
            Send New Post
          </Button>
        </div>
      </form>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <>
            <Button color='secondary' size='small' onClick={handleClose}></Button>

            <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
              <CloseIcon fontSize='small' />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export default NewPost;
