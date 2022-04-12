import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import './doctorLogin.css';




class AdminLoginPage extends Component {


  constructor(props){
    super(props);
    this.state = {
        admin_email : '',
        admin_password : '',
        isLoggedIn: false
    }
    this.submitAdminLogin = this.submitAdminLogin.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }



  submitAdminLogin(event){
    //console.log(this.state);
    event.preventDefault();
    const headers = { 
        "Content-Type": "application/json" ,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    };
    
    
    axios.post('http://localhost:8082/admin-login', this.state, { headers })
    .then(response => 
      {
        if(response.status!=200){
          alert("Wrong Details! Enter the valid Details");
          
        }
        else{
          this.setState({isLoggedIn : true});
          //setting the cookie here
          document.cookie = "admin_cookie=" + response.data;
          console.log("Cookie set");
          alert("Admin Login Successful!");
          //console.log(this.getCookie('admin_cookie'));
        }
      }
    );
  }

  detailsChange(event){
      this.setState({
          [event.target.name]:event.target.value
      });
  }

  headers = {
      "Content-Type": "application/json"
  };




  render(){

    if(!this.state.isLoggedIn){
      return (
        <div className="AdminLoginPage">
          <h1>LOGIN PAGE</h1>
          <Form onSubmit={this.submitAdminLogin}>
            <Form.Group size="lg" className="form" controlId="formBasicAdminEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={this.state.admin_email}
                name = "admin_email"
                onChange={this.detailsChange}
                placeholder = "Email"
              />
            </Form.Group>
            <Form.Group size="lg" className="form" controlId="formBasicAdminPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={this.state.admin_password}
                onChange={this.detailsChange}
                placeholder="Password"
                name="admin_password"
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

export default AdminLoginPage;