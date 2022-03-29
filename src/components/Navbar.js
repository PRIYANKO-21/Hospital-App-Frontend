import React, { useState } from "react";
import "./navbar.css";


import { NavLink } from "react-router-dom";



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




const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  //if(isLoggedIn){
    return (
      <>
        <nav className="main-nav">
          {/* 1st logo part  */}
          <div className="logo">
            <h2>
              <span>H</span>ospital
              <span>A</span>pp
            </h2>
          </div>
  
          {/* 2nd menu part  */}
          <div
            className={
              showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
            }>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/login-admin">Admin Login</NavLink>
              </li>
              <li>
                <NavLink to="/add-doctor">Add Doctor</NavLink>
              </li>
              <li>
                <NavLink to="/register-doctor">Register Doctor</NavLink>
              </li>
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
              <li>
                <NavLink to="/logout-admin">Admin Logout</NavLink>
              </li>
            </ul>
          </div>
  
          
        </nav>
      </>
    );
  //}
/*   else{
    return (
      <>
        <nav className="main-nav">
          
          <div className="logo">
            <h2>
              <span>P</span>atient
              <span>A</span>pp
            </h2>
          </div>
  
          
          <div
            className={
              showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
            }>
            <ul>

              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>

            </ul>
          </div>
  
          
        </nav>
      </>
    );
  }*/

};

export default Navbar;
