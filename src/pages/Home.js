import React from "react";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const backendApiUrl = 'http://localhost:3001';

const Home = () => {
  const [sumCategory, setSumCategory] = useState('');



  const GetSumCategories = async () => {
    try {
      const res = await fetch(backendApiUrl + `/api/categories/sum`);
      const data = await res.json();
      setSumCategory([...sumCategory, data]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => { GetSumCategories() }, [])
  const barChart = sumCategory ? (<BarChart
    dataset={sumCategory[0]}
    xAxis={[
      {
        id: 'barCategories',
        dataKey: 'category',
        scaleType: 'band',
      },
    ]}
    series={[
      {
        dataKey: 'total', label: 'Total Spent for each Category'
      },
    ]}
    width={550}
    height={200}
  />) : <p>data not found</p>


  const chartSetting = {
    xAxis: [
      {
        label: '$ Amount',
      },
    ],
    width: 500,
    height: 400,
  };
  const dataset = [
    {
      bankAccount: "BofA",
      amount: 1500,
    },
    {
      bankAccount: "Chase",
      amount: 5000,
    },
    {
      bankAccount: "Discover",
      amount: 100,
    },
  ];

  const valueFormatter = (value) => `$${value}`;


  return (
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
                  Micronomy
                </Typography>
                <Typography variant="p" component="p" sx={{ alignContent: 'center', fontWeight: 'bold' }}>
                  Tool for all your household finance needs
                </Typography>
              </Paper>
            </Grid>
            {/* Bar Chart */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}>
                {barChart}
              </Paper>
            </Grid>
            {/* List of Expenses */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <BarChart
                sx={{ m:1 }} 
                  dataset={dataset}
                  yAxis={[{ scaleType: 'band', dataKey: 'bankAccount' }]}
                  series={[{ dataKey: 'amount', label: 'Bank Balances', valueFormatter }]}
                  layout="horizontal"
                  {...chartSetting}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;