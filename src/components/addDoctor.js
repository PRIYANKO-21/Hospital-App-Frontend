import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import './login.css';




class AddDoctorPage extends Component {


  constructor(props){
    super(props);
    this.state = {
        doctor_email : '',
        isLoggedIn: false
    }
    this.submitAddDoctor = this.submitAddDoctor.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }

  submitAddDoctor(event){
      console.log(this.state);
      event.preventDefault();
      const headers = { 
          "Content-Type": "application/json" ,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      };

      
      
      axios.post('http://localhost:4000/add-doctor', this.state, { headers })
      .then(response => 
        {
            console.log("return post method");
            //console.log(response);
            console.log("Doctor added");
            console.log(response);
            // xPaths = response.data.xPaths;
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
        <div className="AddDoctorPage">
          <h1>Add Doctor Page</h1>
          <Form onSubmit={this.submitAddDoctor}>
            <Form.Group size="lg" className="form" controlId="formBasicDoctorEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={this.state.doctor_email}
                name = "doctor_email"
                onChange={this.detailsChange}
                placeholder = "Email"
              />
            </Form.Group>
            <Button size="lg" type="submit">
              Add Doctor
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

export default AddDoctorPage;