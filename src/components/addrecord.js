import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { withRouter } from "react-router";
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import './addRecord.css';




class AddRecordPage extends Component {


  constructor(props){
    super(props);
    this.state = {
        patient_id : '',
        episode : '',
        episode_name : '',
        diagnosis : '',
        complaints : '',
        treatment : '',
        prescription : '',
        followUpPlan : '',
        isRecordAdded : false,
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

  componentDidMount(){
    this.setState({patient_id : this.props.match.params.patientId})
  }
  submitAddrecord(event){
      console.log(this.props.match.params.patientId)
      
      
      console.log(this.state);
      event.preventDefault();
      const token = this.getCookie('doctor_cookie');
      const headers = { 
          'Authorization': `Bearer ${token}` 
      };

      
      
      axios.post('http://localhost:8082/add-record-ehr', this.state, {headers})
      .then(response => 
        {
          if(response.status==200){
            this.setState({isRecordAdded:true});
            alert("record added!");
          }
          else{
            alert("record is not added");
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
      if(!this.state.isRecordAdded){
        return (
          <div className="AddRecord">
            <h1>Add record Page</h1>
            <Form onSubmit={this.submitAddrecord}>
              <Form.Group size="lg" className="form" controlId="formBasicDoctorEmail">
                <Form.Label>Episode ID</Form.Label>
                <Form.Control required autoFocus type="text" value={this.state.episode}  name = "episode"   onChange={this.detailsChange}  placeholder = "Episode ID" />
                <Form.Label>Episode Name</Form.Label>
                <Form.Control required autoFocus type="text" value={this.state.episode_name}  name = "episode_name"   onChange={this.detailsChange}  placeholder = "Episode Name" />
                <Form.Label>Diagnosis</Form.Label>
                <Form.Control required autoFocus type="text" value={this.state.diagnosis}  name = "diagnosis"   onChange={this.detailsChange}  placeholder = "Diagnosis" />
                <Form.Label>Complaint</Form.Label>
                <Form.Control required autoFocus type="text" value={this.state.complaints}  name = "complaints"   onChange={this.detailsChange}  placeholder = "Complaint" />
                <Form.Label>Treatment</Form.Label>
                <Form.Control required autoFocus type="text" value={this.state.treatment}  name = "treatment"   onChange={this.detailsChange}  placeholder = "Treatment" />
                <Form.Label>Prescription</Form.Label>
                <Form.Control required autoFocus type="text" value={this.state.prescription}  name = "prescription"   onChange={this.detailsChange}  placeholder = "Prescription" />
                <Form.Label>Follow up plan</Form.Label>
                <Form.Control required autoFocus type="text" value={this.state.followUpPlan}  name = "followUpPlan"   onChange={this.detailsChange}  placeholder = "Follow up plan" />
                <br></br>
                <Button  type="submit"> Add record </Button>
  
              </Form.Group>
            </Form>
          </div>
         
        );
      }
      else{
        return <Redirect to = {{ pathname: "/" }} />;
      }
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

const CreateConsentWithRouter = withRouter(AddRecordPage);
export default CreateConsentWithRouter;