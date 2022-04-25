import {useState} from 'react';
import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import viewEHR from './viewEHR.js';
import {Link} from "react-router-dom";
import { Redirect } from 'react-router';
import { NavLink } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import './grantedConsents.css'

class GrantedConsentPage extends Component {
    constructor(props){
      super(props)
      this.state = {
        users: [],
        loading:true,
        getEhrResp : false,
        pid : '',
        cid : '',
        Vehr : false,
        isDoctorLoggedIn : this.getCookie('doctor_cookie')!==undefined ? true : false
      }
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

    async componentDidMount(){
      const token = this.getCookie('doctor_cookie');
      //const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      const res = await axios.get('http://localhost:8082/get-granted-consents',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      //console.log(res.data.delegateAccess.toLowerCase())
      console.log(res.data);


      this.setState({loading:false, users: res.data})
      console.log(this.state.users);
    }

    async getData(pid,cid){
      //const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        //console.log(pid+" "+cid)
      // const res = await axios.get('http://localhost:8081/get-ehr/'+pid+'/'+cid,{  
      //   headers: {
      //       'Authorization': 'doc_123'
      //   }
      // })
      this.setState({getEhrResp:true});
      //console.log(res);

    }



    
    render() {

    if(this.state.isDoctorLoggedIn){
      if(!this.state.getEhrResp){
        return (
          <MDBTable striped style={{"width":"80vw","fontSize":"1.4rem"}}>
          <MDBTableHead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Consent Id</th>
              <th>Delegate Access</th>
              <th>Validity</th>
              <th>View Consent</th>
              <th>Delegate Consent</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              this.state.users.map((obj)=>(
               <tr>
                  <td>{obj.patient_id}</td>
                  <td>{obj.patientName}</td>
                  <td>{obj.consent_id}</td>
                  <td>{obj.delegateAccess}</td>
                  <td>{obj.validity}</td>
                  <td>
                    <Button className = "buttonsize" size="lg" type="button"
                        onClick={(e) => {

                            e.preventDefault();
                            this.setState({pid:obj.patient_id,cid:obj.consent_id})
                            this.getData(obj.patient_id,obj.consent_id)  ;
                            this.setState({Vehr:true});
                        }}
                    >
                        View Record
                    </Button>
                  
                  </td>
                  {obj.delegateAccess==="Yes" ?  (
                    <td>
                      <Button className = "buttonsize" size="lg" type="button"
                          onClick={(e) => {
                            console.log(obj);
                              e.preventDefault();
                              this.setState({cid:obj.consent_id})
                              this.getData(obj.consent_id)  ;

                          }}
                      >
                          Delegate
                      </Button>
                  
                    </td>
                  ) :
                    <td></td>
                  }

              </tr>   		
              
              
              ))
            }
    
          </MDBTableBody>
        </MDBTable>
  
        )      
      }
      else{
        if(this.state.Vehr == true)
        return <Redirect to = {{ pathname: "/view-ehr/" + this.state.pid+'/'+this.state.cid }} />;
        else if(this.state.Vehr == false)
        return <Redirect to = {{ pathname: "/delegate-consent-doc/" + this.state.cid }} />;
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

export default GrantedConsentPage;