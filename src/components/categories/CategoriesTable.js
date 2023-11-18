import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';


export default function CategoriesTable({ categories, handleDelete, handleForm }) {
  const allCategories = categories?.map((catg) => (
    <TableRow
      key={catg.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" align='center'>
        {catg.id}
      </TableCell>
      <TableCell id={catg.name} align="center">{catg.name}</TableCell>
      <TableCell align="center">${catg.budget}</TableCell>
      <TableCell align="center">
        <Button variant="contained"
          size='small'
          sx={{ margin:1 }}
          color='warning'
          onClick={(e) => (handleForm(e, catg.id))}>
          EDIT
        </Button>
        <Button variant="contained"
          size='small'
          color='error'
          onClick={(e) => handleDelete(e, catg.id)}
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
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Budget</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Edit/Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCategories}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
};