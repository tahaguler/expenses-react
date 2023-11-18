import CategoriesTable from '../components/categories/CategoriesTable';
import CategoriesForm from '../components/categories/CategoriesForm';
import React from "react";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Container, } from '@mui/material';
import {FilledInput, FormControl, InputLabel, InputAdornment, Button } from '@mui/material';
const backendApiUrl = 'http://localhost:3001';

export default function Categories({ categories, setCategories, fetchCategories}) {
  const [addCategory, setAddCategory] = useState('');
  const [categoryToUpdate, setCategoryToUpdate] = useState({});

  async function createCategory(e) {
    e.preventDefault();

    let categoryToCreate = addCategory;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryToCreate),
    };
    try {
      const res = await fetch(backendApiUrl + `/api/categories`, options);
      const data = await res.json();
      setCategories([...categories, data]);
      fetchCategories();
      setAddCategory({
        name: '',
        budget: ''
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Update a category
  async function updateCategory(e) {
    e.preventDefault();

    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(categoryToUpdate)
    };
    try {
      await fetch(backendApiUrl + `/api/categories/${categoryToUpdate.id}`, options);
      setCategoryToUpdate({
        name: "",
        budget: ""
      });
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteCategory(event, id) {
    event.preventDefault();

    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    try {
      await fetch(backendApiUrl + `/api/categories/${id}`, options);
      let newCategories = [...categories];
      let itemToDelete = newCategories.findIndex((item) => item.id === id);
      newCategories.splice(itemToDelete, 1);
      setCategories(newCategories);
      fetchCategories();

    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangeCategoryToUpdate(e) {
    let categoryUpdateCopy = { ...categoryToUpdate };
    categoryUpdateCopy[e.target.name] = e.target.value;
    console.log(categoryUpdateCopy);
    setCategoryToUpdate(categoryUpdateCopy);
  }

  function handleToggleUpdateForm(e, id) {
    const toUpdate = categories.filter((item) => item.id === id);
    console.log("Item that will be update", toUpdate)
    setCategoryToUpdate(toUpdate[0]);
  }

  function handleChangeInForm(e) {
    let newAddCategory = {};
    newAddCategory[e.target.name] = e.target.value;
    setAddCategory({ ...addCategory, ...newAddCategory });
  }



  return categories.length > 0 ? (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}>
                <Typography variant="h6" component="h1" sx={{ alignContent: 'center', fontWeight: 'bold' }}>
                  CATEGORIES
                </Typography>
              </Paper>
            </Grid>
            {/* Add Category */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}>
                <CategoriesForm
                  handleChange={handleChangeInForm}
                  addCategoryObj={addCategory}
                  handleAdd={createCategory} />
              </Paper>
            </Grid>
            {/* List of Categories */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <CategoriesTable handleForm={handleToggleUpdateForm} categories={categories} handleDelete={deleteCategory} />
              </Paper>
            </Grid>

          </Grid>
          {/* Category Update Form */}
          <Grid item xs={6} md={6} lg={6}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" component="h1">
                Edit Category
              </Typography>
              <FormControl sx={{ m: 1 }} variant="filled">
                <InputLabel shrink={true}>Category Name</InputLabel>
                <FilledInput
                  label="Category Name"
                  onChange={(e) => handleChangeCategoryToUpdate(e)}
                  // disabled={true} 
                  value={categoryToUpdate.name || ''}
                  name="name"
                />
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="filled">
                <Grid container spacing={1}>
                  <Grid item xs={6} md={6} lg={6}>
                    <InputLabel>Budget</InputLabel>
                    <FilledInput
                      label="Budget"
                      value={categoryToUpdate.budget || ''}
                      name="budget"
                      onChange={(e) => handleChangeCategoryToUpdate(e)}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>} />
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <Button fullWidth sx={{ height: 54 }}
                      onClick={(e) => updateCategory(e)}
                      variant="contained">
                      EDIT!
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>

            </Paper>
          </Grid>
        </Container>
      </Box>
    </>
  ) : null;
};