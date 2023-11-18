import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import Button from '@mui/material/Button';
import {  Grid } from '@mui/material';

export default function ExpenseForm({
    categories,
    users,
    handleChange,
    addExpenseObj,
    handleAdd }) {
    const categoryList = categories.map((c, id) =>
        <MenuItem key={id} value={c.id}>{c.name}</MenuItem>);

    const usersList = users.map((u, id) =>
        <MenuItem key={id} value={u.id}>{u.name}</MenuItem>);

    return (
        <>
            <FormControl sx={{ m: 1 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    label="Category"
                    name='categoryid'
                    value={addExpenseObj.categoryid || ''}
                    onChange={(e) => handleChange(e)}>
                    {categoryList}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="filled">
                <InputLabel>Amount</InputLabel>
                <FilledInput
                    value={addExpenseObj.price || ''}
                    name="price"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    onChange={(e) =>handleChange(e)}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={6} md={6} lg={6}>
                        <InputLabel>User</InputLabel>
                        <Select
                            label="User"
                            fullWidth
                            value={addExpenseObj.userid || ''}
                            name="userid"
                            onChange={(e) => handleChange(e)}>
                            {usersList}
                        </Select>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Button fullWidth sx={{ height: 54 }}
                            variant="contained"
                            onClick={(e) => handleAdd(e)}>Add!</Button>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    )
}