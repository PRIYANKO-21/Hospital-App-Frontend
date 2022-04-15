import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router";
import './doctorLogin.css';




class VerifyOtpPage extends Component {


  constructor(props){
    super(props);
    this.state = {
        otp : '',
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
      const token = this.getCookie('doctor_cookie');
      const headers = { 
          'Authorization': `Bearer ${token}` 
      };

      
      
      axios.post('http://localhost:8082/validate-otp/'+this.props.match.params.doctorId+'/'+this.state.otp, this.state, {headers})
      .then(response => 
        {
          if(response.status==200){
            alert("Otp Validation Successful!");
          }
          else{
            alert("Wrong Otp Entered Try again");
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

  
      return (
        <div className="VerifyOtp">
          <h1>Verify Otp</h1>
          <Form onSubmit={this.submitAddDoctor}>
            <Form.Group size="lg" className="form" controlId="formBasicVerifyOtp">
              <Form.Label>Enter Otp</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={this.state.otp}
                name = "otp"
                onChange={this.detailsChange}
                placeholder = "Enter Otp send to your mail"
              />
            </Form.Group>
            <Button size="lg" type="submit">
              Verify Otp
            </Button>
          </Form>
  
        </div>
       
      );
  

  }

}

export default VerifyOtpPage;