import { useState } from 'react';

// material-ui/core
import { TextField, makeStyles, Button, Snackbar, IconButton, Paper, Grid } from '@material-ui/core';

// material-ui/icons
import CloseIcon from '@material-ui/icons/Close';

// Http
import axios from 'axios';

// Set Style
const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', flexWrap: 'wrap' },
  textField: { marginLeft: theme.spacing(1), marginRight: theme.spacing(1), width: '25ch' },
  paper: { padding: theme.spacing(2), textAlign: 'center', color: theme.palette.text.secondary, marginTop: 50 },
  margin: { margin: theme.spacing(1) },
}));

const NewPost = () => {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [bodyPost, setBodypost] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [errorInput, setErrorInput] = useState({
    inputsAllErrors: false,
    inputsTitleError: false,
    inputsBodyError: false,
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handlePost = (e) => {
    e.preventDefault();

    if (!title && !bodyPost) {
      setErrorInput({ ...errorInput, inputsAllErrors: true });
      return;
    }

    if (!title) {
      setErrorInput({ ...errorInput, inputsTitleError: true });
      return;
    }

    if (!bodyPost) {
      setErrorInput({ ...errorInput, inputsBodyError: true });
      return;
    }

    const urlEndpoint = 'https://jsonplaceholder.typicode.com/posts';
    const data = { title, bodyPost };
    const headersConfig = {
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    };

    axios
      .post(urlEndpoint, data, headersConfig)
      .then((resp) => {
        // const data = resp.data;
        setTitle('');
        setBodypost('');
        setMessage('Send Post Ok!');
        setErrorInput({
          inputsAllErrors: false,
          inputsTitleError: false,
          inputsBodyError: false,
        });
        setOpen(true);
      })
      .catch((err) => {
        console.error(err);
        setMessage('Not Send Post :(');
        setOpen(true);
      });
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3} justify='center'>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <form noValidate autoComplete='off' onSubmit={handlePost}>
                <div>
                  <TextField
                    required
                    error={!title && (errorInput.inputsTitleError || errorInput.inputsAllErrors)}
                    helperText={!title && (errorInput.inputsTitleError || errorInput.inputsAllErrors) ? '*Required' : ''}
                    id='standard-required'
                    label='Title'
                    fullWidth
                    placeholder='Enter title...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={classes.margin}
                  />

                  <TextField
                    required
                    error={!bodyPost && (errorInput.inputsBodyError || errorInput.inputsAllErrors)}
                    helperText={!bodyPost && (errorInput.inputsBodyError || errorInput.inputsAllErrors) ? '*Required' : ''}
                    id='standard-multiline-static'
                    label='Body post'
                    multiline
                    rows={4}
                    fullWidth
                    placeholder='Enter text...'
                    value={bodyPost}
                    onChange={(e) => setBodypost(e.target.value)}
                    className={classes.margin}
                  />

                  <Button type='submit' variant='contained' color='primary' fullWidth className={classes.margin}>
                    Send New Post
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
