import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router";
import './doctorLogin.css';




class VerifyOtptoAddrecordsPage extends Component {


  constructor(props){
    super(props);
    this.state = {
        otp : '',
        isverified :false,
        isDoctorLoggedIn : this.getCookie('doctor_cookie')!==undefined ? true : false
    }
    this.submitAddrecord = this.submitAddrecord.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
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

  submitAddrecord(event){
      console.log(this.state);
      console.log(this.props);
      event.preventDefault();
      //const token = this.getCookie('doctor_cookie');
      const headers = { 
        "Content-Type": "application/json" ,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      };

      
      
      axios.post('http://localhost:8082/validate-otp/'+this.props.match.params.patientId+'/'+this.state.otp, {headers})
      .then(response => 
        {
          if(response.status===200){
            alert("Otp Validation Successful!");
            if(response.status===200){
                this.setState({isverified: true});
            }
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
    if(this.state.isDoctorLoggedIn){
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
        return <Redirect to = {{ pathname: "/add-record/"+this.props.match.params.patientId}} />
      }
    
    }
    else{
      return(
        <div>
          <h1>UNAUTHORIZED</h1>
        </div>
    );
    }
  }

}

//export default VerifyOtpPage;
const CreateConsentWithRouter = withRouter(VerifyOtptoAddrecordsPage);
export default CreateConsentWithRouter;