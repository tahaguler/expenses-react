import ExpensesTable from '../components/expenses/ExpensesTable';
import ExpensesForm from '../components/expenses/ExpensesForm';
import React from "react";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Container, } from '@mui/material';

const backendApiUrl = 'http://localhost:3001';

export default function Expenses({ expenses, categories, users, setExpenses }) {
  const [addExpense, setAddExpense] = useState('');

  async function createExpense(e) {
    e.preventDefault();

    let expenseToCreate = addExpense;

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseToCreate),
    };

    try {
      const res = await fetch(backendApiUrl + `/api/expenses`, options);
      const data = await res.json();
      setExpenses([...expenses, data]);
      setAddExpense({
        categoryid: '',
        price: '',
        userid: ''
      });

    } catch (error) {
      console.log(error);
    }

  }
  async function deleteExpense(event, id) {
    event.preventDefault();

    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    try {
      await fetch(backendApiUrl + `/api/expenses/${id}`, options);
      let newExpensesArray = [...expenses];
      let itemToDelete = newExpensesArray.findIndex((item) => item.id === id);
      newExpensesArray.splice(itemToDelete, 1);
       setExpenses(newExpensesArray);
      //sumExpenseCategory();

    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeInForm(e) {
    let newAddExpense = {};
    newAddExpense[e.target.name] = e.target.value;
    setAddExpense({ ...addExpense, ...newAddExpense });
  }

  function allObjectsFilled() {
    let objectsFilled = (
      expenses.length > 0 &&
      categories.length > 0 &&
      users.length > 0);
    return objectsFilled;
  }

  return allObjectsFilled() ? (
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
                  Expenses
                </Typography>
                <Typography variant="p" component="p" sx={{ alignContent: 'center', fontWeight: 'bold' }}>
                  You can add expenses you made here!
                </Typography>
              </Paper>
            </Grid>
            {/* Add Expense */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}>
                <ExpensesForm
                  handleChange={handleChangeInForm}
                  addExpenseObj={addExpense}
                  handleAdd={createExpense}
                  categories={categories} users={users} />
              </Paper>
            </Grid>
            {/* List of Expenses */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <ExpensesTable expenses={expenses} handleDelete={deleteExpense} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  ) : null;
};