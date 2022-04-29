import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router";
import './doctorLogin.css';




class DoctorRegisterOtpVerificationPage extends Component {


  constructor(props){
    super(props);
    this.state = {
        otp : '',
        isverified :false
    }
    this.submitAddrecord = this.submitAddrecord.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };


  submitAddrecord(event){
      console.log(this.state);
      console.log(this.props);
      event.preventDefault();

      const headers = { 
        "Content-Type": "application/json" ,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      };

      
      
      axios.post('http://localhost:8082/validate-otp-register/'+this.props.match.params.doctorId+'/'+this.state.otp, {headers})
      .then(response => 
        {
          if(response.status===200){
            alert("Otp Validation Successful!");
            this.setState({isverified: true});
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
    if(!this.state.isverified){
      const {match,location,history} = this.props;
    
      return (
        <div className="VerifyOtp">
          <h1>Verify Otp</h1>
          <Form onSubmit={this.submitAddrecord}>
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
    else{
      return <Redirect to = {{ pathname: "/login-doctor"}} />
    }
  }

}

//export default VerifyOtpPage;
const CreateConsentWithRouter = withRouter(DoctorRegisterOtpVerificationPage);
export default CreateConsentWithRouter;