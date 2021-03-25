import { useEffect, useState } from 'react';

// react-router-dom
import { useHistory, useParams } from 'react-router-dom';

// material-ui/core
import { Grid, Paper, Typography, Button, makeStyles, CircularProgress } from '@material-ui/core';

// Http
import axios from 'axios';

// Set Style
const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  paper: { padding: theme.spacing(2), margin: 'auto', maxWidth: 650, marginTop: 50 },
}));

const PostDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [dataDetail, setDataDetail] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDetailPost = () => {
      setLoading(true);

      const urlEndpoint = `https://jsonplaceholder.typicode.com/posts/${id}`;

      axios
        .get(urlEndpoint)
        .then((resp) => {
          setDataDetail(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    getDetailPost();
  }, [id]);

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid item xs>
                {loading ? (
                  <CircularProgress />
                ) : Object.keys(dataDetail).length === 0 ? (
                  '¡Oops! Post not found.'
                ) : (
                  <>
                    <Typography gutterBottom variant='subtitle1'>
                      {dataDetail.title}
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      {dataDetail.body}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {!dataDetail.userId ? '' : `User ID: ${dataDetail.userId}`}
                    </Typography>
                  </>
                )}
              </Grid>

              <Grid item>
                <Button onClick={goBack} variant='contained'>
                  <Typography variant='body2' style={{ cursor: 'pointer' }}>
                    Go Back
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PostDetail;
