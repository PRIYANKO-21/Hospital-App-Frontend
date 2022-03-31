import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import './doctorLogin.css';




class DoctorLoginPage extends Component {


  constructor(props){
    super(props);
    this.state = {
        username : '',
        password : '',
        isLoggedIn: false
    }
    this.submitPatientLogin = this.submitPatientLogin.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }

  submitPatientLogin(event){
      console.log(this.state);
      event.preventDefault();
      const headers = { 
          "Content-Type": "application/json" ,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      };

      
      
<<<<<<< HEAD:src/components/login.js
      axios.post('http://localhost:8081/login-doctor', this.state, { headers })
=======
      axios.post('http://localhost:5000/login-doctor', this.state, { headers })
>>>>>>> c4b9a6816395dbc7b27d46b02aebe40a9426fa9c:src/components/doctorLogin.js
      .then(response => 
        {
          if(response.status!=200){
            alert("Invalid Credentials!Enter correct credentials");
          }
          else{
            this.setState({isLoggedIn : true});
            //setting the cookie here
            document.cookie = "doctor_cookie=" + response.data;
<<<<<<< HEAD:src/components/login.js
            console.log("Cookie set");
=======
            console.log("Doctor Cookie set");
            alert("Login Successful")
>>>>>>> c4b9a6816395dbc7b27d46b02aebe40a9426fa9c:src/components/doctorLogin.js
          }
        }
      );
  }

  detailsChange(event){
      this.setState({
          [event.target.name]:event.target.value
      });
  }





  render(){

    if(!this.state.isLoggedIn){
      return (
        <div className="LoginPage">
          <h1>LOGIN PAGE</h1>
          <Form onSubmit={this.submitPatientLogin}>
            <Form.Group size="lg" className="form" controlId="formBasicPatientUsername">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
<<<<<<< HEAD:src/components/login.js
                value={this.state.patient_email}
=======
                value={this.state.username}
>>>>>>> c4b9a6816395dbc7b27d46b02aebe40a9426fa9c:src/components/doctorLogin.js
                name = "username"
                onChange={this.detailsChange}
                placeholder = "Email"
              />
            </Form.Group>
            <Form.Group size="lg" className="form" controlId="formBasicPatientPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={this.state.password}
                onChange={this.detailsChange}
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <Button size="lg" type="submit">
              Login
            </Button>
          </Form>
  
        </div>
       
      );
    }
    else{
      return <Redirect to = {{ pathname: "/" }} />;
    }

  }

}

export default DoctorLoginPage;