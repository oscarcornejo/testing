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
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: { width: '100%' },
  container: { maxHeight: 600, marginTop: 50 },
});

const columns = [
  { id: 'userId', label: 'userId', minWidth: 100, align: 'left' },
  { id: 'title', label: 'Title', minWidth: 100, align: 'left' },
  { id: 'body', label: 'Body', minWidth: 100, align: 'left' },
];

const ListPosts = () => {
  const classes = useStyles();
  let history = useHistory();

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
          setDataPosts(data);
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

  const handleDetailItem = (data) => {
    history.push({ pathname: `/post-detail/${data.id}`, state: { detail: data } });
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align='left' style={{ minWidth: 100 }}>
                View More
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dataPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={item.id}>
                  <TableCell align='left'>{item.userId}</TableCell>
                  <TableCell align='left'>{item.title}</TableCell>
                  <TableCell align='left'>{item.body}</TableCell>
                  <TableCell align='left'>
                    <IconButton aria-label='view-more' color='primary' onClick={() => handleDetailItem(item)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
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
