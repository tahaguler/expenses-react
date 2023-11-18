import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';


export default function ExpensesTable({ expenses, handleDelete })  {
  console.log(expenses);
  const allExpenses = expenses?.map((expense) => (
    <TableRow
      key={expense.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" align='center'>
        {expense.id}
      </TableCell>
      <TableCell align="center">{expense.category}</TableCell>
      <TableCell align="center">${expense.price}</TableCell>
      <TableCell align="center">{expense.name}</TableCell>
      <TableCell align="center">
        <Button variant="contained"
          size='small'
          color='error'
          onClick={(e) => handleDelete(e, expense.id)}
        >X</Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Id</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Remove</TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {allExpenses}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
};