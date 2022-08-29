import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(seq, name, email, paid, rights) {
  return { seq, name, email, paid, rights };
}

const studentColumnName = ["序號", "名字", "EMAIL", "繳費金額", "學生權限"];

const rows = [
  createData(1, "Student1", "@mail.com", "1 BTC", "VIP"),
  createData(2, "Student2", "@mail.com", "1 ETH", "None"),
  createData(3, "Student3", "@mail.com", "1 Doge", "None"),
];

export default function StudentListTable() {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {studentColumnName.map((item, index) => {
              const align = index === 0 ? "left" : "right";
              return <TableCell align={align}>{item}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.seq}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.paid}</TableCell>
              <TableCell align="right">{row.rights}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
