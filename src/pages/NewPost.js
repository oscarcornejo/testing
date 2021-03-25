import { useState } from 'react';

// material-ui/core
import { TextField, makeStyles, Button, Snackbar, IconButton, Paper, Grid, CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

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
  wrapper: { margin: theme.spacing(1), position: 'relative' },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
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
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handlePost = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title && !bodyPost) {
      setErrorInput({ ...errorInput, inputsAllErrors: true });
      setLoading(false);
      return;
    }

    if (!title) {
      setErrorInput({ ...errorInput, inputsTitleError: true });
      setLoading(false);
      return;
    }

    if (!bodyPost) {
      setErrorInput({ ...errorInput, inputsBodyError: true });
      setLoading(false);
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

        setMessage('Send Post Ok!');
        setErrorInput({
          inputsAllErrors: false,
          inputsTitleError: false,
          inputsBodyError: false,
        });

        setTimeout(() => {
          setTitle('');
          setBodypost('');
          setOpen(true);
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        setMessage('Not Send Post :(');
        setOpen(true);
        setLoading(false);
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

                  <div className={classes.wrapper}>
                    <Button type='submit' disabled={loading} variant='contained' color='primary' fullWidth className={classes.margin}>
                      Send New Post
                    </Button>

                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
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
