import React, { useState, useEffect } from "react";
import axios from "axios";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Moment from "moment";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.common.black,
    fontSize: 16,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  Container: {
    padding: theme.spacing(5),
  },
  tableContainer: {
    maxHeight: 500,
    maxWidth: 200,
  },
  AppBarDiv: {
    display: "flex",
    justifyContent: "spaceBetween",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    // flexShrink: 0,
    display: "flex",
    width: 270,
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function IPtable(props) {
  const { PointOfCamera, Hashtag } = props;
  const [data, setData] = useState([]);
  const [deleteData, setDeletedata] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  // const [editData, setEditdata] = useState("")
  // const [editipDetails, setEditipdetails] = useState();
  // const [showAddIPconfig, setShowaddipconfig] = useState(false);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/")
  // })

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  useEffect(() => {
    axios
      .get("http://localhost:5000/createipcamera")
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (props.socket) {
      console.log("testing in table comp");
      props.socket.on("IPtable", (data) => setData(data));
    }
    // props.socket.on("IPtable", (data) =>
    //     data === "" ? setData(data) : null
    // );
  }, []);

  useEffect(() => {
    let data = {
      PointOfCamera: PointOfCamera,
      Hashtag: Hashtag,
    };
    if (deleteData.toString().localeCompare("") !== 0) {
      console.log(deleteData);
      axios
        .post("http://localhost:5000/deleteip", {
          IPAddress: deleteData,
          PointOfCamera: PointOfCamera,
          Hashtag: Hashtag,
        })
        .then((res) => {
          // setData(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [deleteData, PointOfCamera, Hashtag]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <div style={{ marginTop: "2%"}}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>

              <StyledTableCell align='left' style={{ color: 'red' }}>
                IP Address
              </StyledTableCell>
              <StyledTableCell align='left' style={{ color: 'red' }}>
                Location
              </StyledTableCell>
              <StyledTableCell align='left' style={{ color: 'red' }}>
                Hashtag
              </StyledTableCell>
              <StyledTableCell align='left' style={{ color: 'red' }}>
                Time Logged
              </StyledTableCell>
              <StyledTableCell align='left' style={{ color: 'red' }}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row) => (
              <StyledTableRow key={row.ID}>
                <StyledTableCell align="left">{row.IPAddress}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.PointOfCamera}
                </StyledTableCell>
                <StyledTableCell align="left">{row.Hashtag}</StyledTableCell>
                <StyledTableCell align="left">
                  {(row.Timelogged = Moment(data.Ventry).format("lll"))}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Grid container>
                    {/* <Grid item xs={6}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              setEditdata(row.IPAddress, row.PointOfCamera, row.Hashtag);
                            }}
                          >
                            Edit
                          </Button>
                        </Grid> */}
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setDeletedata(
                            row.IPAddress,
                            row.PointOfCamera,
                            row.Hashtag
                          );
                        }}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </React.Fragment>
  );
}

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
