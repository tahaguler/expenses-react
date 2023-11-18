import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

export default function CategoriesForm({
    handleChange,
    addCategoryObj,
    handleAdd }) {
    return (
        <>
            <FormControl sx={{ m: 1 }} variant="filled">
                <InputLabel>Name</InputLabel>
                <FilledInput
                id='categories-form-name'
                    value={addCategoryObj.name || ''}
                    name="name"
                    onChange={(e) => handleChange(e)}/>
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="filled">
                <InputLabel>Budget Amount</InputLabel>
                <FilledInput
                    value={addCategoryObj.budget || ''}
                    name="budget"
                    id='categories-form-budget'
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    onChange={(e) => handleChange(e)}/>
            </FormControl>
            <FormControl sx={{ m: 1 }}>
                <Grid container spacing={1}>

                    <Grid item xs={6} md={6} lg={6}>
                        <Button fullWidth sx={{ height: 54 }}
                            variant="contained"
                            id='category-add-button'
                            className='category-add-button'
                            onClick={(e) => handleAdd(e)}>Add!</Button>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    )
}