import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import './doctorLogin.css';




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


  getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
  }

  submitAddDoctor(event){
      console.log(this.state);
      event.preventDefault();
      const token = this.getCookie('admin_cookie');
      const headers = { 
          'Authorization': `Bearer ${token}` 
      };

      
      
      axios.post('http://localhost:8082/add-doctor', this.state, {headers})
      .then(response => 
        {
          if(response.status==200){
            alert("Doctor Added!");
          }
          else{
            alert("Doctor not added.Please Try Again");
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