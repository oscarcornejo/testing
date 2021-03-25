import { useEffect, useState } from 'react';

// react-router-dom
import { useHistory, useLocation } from 'react-router-dom';

// material-ui/core
import { Grid, Paper, Typography, Button, makeStyles } from '@material-ui/core';

// Set Style
const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  paper: { padding: theme.spacing(2), margin: 'auto', maxWidth: 650, marginTop: 50 },
}));

const PostDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [dataDetail, setDataDetail] = useState({});

  useEffect(() => {
    if (location.state) {
      setDataDetail(location?.state.detail);
    }
  }, [location.state]);

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
                {!dataDetail.userId ? (
                  '¡Oops! Post not found'
                ) : (
                  <>
                    <Typography gutterBottom variant='subtitle1'>
                      {dataDetail.title}
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      {dataDetail.body}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {`User ID: ${dataDetail.userId}`}
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
