import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from 'react-router-dom'

function App() {
  // true : load the data using useEffect while landing dashboard
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // cehck the user login / logout
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          // to make sure user is logout if any exception happens
          dispatch(logout());
        }
      })
      // reinitalize in every situation
      .finally(() => setLoading(false));
  }, []);

  // conditional return
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
