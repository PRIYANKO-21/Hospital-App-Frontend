import {useState} from 'react';
import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import viewEHR from './viewEHR.js';
import {Link} from "react-router-dom";
import { Redirect } from 'react-router';
import { NavLink } from 'react-bootstrap';
import './grantedConsents.css'

class GrantedConsentPage extends Component {
    constructor(props){
      super(props)
      this.state = {
        users: [],
        loading:true,
        getEhrResp : false,
        pid : '',
        cid : ''
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

    async getUsersData(){
      const token = this.getCookie('doctor_cookie');
      //const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      const res = await axios.get('http://localhost:8081/get-granted-consents',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(res.data)
      this.setState({loading:false, users: res.data})
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



    componentDidMount(){
      this.getUsersData()
    }
    render() {
      const columns = [{  
        Header: 'Patient ID',  
        accessor: 'patient_id',
       }
       ,{  
        Header: 'Patient Name',  
        accessor: 'patientName' ,
        }
       
       ,{  
       Header: 'Consent Id',  
       accessor: 'consent_id' ,
       }
       ,{  
       Header: 'Delegate Access',  
       accessor: 'delegateAccess',
       },
       {  
        Header: 'Validity',  
        accessor: 'validity',
        },

        {
          Header: 'View',  
        accessor: 'email',
       Cell: ({ original }) => (
        <button
          type="button"
          onClick={(e) => {
          console.log(original);
            e.preventDefault();
            //window.location.href='http://localhost:8081/get-ehr/'+original.patient_id+'/'+original.consent_id;
            this.setState({pid:original.patient_id,cid:original.consent_id})
            this.getData(original.patient_id,original.consent_id)  ;
          }}
        >
          View Record
        </button>)
          // <td>
          // <NavLink to={"/view-ehr/"+original.patient_id+'/'+original.consent_id}> View Record </NavLink>
          // </td>
        }
        
    ]
    if(!this.state.getEhrResp){
      return (
        <div>
          <ReactTable  
          data={this.state.users}  
          columns={columns}  
          />
        </div>

      )      
    }
    else{
      return <Redirect to = {{ pathname: "/view-ehr/" + this.state.pid+'/'+this.state.cid }} />;
    }

    }
  }

export default GrantedConsentPage;