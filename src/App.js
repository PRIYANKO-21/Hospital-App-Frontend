import React from "react";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import DoctorLoginPage from './components/doctorLogin.js';
import DoctorRegistrationPage from './components/doctorRegistration';
import { Redirect } from 'react-router';
import AdminLoginPage from './components/adminLogin';
import AddDoctorPage from './components/addDoctor';

let isLoggedIn = false;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

let cookie = getCookie("patient_cookie"); 
if(cookie!=null){
  isLoggedIn = true;
  //alert("cookie there");
}
else{
  isLoggedIn = false;
}



const Home = () => {

  return (
    <>
      <Navbar />
      <section className="hero-section">
        <h1>Hospital App Home Page</h1>
      </section>
    </>
  );
};

const LoginDoctor = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <DoctorLoginPage/>
      </section>
    </>
  );
};

const AdminLogin = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <AdminLoginPage/>
      </section>
    </>
  );
};

const AddDoctor = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <AddDoctorPage/>
      </section>
    </>
  );
};


const DoctorRegister= () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <DoctorRegistrationPage/>
      </section>
    </>
  );
};

const Logout= () => {
  document.cookie = "patient_cookie" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  
  return <Redirect to = {{ pathname: "/login-doctor" }} />;
  
};

const AdminLogout= () => {
  document.cookie = "admin_cookie" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  
  return <Redirect to = {{ pathname: "/login-admin" }} />;
  
};


const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/login-doctor">
        <LoginDoctor />
      </Route>

      <Route path="/login-admin">
        <AdminLogin />
      </Route>

      <Route path="/add-doctor">
        <AddDoctor />
      </Route>

      <Route path="/register-doctor">
        <DoctorRegister />
      </Route>

      <Route path="/logout">
        <Logout />
      </Route>

      <Route path="/logout-admin">
        <AdminLogout />
      </Route>
    </Switch>
  );
};

export default App;
