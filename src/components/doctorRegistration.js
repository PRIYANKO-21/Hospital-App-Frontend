import React,{Component} from 'react'
import './registration.css';
import { Redirect } from 'react-router';
import {Form ,Button} from 'react-bootstrap'
import axios from 'axios';

class DoctorRegistrationPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            doctor_name : '',
            doctor_id : '',
            doctor_contact : '',
            doctor_email : '',
            doctor_speciality : '',
            doctor_password : '',
            isRegistrationSuccessful : false
        }
        this.submitDoctorRegistration = this.submitDoctorRegistration.bind(this);
        this.detailsChange = this.detailsChange.bind(this);
    }

    

    submitDoctorRegistration(event){
        console.log(this.state);
        event.preventDefault();
       // const token = this.getCookie('doctor_cookie');
       const headers = { 
        "Content-Type": "application/json" ,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    };
    
        
        
        axios.post('http://localhost:8082/register-doctor', this.state, { headers })
         .then(response => 
           {

            if(response.status===200){
                this.setState({isRegistrationSuccessFul : true});
                alert("Registration Successful!! Kindly Login Now");
            }
            else{
                alert("Wrong Details Entered.Enter Correct details");
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
        if(!this.state.isRegistrationSuccessFul){
            return (
                <div className="RegistrationPage">
                    <h1>REGISTRATION PAGE</h1>
                    <Form onSubmit = {this.submitDoctorRegistration}>
                        <Form.Group className="mb-3" controlId="formBasicDoctorName">
                            <Form.Label>Enter Name</Form.Label>
                            <Form.Control required type="text" name="doctor_name" value={this.state.doctor_name} onChange={this.detailsChange} placeholder="Your Name" />
                        </Form.Group>
    
    
                        <Form.Group className="mb-3" controlId="formBasicDoctorId">
                            <Form.Label>Enter Your Id</Form.Label>
                            <Form.Control required type="text" name="doctor_id" value={this.state.doctor_id} onChange={this.detailsChange} placeholder="Your ID" />
                        </Form.Group>
    
    
                        <Form.Group className="mb-3" controlId="formBasicDoctorContact">
                            <Form.Label>Enter Contact No</Form.Label>
                            <Form.Control required type="text" name="doctor_contact" value={this.state.doctor_contact} onChange={this.detailsChange} placeholder="Your Contact No" />
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" name="doctor_email" value={this.state.doctor_email} onChange={this.detailsChange} placeholder="Enter Email" />
    
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicDoctorSpeciality">
                            <Form.Label>Enter Speciality</Form.Label>
                            <Form.Control required type="text" name="doctor_speciality" value={this.state.doctor_speciality} onChange={this.detailsChange} placeholder="Your Speciality" />
                        </Form.Group>
    
    
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" name="doctor_password" value={this.state.doctor_password} onChange={this.detailsChange} placeholder="Password" />
                        </Form.Group>
    
    
                        <Button size="lg" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                  
            );
        }
        else{
            return <Redirect to = {{ pathname: "/login-doctor" }} />;
        }

    }
}

export default DoctorRegistrationPage;