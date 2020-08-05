import React, { useEffect, useState, useContext } from "react";
import { rdb } from "../../FirebaseConfig";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { UserContext } from "../AdminDashboard";
import moment from "moment";
import Grid from "@material-ui/core/Grid";

import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MuiTableCell from '@material-ui/core/TableCell';

// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    minWidth: 400,
  },
}));

const StyledTableCell = withStyles({
  root: {
    borderBottom: 'none',
  },
})(MuiTableCell);

const dummyData = [
 
  {
    Name: 'akhil',
    Designation: 'Research',
    Department: '#employee',
    Login: '12:30 24/02/2020',
    Logout: '12:45 25/03/2020',
    Mask: 'Yes'

  },
  {
    Name: 'akhil',
    Designation: 'Research',
    Department: '#employee',
    Login: '12:30 24/02/2020',
    Logout: '12:45 25/03/2020',
    Mask: 'Yes'

  },
  {
    Name: 'akhil',
    Designation: 'Research',
    Department: '#employee',
    Login: '12:30 24/02/2020',
    Logout: '12:45 25/03/2020',
    Mask: 'Yes'

  },
  {
    Name: 'akhil',
    Designation: 'Research',
    Department: '#employee',
    Login: '12:30 24/02/2020',
    Logout: '12:45 25/03/2020',
    Mask: 'Yes'
  },

];

export default function AttendanceReports() {
  const classes = useStyles();

  const userDoc = useContext(UserContext);
  const [attendanceReports, setAttendanceReports] = useState(dummyData);
  const [frame, setFrame] = useState("");




  useEffect(() => {
    let socket = new WebSocket(
      "wss://facegenie.co/ws/responser/192.168.29.126/"
    );
    socket.onopen = () => {
      console.log("Connection Established");
    };
    socket.onmessage = (data) => {
      const obj = JSON.parse(data.data);
      console.log(obj.message.type);
      if (obj.message.type === "attendance_tracking") {
        setFrame(obj.message.frame);
      }
    };
    const todayDate = moment().format("DD MMM YYYY");
    console.log(todayDate);
    console.log(userDoc.id);
    rdb
      .ref(`/Attendance/${userDoc.id}/${todayDate}`)
      .on("value", (snapshot) => {
        setAttendanceReports([]);
        const collection = snapshot.val();
        for (const attendee in collection) {
          console.log(collection[attendee]);
          setAttendanceReports((attendanceReports) =>
            attendanceReports.concat(collection[attendee])
          );
        }
      });
  }, []);

  return (
    <div className={classes.paper} >
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div>
          {frame === "" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <VideocamOffIcon style={{ width: 300, height: 300 }} />
              <h4>Stream not available currently</h4>
            </div>
          ) : (
            <img
              src={frame}
              alt="Stream not available"
              style={{ width: 400, height: 500 }}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: 5,
          }}
        >
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Designation</StyledTableCell>
                <StyledTableCell align="right">Department</StyledTableCell>
                <StyledTableCell align="right">Login</StyledTableCell>
                <StyledTableCell align="right">Logout</StyledTableCell>
                <StyledTableCell align="right">Mask</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceReports.map((row) => (
                <StyledTableRow key={row.uuid}>
                  <StyledTableCell component="th" scope="row">
                    {row.Name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Designation}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Department}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.Login}</StyledTableCell>
                  <StyledTableCell align="right">{row.Logout}</StyledTableCell>
                  <StyledTableCell align="right">{row.Mask}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div> */}

      <Grid container component="main">
        <Grid item xs={false} sm={4} md={5}>
          {frame === "" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <VideocamOffIcon style={{ width: 300, height: 300 }} />
              <h4>Stream not available currently</h4>
            </div>
          ) : (
              <img
                src={frame}
                alt="Stream not available"
                style={{ width: 400, height: 500 }}
              />
            )}
        </Grid>
        <Grid item  md={7} elevation={6} >
          <div>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell >Designation</StyledTableCell>
                  <StyledTableCell >Department</StyledTableCell>
                  <StyledTableCell >Login</StyledTableCell>
                  <StyledTableCell >Logout</StyledTableCell>
                  <StyledTableCell >Mask</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {attendanceReports.map((row) => ( */}
                  <StyledTableRow >
                    <StyledTableCell component="th" scope="row">
                      Akhil
                    </StyledTableCell>
                    <StyledTableCell >
                      Employee
                    </StyledTableCell>
                    <StyledTableCell >
                      Software Development
                    </StyledTableCell>
                    <StyledTableCell>12:45</StyledTableCell>
                    <StyledTableCell >1:30</StyledTableCell>
                    <StyledTableCell >Yes</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow >
                    <StyledTableCell component="th" scope="row">
                      Akhil
                    </StyledTableCell>
                    <StyledTableCell >
                      Employee
                    </StyledTableCell>
                    <StyledTableCell >
                      Software Development
                    </StyledTableCell>
                    <StyledTableCell>12:45</StyledTableCell>
                    <StyledTableCell >1:30</StyledTableCell>
                    <StyledTableCell >Yes</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow >
                    <StyledTableCell component="th" scope="row">
                      Akhil
                    </StyledTableCell>
                    <StyledTableCell >
                      Employee
                    </StyledTableCell>
                    <StyledTableCell >
                      Software Development
                    </StyledTableCell>
                    <StyledTableCell>12:45</StyledTableCell>
                    <StyledTableCell >1:30</StyledTableCell>
                    <StyledTableCell >Yes</StyledTableCell>
                  </StyledTableRow>
                {/* ))} */}
              </TableBody>
              {/* <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={
                      filterOptionText === ''
                        ? trackLogs.length
                        : filteredTrackLogs.length
                    }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter> */}
            </Table>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

// function TablePaginationActions(props) {
//   const classes = useStyles1();
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onChangePage } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onChangePage(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onChangePage(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onChangePage(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <div className={classes.root}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label='first page'
//       >
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label='previous page'
//       >
//         {theme.direction === 'rtl' ? (
//           <KeyboardArrowRight />
//         ) : (
//             <KeyboardArrowLeft />
//           )}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label='next page'
//       >
//         {theme.direction === 'rtl' ? (
//           <KeyboardArrowLeft />
//         ) : (
//             <KeyboardArrowRight />
//           )}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label='last page'
//       >
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </div>
//   );
// }




//new code




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Typography from '@material-ui/core/Typography';
// import { Paper, Grid } from '@material-ui/core';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import TextField from '@material-ui/core/TextField';
// import moment from 'moment';
// import Button from '@material-ui/core/Button';
// import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableFooter from '@material-ui/core/TableFooter';
// import TablePagination from '@material-ui/core/TablePagination';
// import IconButton from '@material-ui/core/IconButton';
// import FirstPageIcon from '@material-ui/icons/FirstPage';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import LastPageIcon from '@material-ui/icons/LastPage';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import Collapse from '@material-ui/core/Collapse';
// import Box from '@material-ui/core/Box';
// import MuiTableCell from '@material-ui/core/TableCell';

// const useStyles = makeStyles({
//   root: {
//     minWidth: 275,
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

// const useStyles1 = makeStyles((theme) => ({
//   root: {
//     // flexShrink: 0,
//     display: 'flex',
//     width: 270,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// }));

// const useRowStyles = makeStyles({
//   root: {
//     '& > *': {
//       borderBottom: 'unset',
//     },
//   },
// });

// const StyledTableCell = withStyles({
//   root: {
//     borderBottom: 'none',
//   },
// })(MuiTableCell);

// const dummyData = [
//   {
//     unknownID: 'akhil',
//     IPAddress: 'Research',
//     Department: '#employee',
//     Detected: 'no',

//   },
//   {
//     unknownID: 'akhil',
//     IPAddress: 'Research',
//     Department: '#employee',
//     Detected: 'no',

//   },
//   {
//     unknownID: 'akhil',
//     IPAddress: 'Research',
//     Department: '#employee',
//     Detected: 'no',

//   },
//   {
//     unknownID: 'akhil',
//     IPAddress: 'Research',
//     Department: '#employee',
//     Detected: 'no',
//   },

// ];
// // for testing purpose

// export default function IntrusionSummary(props) {
//   const [filterOption, setFilterOption] = useState('Name');
//   const [filterOptionText, setFilterOptionText] = useState('');
//   const [trackLogs, setTrackLogs] = useState(dummyData);
//   // change dummyData to [] inside trackLogs default value.
//   const [filteredTrackLogs, setFilteredTrackLogs] = useState([]);
//   const [unknown, setUnknown] = useState(null);
//   const [checkout, setCheckout] = useState([]);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [page, setPage] = React.useState(0);
//   const [open, setOpen] = React.useState(false);
//   const [expandRow, setExpandRow] = React.useState(-1);
//   const classes = useStyles();
//   const classes1 = useRowStyles();

//   const handleFilterTextChange = (event) => {
//     setFilterOptionText(event.target.value);
//     const filteredTrackLogs = trackLogs.filter(
//       (log) => log[filterOption].indexOf(event.target.value) !== -1
//     );
//     setFilteredTrackLogs(filteredTrackLogs);
//   };

//   useEffect(() => {
//     axios
//       .post('http://localhost:5000/unknown')
//       .then((res) => {
//         console.log(res);
//         console.log(res.data.data);
//         const unknownLogsData = res.data.data;
//         for (let i = 0; i < unknownLogsData.length; i++) {
//           axios
//             .post('http://localhost:5000/unknowndetails', {
//               unknownID: unknownLogsData[i].unknownID,
//             })
//             .then((res) => {
//               let obj = unknownLogsData[i];
//               // console.log(res.data);
//               // setLogs(res.data.data);
//               const logsOfUnknown = res.data.data;
//               // console.log(logsOfUnknown[0].Department);
//               obj.frequentDepartment = logsOfUnknown[0].Department;
//               obj.timesVisited = logsOfUnknown.length;
//               obj.firstVisitedDate = moment(
//                 logsOfUnknown[logsOfUnknown.length - 1].Timestamp
//               ).format('MMMM Do YYYY');
//               setTrackLogs((trackLogs) => trackLogs.concat(obj));
//               // const frequentPlaces = res.data.data[0].Department;
//               // setFrequentPlace(frequentPlaces);
//             });
//         }
//         // setTrackLogs(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     if (props.socket) {
//       console.log('testing in table comp');
//     }
//     // props.socket.on(
//     //   'unknown',
//     //   (data) => (filterOptionText === '' ? setTrackLogs(data.summaries) : null),
//     //   console.log(trackLogs),
//     //   console.log('new daata')
//     // );
//   }, []);

//   const backToSummaries = () => {
//     setUnknown(null);
//   };



//   // useEffect(() => {
//   //     let data = {
//   //         vID: checkout
//   //     };
//   //     console.log(data)
//   //         console.log(checkout);
//   //         axios
//   //             .post("http://localhost:5000/bye", {
//   //                 vID: checkout,
//   //             })
//   //             .then((res) => {
//   //                 //   setData(res.data);
//   //                 console.log(data)
//   //                 // alert("checked out visitor: " + data.vID)
//   //             })
//   //             .catch(err => {
//   //                 console.log(err)
//   //             });

//   // }, [checkout]);

//   // const baseUrl = "http://localhost:5000/bye"

//   const tableHeadings = [
//     'Thumbnail',
//     'Name',
//     'Department',
//     'Hashtag',
//     'Blocked',
//   ];

//   const emptyRows =
//     rowsPerPage -
//     Math.min(
//       rowsPerPage,
//       filterOptionText === ''
//         ? trackLogs.length - page * rowsPerPage
//         : filteredTrackLogs.length - page * rowsPerPage
//     );

//   console.log(trackLogs);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <div >
//       <h1 style={{ marginBottom: "2%", marginTop: "2%" }}>Employee Profiles</h1>
//       <React.Fragment>
//         {/* <Grid container style={{ marginBottom: '10px' }}>
//           <Grid item xs={6}></Grid>
//           <div></div>
//         </Grid>
//         <Grid container style={{ marginBottom: '10px' }}>
//           <div></div>
//         </Grid> */}
//         <Table aria-label='simple table' >
//           <TableHead>
//             <TableRow>
//               {tableHeadings.map((heading, index) =>
//                 index === tableHeadings.length - 1 ? (
//                   <TableCell align='center'>
//                     <b style={{ color: '5A1111' }}>{heading}</b>
//                   </TableCell>
//                 ) : (
//                     <TableCell align='center'>
//                       <b>{heading}</b>
//                     </TableCell>
//                   )
//               )}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filterOptionText === ''
//               ? (rowsPerPage > 0
//                 ? trackLogs.slice(
//                   page * rowsPerPage,
//                   page * rowsPerPage + rowsPerPage
//                 )
//                 : trackLogs
//               ).map((row, index) => (
//                 <React.Fragment>
//                   <TableRow key={row.unknownID} className={classes1.root}>
//                     <TableCell align='center'>
//                       <img
//                         src='https://picsum.photos/33'
//                         // src="https://picsum.photos/33"
//                         alt='Loading'
//                         style={{
//                           width: '33px',
//                           height: '33px',
//                           borderRadius: '50%',
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align='center'>{row.unknownID}</TableCell>
//                     <TableCell align='center'>{row.IPAddress}</TableCell>
//                     <TableCell align='center'>{row.Department}</TableCell>
//                     <TableCell align='center'>
//                       {row.Detected}
//                     </TableCell>

//                   </TableRow>

//                 </React.Fragment>
//               ))
//               : (rowsPerPage > 0
//                 ? filteredTrackLogs.slice(
//                   page * rowsPerPage,
//                   page * rowsPerPage + rowsPerPage
//                 )
//                 : filteredTrackLogs
//               ).map((row, index) => (
//                 <React.Fragment>
//                   <TableRow
//                     key={row.unknownID}
//                     hover
//                   // onClick={() => {
//                   //   rowClicked(row.unknownID);
//                   // }}
//                   >
//                     <TableCell align='center'>
//                       <img
//                         src={`https://fgbe002dev.facegenie.co/media/unknown/${row.unknownID}/1.jpg`}
//                         alt='Loading'
//                         style={{
//                           width: '40px',
//                           height: '50px',
//                           borderRadius: 10,
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align='center'>{row.unknownID}</TableCell>
//                     <TableCell align='center'>{row.IPAddress}</TableCell>
//                     <TableCell align='center'>{moment(row.Department).format('lll')}</TableCell>
//                     <TableCell align='center'>
//                       {row.Department}
//                     </TableCell>
//                     <TableCell>
//                       <IconButton
//                         aria-label='expand row'
//                         size='small'
//                         onClick={() => {
//                           setExpandRow(index);
//                           setOpen(!open);
//                         }}
//                       >
//                         {open ? (
//                           <KeyboardArrowUpIcon />
//                         ) : (
//                             <KeyboardArrowDownIcon />
//                           )}
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell
//                       style={{ paddingBottom: 0, paddingTop: 0 }}
//                       colSpan={6}
//                     >
//                       <Collapse
//                         in={open && index === expandRow}
//                         timeout='auto'
//                         unmountOnExit
//                       >
//                         <div
//                           style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             marginBottom: 10,
//                           }}
//                         >
//                           <img
//                             // src={`http://127.0.0.1:8000/media/unknown/${row.unknownID}/1.jpg`}
//                             src={`https://fgbe002dev.facegenie.co/media/unknown/${row.unknownID}/1.jpg`}
//                             src='https://picsum.photos/122'
//                             alt='Loading'
//                             style={{
//                               width: '122px',
//                               height: '122px',
//                               marginRight: 30,
//                             }}
//                           />
//                           <div>
//                             <Table>
//                               <TableRow>
//                                 <StyledTableCell>
//                                   <h1>
//                                     <b>{row.unknownID}</b>
//                                   </h1>
//                                 </StyledTableCell>
//                               </TableRow>
//                               <TableRow>
//                                 <StyledTableCell>
//                                   <h3>
//                                     <b style={{ color: '#FFA4A8' }}>
//                                       {row.timesVisited}
//                                     </b>
//                                   </h3>
//                                 </StyledTableCell>
//                                 <StyledTableCell>
//                                   <h3>
//                                     <b style={{ color: '#FFA4A8' }}>
//                                       {row.firstVisitedDate}
//                                     </b>
//                                   </h3>
//                                 </StyledTableCell>
//                                 <StyledTableCell>
//                                   <h3>
//                                     <b style={{ color: '#FFA4A8' }}>
//                                       {row.frequentDepartment}
//                                     </b>
//                                   </h3>
//                                 </StyledTableCell>
//                               </TableRow>
//                               <TableRow>
//                                 <StyledTableCell>
//                                   <h4>Times Visited</h4>
//                                 </StyledTableCell>
//                                 <StyledTableCell>
//                                   <h4>First time visited</h4>
//                                 </StyledTableCell>
//                                 <StyledTableCell>
//                                   <h4>Most Visited</h4>
//                                 </StyledTableCell>
//                               </TableRow>
//                             </Table>
//                           </div>
//                         </div>
//                       </Collapse>
//                     </TableCell>
//                   </TableRow>
//                 </React.Fragment>
//               ))}
//             {emptyRows > 0 && (
//               <TableRow style={{ height: 53 * emptyRows }}>
//                 <TableCell colSpan={6} />
//               </TableRow>
//             )}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//                 colSpan={3}
//                 count={
//                   filterOptionText === ''
//                     ? trackLogs.length
//                     : filteredTrackLogs.length
//                 }
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 SelectProps={{
//                   inputProps: { 'aria-label': 'rows per page' },
//                   native: true,
//                 }}
//                 onChangePage={handleChangePage}
//                 onChangeRowsPerPage={handleChangeRowsPerPage}
//                 ActionsComponent={TablePaginationActions}
//               />
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </React.Fragment>
//       {/* <CardActions>
//                     <Button size="small">Learn More</Button>
//                 </CardActions> */}
//     </div>
//   );
// }


