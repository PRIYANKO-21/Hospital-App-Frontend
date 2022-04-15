
import React,{Component} from 'react'
import {Form ,Button} from 'react-bootstrap'
import axios from 'axios';
import { Redirect } from 'react-router';



class CreateDoctorLoginPage extends Component{

    constructor(props){
        super(props);
        this.state = {
          doctor_id : '',
          username : '',
          password : '' 
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
  
      
      
/*       axios.post('http://localhost:8082/create-doctor-login', this.state, { headers })
       .then(response => 
         {
           console.log("return post method");
           //console.log(response);
            console.log(response);
            <Redirect to = {{ pathname: "/verify-otp/"+this.state.doctor_id+"/" }} />
           // xPaths = response.data.xPaths;
         }
      ); */
  }

  detailsChange(event){
    this.setState({
        [event.target.name]:event.target.value
    });
}


    render(){
        return (
        
            <div className="RequestConsent">
                <h1>CREATE DOCTOR LOGIN</h1>
                <Form onSubmit = {this.submitRequestConsent}>
                    <Form.Group className="mb-3" controlId="formBasicDoctorId">
                        <Form.Label>Enter Doctor Id</Form.Label>
                        <Form.Control required type="text" name="doctor_id" value={this.state.doctor_id} onChange={this.detailsChange} /*placeholder="Your Name"*/ />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDoctorEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="text" name="username" value={this.state.username} onChange={this.detailsChange} /*placeholder="Your Contact No"*/ />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDoctorPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" name="password" value={this.state.password} onChange={this.detailsChange} /*placeholder="Your Contact No"*/ />
                    </Form.Group>


                    <Button size="lg" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
              
        );
    }

}


export default CreateDoctorLoginPage

    