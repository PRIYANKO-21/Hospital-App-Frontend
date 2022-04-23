
import React,{Component} from 'react'
import {Form ,Button} from 'react-bootstrap'
import axios from 'axios';


import './requestConsent.css'
import { Redirect } from 'react-router-dom';

class AddRecordsInitialPage extends Component{

    constructor(props){
        super(props);
        this.state = {
          patient_id : '',
          isverified :false
        }
        this.submitAddRecord = this.submitAddRecord.bind(this);
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

      submitAddRecord(event){
        console.log(this.state);
        event.preventDefault();
        const token=this.getCookie('doctor_cookie')
        const headers = {
            "Authorization" : `Bearer ${token}`
        };
    
        
        
        axios.post('http://localhost:8082/send-otp/'+this.state.patient_id ,  { headers })
         .then(response => 
           {
             console.log("return post method");
             console.log(this.state);
              console.log(response);
              if(response.status===200){
                this.setState({isverified: true});
            }
             // xPaths = response.data.xPaths;
           }
        );
       // <Redirect to="/verify-otp-to-add-record"></Redirect>
       
    }
    detailsChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    
    render(){
        if(!this.state.isverified){
        return (
        
            <div className="RequestConsent">
                <h1>ADD RECORD</h1>
                <Form onSubmit = {this.submitAddRecord}>
                    <Form.Group className="mb-3" controlId="formBasicPatientId">
                        <Form.Label>Enter Patient Id</Form.Label>
                        <Form.Control required type="text" name="patient_id" value={this.state.patient_id} onChange={this.detailsChange} /*placeholder="Your Name"*/ />
                    </Form.Group>


                    <Button size="lg" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
              
        );
        }
        else{
            return <Redirect to = {{ pathname: "/verify-otp-to-add-record/"+this.state.patient_id }} />
        }
    }
}

export default AddRecordsInitialPage;