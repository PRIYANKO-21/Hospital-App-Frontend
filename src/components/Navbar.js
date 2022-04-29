import React, { useState,useEffect,useRef } from "react";
import "./navbar.css";


import { NavLink } from "react-router-dom";








const Navbar = () => {


  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  let cookie;

  const [adminLoginStatus,setAdminLoginStatus] = useState(false);
  const [doctorLoginStatus,setDoctorLoginStatus] = useState(false);
  const [nurseLoginStatus,setNurseLoginStatus] = useState(false);



  const [isLoggedIn,setLoggedInStatus] = useState(false);

  const [showMediaIcons, setShowMediaIcons] = useState(false);


  //useEffect is called during loading component,on changes to component and on leaving(unmounting) a component

  const isInitialMount = useRef(true);
  //Restricting useEffect to run only on updates except initial mount
  useEffect(() => {
    console.log("I am here");
    if (isInitialMount.current) {
      //findCookie();

      cookie = getCookie("admin_cookie");
      if(cookie==null){
        setAdminLoginStatus(false);
        cookie = getCookie("doctor_cookie");
        if(cookie==null){
          setDoctorLoginStatus(false);
          cookie = getCookie("nurse_cookie");
          if(cookie==null){
            setNurseLoginStatus(false);
          }
          else{
            setNurseLoginStatus(true);
          }
        }
        else{
          setDoctorLoginStatus(true);
        }
      } 
      else{
        setAdminLoginStatus(true);
      }

      isInitialMount.current = false;
    } else {
      // Your useEffect code here to be run on update
      //findCookie();
      cookie = getCookie("admin_cookie");
      if(cookie==null){
        setAdminLoginStatus(false);
        cookie = getCookie("doctor_cookie");
        if(cookie==null){
          setDoctorLoginStatus(false);
          cookie = getCookie("nurse_cookie");
          if(cookie==null){
            setNurseLoginStatus(false);
          }
          else{
            setNurseLoginStatus(true);
          }
        }
        else{
          setDoctorLoginStatus(true);
        }
      } 
      else{
        setAdminLoginStatus(true);
      }
    }
    if(!adminLoginStatus && !nurseLoginStatus && !doctorLoginStatus){
      setLoggedInStatus(false);
    }
    else{
      setLoggedInStatus(true);
    }
  });





  


  return !isLoggedIn ? (
    <>
      <nav className="main-nav">

        <div className="logo">
          <h2>
            <span>H</span>ospital
            <span>A</span>pp
          </h2>
        </div>


        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/login-doctor">Doctor Login</NavLink>
            </li>
            <li>
              <NavLink to="/login-admin">Admin Login</NavLink>
            </li>
            <li>
              <NavLink to="/create-login">Create Doctor Login</NavLink>
            </li>
            <li>
              <NavLink to="/register-doctor">Register Doctor</NavLink>
            </li>

          </ul>
        </div>
      </nav>
    </>
  ) : adminLoginStatus ? (
    <>
      <nav className="main-nav">

        <div className="logo">
          <h2>
            <span>H</span>ospital
            <span>A</span>pp
          </h2>
        </div>


        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/add-doctor">Add Doctor</NavLink>
            </li>

            <li>
              <NavLink to="/doctor-registration-requests">Registration Requests</NavLink>
            </li>

            <li>
              <NavLink to="/logout-admin">Logout</NavLink>
            </li>



          </ul>
        </div>
      </nav>
    </>
  ) : doctorLoginStatus ? (
    <>
      <nav className="main-nav">

        <div className="logo">
          <h2>
            <span>H</span>ospital
            <span>A</span>pp
          </h2>
        </div>


        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/granted-consents">Granted Consents</NavLink>
            </li>
            <li>
              <NavLink to="/request-consents">Request Consent</NavLink>
            </li>
            <li>
              <NavLink to="/add-record-initial">Add Record</NavLink>
            </li>

            <li>
              <NavLink to="/logout-doctor">Logout</NavLink>
            </li>            
          </ul>
        </div>
      </nav>
    </>
  ) : nurseLoginStatus ? (
    <>
      <nav className="main-nav">

        <div className="logo">
          <h2>
            <span>H</span>ospital
            <span>A</span>pp
          </h2>
        </div>


        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/login-doctor">Doctor Login</NavLink>
            </li>
            <li>
              <NavLink to="/login-admin">Admin Login</NavLink>
            </li>

          </ul>
        </div>
      </nav>
    </>
  ): (
    <>
      <h1>"Hello"</h1>
    </>
  );
  
  



};

export default Navbar;
