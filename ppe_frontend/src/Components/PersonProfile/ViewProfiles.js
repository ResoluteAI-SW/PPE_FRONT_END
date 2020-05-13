import React, { useContext, useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { db } from "../../FirebaseConfig";
import { UserContext } from "../AdminDashboard";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ViewProfiles() {
  const userDoc = useContext(UserContext);
  const [persons, setPersons] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    db.collection("people")
      .where("adminEmail", "==", userDoc.data().email)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) => {
          setPersons((persons) => persons.concat(doc.data()));
        })
      );
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Department</StyledTableCell>
            <StyledTableCell align="right">Hashtag</StyledTableCell>
            <StyledTableCell align="right">Blocked</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {persons.map((row) => (
            <StyledTableRow key={row.uuid}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.department}</StyledTableCell>
              <StyledTableCell align="right">{row.hashtag}</StyledTableCell>
              <StyledTableCell align="right">
                {row.blocked.toString()}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
