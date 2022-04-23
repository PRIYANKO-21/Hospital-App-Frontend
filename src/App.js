import React, { useState,useEffect,useRef } from "react";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import DoctorLoginPage from './components/doctorLogin.js';
import DoctorRegistrationPage from './components/doctorRegistration';
import { Redirect } from 'react-router';
import AdminLoginPage from './components/adminLogin';
import AddDoctorPage from './components/addDoctor';
import GrantedConsentPage from './components/grantedConsents';
import RequestConsentPage from './components/requestConsent';
import ViewEHR from './components/viewEHR';
import CreateDoctorLoginPage from './components/createDoctorLogin';
import DelegateConsentPage from "./components/delegateConsent";
import VerifyOtpPage from './components/otpVerification';
import AddRecordsInitialPage from './components/Addrecord_send_otp';
import VerifyOtptoAddrecordsPage from './components/otp_verification_to_add_records';
import AddRecordsPage from './components/addrecord';
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


const CreateDoctorLogin = (props) => {
  return(
    <>
      <Navbar />
      <section className="hero-section">
        <CreateDoctorLoginPage/>
      </section>
    </>
  )
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


const GrantedConsent= () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <GrantedConsentPage/>
      </section>
    </>
  );
};

const RequestConsent = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <RequestConsentPage/>
      </section>
    </>
  );
};


const AddRecordsInitial = (props) => {
  return props.doctorLoginStatus ? (
    <>
      <Navbar />
      <section className="hero-section">
        <AddRecordsInitialPage/>
      </section>
    </>
  ):(
    <>
      <Navbar />
      <section className="hero-section">
        <h1>Unauthorized</h1>
      </section>
    </>
  );
};

const VerifyOtpToAddRecords = (props) => {
  return props.doctorLoginStatus ? (
    <>
      <Navbar />
      <section className="hero-section">
        <VerifyOtptoAddrecordsPage/>
      </section>
    </>
  ):(
    <>
      <Navbar />
      <section className="hero-section">
        <h1>Unauthorized</h1>
      </section>
    </>
  );
};


const AddRecords = (props) => {
  return props.doctorLoginStatus ? (
    <>
      <Navbar />
      <section className="hero-section">
        <AddRecordsPage/>
      </section>
    </>
  ):(
    <>
      <Navbar />
      <section className="hero-section">
        <h1>Unauthorized</h1>
      </section>
    </>
  );
};


const View = () => {
  return (

    <>
      <Navbar />
      <section className="hero-section">
        <ViewEHR/>
      </section>
    </>
  );
};

const DelegateConsent = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <DelegateConsentPage/>
      </section>
    </>
  );
};

const VerifyOtp = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <VerifyOtpPage/>
      </section>
    </>
  )
};

const DoctorLogout= () => {
  document.cookie = "doctor_cookie" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  
  return <Redirect to = {{ pathname: "/login-doctor" }} />;
  
};

const AdminLogout= () => {
  document.cookie = "admin_cookie" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  
  return <Redirect to = {{ pathname: "/login-admin" }} />;
  
};


const App = () => {


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
    //console.log(cookie);
  });








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

      <Route path="/logout-doctor">
        <DoctorLogout />
      </Route>

      <Route path="/logout-admin">
        <AdminLogout />
      </Route>
      <Route path="/granted-consents">
        <GrantedConsent />
      </Route>
      <Route path="/request-consents">
        <RequestConsent />
      </Route>
      <Route path="/view-ehr/:patientId/:consentId">
        <View />
      </Route>
      <Route path="/create-login">
        <CreateDoctorLogin />
      </Route>
      <Route path="/verify-otp/:doctorId">
        <VerifyOtp />
      </Route>


      <Route path="/add-record-initial">
        <AddRecordsInitial doctorLoginStatus={doctorLoginStatus}/>
      </Route>

      <Route path="/verify-otp-to-add-record/:patientId">
        <VerifyOtpToAddRecords doctorLoginStatus={doctorLoginStatus}/>
      </Route>

      <Route path="/add-record/:patientId">
        <AddRecords doctorLoginStatus={doctorLoginStatus}/>
      </Route>


      <Route path="/delegate-consent-doc/:consentId">
        <DelegateConsent />
      </Route>

    </Switch>
  );
};

export default App;
