import React, {Component, useState} from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";
import './viewEHR.css'

class ViewEHR extends Component{

    constructor(props){
        super(props)
        this.state = {
          record : {},
          pid : '',
          cid : '',
          goAhead : false
        }
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
    console.log("Calling")
    
        const token = this.getCookie('doctor_cookie');
        console.log("token" + token)
        axios.get('http://localhost:8082/get-ehr/'+this.props.match.params.patientId+'/'+this.props.match.params.consentId,  
        { 
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        })

        .then(response => {
            this.setState({
            record: response.data,
            goAhead:true 
            })
            //console.log("Dis Mount")
            //console.log(this.state.record);
            
            //this.state.record.
        });




    
} 

    render(){
        const {match,location,history} = this.props;

        //var { record } = this.state;
        //console.log("HEre")
        //console.log(this.state.record.episodesDTOList);

        console.log("Params" + this.props.match.params.patientId);
        //console.log(record)
        if(this.state.goAhead){
            return(
                <>
                
                {
                    this.state.record.episodesDTOList.map(({encounters , episodeId, episodeName  }) => (
                            <div id="loop">
                                <h3>Episodes:</h3>
                                      <li className="episodes">Episode Id : {episodeId}</li>
                                      <li className="episodes">Episode Name : {episodeName}</li>
                                {
                                  encounters.map(({doctorName,encounterId,op_records})=>(
                                     <div>
                                         <h3 className="episodes">Encounters :</h3>  
                                   
                          <div className="row">
                            <div className="col-md-6">
    
                      </div>
                    </div>
                                         <li className="encounter">Doctor Name : {doctorName}</li>
                                         <li className="encounter">Encounter Id : {encounterId}</li>
                                           
                                         {
                                              op_records.map(({diagnosis,op_record_id,recordDetails,timestamp})=>(
                                                <div>
                                                  <h3 className="encounter">OpRecords:</h3>
                                                  <li className="op_records">Diagnosis : {diagnosis}</li>
                                                  <li className="op_records">Op Record Id : {op_record_id}</li>
                                                  <li className="op_records">Details : {recordDetails}</li>
                                                  <li className="op_records">Timestamp : {timestamp}</li>                                
                                                </div>
                                              ))
                                      }
                                      </div>
                                  ))
                              }
                            </div>
                          ))
                   }
                   </>
    
            )            
        }
        else{
            return <h1>Loading...</h1>
        }

    }
}
const CreateConsentWithRouter = withRouter(ViewEHR);
export default CreateConsentWithRouter;