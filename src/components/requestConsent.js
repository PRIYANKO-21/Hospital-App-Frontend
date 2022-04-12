
import React,{Component} from 'react'
import {Form ,Button} from 'react-bootstrap'
import axios from 'axios';
//import { Redirect } from 'react-router';

import './requestConsent.css'

class RequestConsentPage extends Component{

    constructor(props){
        super(props);
        this.state = {
          patient_id : '',
          request_info : '',
          access_purpose : '' 
        }
        this.submitRequestConsent = this.submitRequestConsent.bind(this);
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

    submitRequestConsent(event){
      console.log(this.state);
      event.preventDefault();
      const token=this.getCookie('doctor_cookie')
      const headers = {
          "Authorization" : `Bearer ${token}`
      };
  
      
      
      axios.post('http://localhost:8082/request-consent', this.state, { headers })
       .then(response => 
         {
           console.log("return post method");
           //console.log(response);
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


    render(){
        return (
        
            <div className="RequestConsent">
                <h1>REQUEST CONSENT</h1>
                <Form onSubmit = {this.submitRequestConsent}>
                    <Form.Group className="mb-3" controlId="formBasicPatientId">
                        <Form.Label>Enter Patient Id</Form.Label>
                        <Form.Control required type="text" name="patient_id" value={this.state.patient_id} onChange={this.detailsChange} /*placeholder="Your Name"*/ />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicRequestInfo">
                        <Form.Label>Enter Request Info</Form.Label>
                        <Form.Control required type="text" name="request_info" value={this.state.request_info} onChange={this.detailsChange} /*placeholder="Your Contact No"*/ />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAccessPurpose">
                        <Form.Label>Select Access Purpose</Form.Label>
                        <Form.Control
          as="select"
          
          onChange={e => {
            console.log("e.target.value", e.target.value);
            //setType(e.target.value);
          }}
        >
          <option value="Surgery">Surgery</option>
          <option value="General Health">General Health</option>
          <option value="Heart Disease">Heart Disease</option>
        </Form.Control>

                    </Form.Group>


                    <Button size="lg" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
              
        );
    }

}


export default RequestConsentPage

    