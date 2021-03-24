import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function createData(userId, body, title) {
  return { userId, body, title };
}

const ListPosts = () => {
  const classes = useStyles();

  const [dataPosts, setDataPosts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getPost = () => {
      const urlEndpoint = 'https://jsonplaceholder.typicode.com/posts';
      axios
        .get(urlEndpoint)
        .then((resp) => {
          const data = resp.data;
          console.log(data);
          //   setDataPosts(data);
          const newData = data.map((item) => {
            return createData(item.userId, item.body, item.title);
          });

          setDataPosts(newData);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getPost();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table className={classes.table} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>UserId</TableCell>
              <TableCell align='center'>Title</TableCell>
              <TableCell align='center'>Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataPosts.map((row) => (
              <TableRow key={row.id}>
                <TableCell align='left'>{row.userId}</TableCell>
                <TableCell align='left'>{row.title}</TableCell>
                <TableCell align='left'>{row.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={dataPosts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ListPosts;
