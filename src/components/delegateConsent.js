
import React,{Component} from 'react'
import {Form ,Button} from 'react-bootstrap'
import axios from 'axios';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router";
//import { Redirect } from 'react-router';

import './requestConsent.css'

class DelegateConsentPage extends Component{

    constructor(props){
        super(props);
        this.state = {
          doctor_id : '',
          isDoctorLoggedIn : this.getCookie('doctor_cookie')!==undefined ? true : false
        }
        this.submitDelegateConsent = this.submitDelegateConsent.bind(this);
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

    submitDelegateConsent(event){
      console.log(this.state);
      event.preventDefault();
      const token=this.getCookie('doctor_cookie')
      const headers = {
          "Authorization" : `Bearer ${token}`
      };
  
      
      
      axios.post('http://localhost:8082/delegate-consent/'+this.state.doctor_id+'/'+this.props.match.params.consentId,this.state, {headers})
       .then(response => 
         {
            if(response.status===200){
               
                alert("Consent delegated Successfully");
            }
            else{
                alert("Error... ");
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
        const {match,location,history} = this.props;
        if(this.state.isDoctorLoggedIn){
            return (
        
                <div className="DelegateConsent">
                    <h1>DELEGATE CONSENT</h1>
                    <Form onSubmit = {this.submitDelegateConsent}>
                        <Form.Group className="mb-3" controlId="formBasicPatientId">
                            <Form.Label>Enter Doctor Id</Form.Label>
                            <Form.Control required type="text" name="doctor_id" value={this.state.doctor_id} onChange={this.detailsChange} /*placeholder="Your Name"*/ />
                        </Form.Group>
    
    
                        <Button size="lg" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                  
            );
        }
        else{
            return(
                <div>
                    <h1>UNAUTHORIZED</h1>
                </div>
            )

        }

    }

}


//export default DelegateConsentPage;
const DelegateConsentWithRouter = withRouter(DelegateConsentPage);
export default  DelegateConsentWithRouter;

    