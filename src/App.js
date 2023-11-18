import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect } from 'react';
import React from "react";
import AppNavBar from "./components/AppNavBar";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Categories from "./pages/Categories";

const backendApiUrl = 'http://localhost:3001';
function App() {
  const [categories, setCategories] = useState({});
  const [users, setUsers] = useState({});
  const [expenses, setExpenses] = useState({});

  const fetchExpenses = async () => {
    const res = await fetch(backendApiUrl + `/api/expenses`);
    const resJson = await res.json();
    setExpenses(resJson);
  }
  const fetchCategories = async () => {
    const res = await fetch(backendApiUrl + `/api/categories`);
    const resJson = await res.json();
    setCategories(resJson);
  }

  const fetchUsers = async () => {
    const res = await fetch(backendApiUrl + `/api/users`);
    const resJson = await res.json();
    setUsers(resJson);
  }
  useEffect(() => {
    fetchExpenses()
    fetchCategories()
    fetchUsers()
  }, [])

  return (
    <>
      <Router>
        <AppNavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="expenses" element={<Expenses setExpenses={setExpenses} expenses={expenses} categories={categories} users={users} />} />
          <Route path="categories" element={<Categories categories={categories} fetchCategories={fetchCategories}  setCategories={setCategories}/>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
