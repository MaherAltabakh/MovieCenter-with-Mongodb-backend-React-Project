import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./components/Movies.jsx";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import ProtectedRoutes from "./components/common/protectedRoute.jsx";

import auth from "./services/authService.js";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />}></Route>
            <Route path="/movies" element={<Movies user={user} />}></Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/movies/:id" element={<MovieForm />} />
            </Route>
            <Route path="/customers" element={<Customers />}></Route>
            <Route path="/rentals" element={<Rentals />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/register" element={<RegisterForm />}></Route>
            <Route path="/not-found" element={<NotFound />}></Route>
            <Route path="*" element={<Navigate to="/not-found" />}></Route>
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
