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

class DoctorRegistrationRequestsPage extends Component {
    constructor(props){
      super(props)
      this.state = {
        users: [],
        loading:true,

        doctor_id : '',
        doctor_email : '',

        isAdminLoggedIn : this.getCookie('admin_cookie')!==undefined ? true : false
      }
      this.accept = this.accept.bind(this);
      this.reject = this.reject.bind(this);
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

    accept(doctorId){
        const token = this.getCookie('admin_cookie');
        console.log(token,doctorId);
        const headers = {
            "Authorization" : `Bearer ${token}`
        };
        axios.post('http://localhost:8082/accept-login-request/'+doctorId,doctorId, { headers })
         .then(response => 
           {

            if(response.status===200){
                alert("Doctor Added Successfully");
            }
            else{
                alert("Wrong Details Entered.Enter Correct details");
            }
           }
        );
    }
    reject(doctorId){
        const token = this.getCookie('admin_cookie');
        const headers = {
            "Authorization" : `Bearer ${token}`
        };
        axios.post('http://localhost:8082/reject-login-request/'+doctorId,doctorId, { headers })
         .then(response => 
           {

            if(response.status===200){
                alert("Doctor Rejected Successfully");
            }
            else{
                alert("Wrong Details Entered.Enter Correct details");
            }
           }
        );
    }

    async componentDidMount(){
      const token = this.getCookie('admin_cookie');
      //const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      const res = await axios.get('http://localhost:8082/get-doctor-login-requests',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      //console.log(res.data.delegateAccess.toLowerCase())
      console.log(res.data);


      this.setState({loading:false, users: res.data})
      console.log(this.state.users);
    }





    
    render() {

        if(this.state.isAdminLoggedIn){
          if(this.state.users!==undefined){
            return (
              <>
              <h1>Create Login Requests</h1>
              <MDBTable striped style={{"width":"80vw","fontSize":"1.4rem"}}>
              <MDBTableHead>
                <tr>
                  <th>Doctor ID</th>
                  <th>Doctor Email</th>
                  <th>Doctor Name</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {
                  this.state.users.map((obj)=>(
                   <tr>
                      <td>{obj.doctor_id}</td>
                      <td>{obj.doctor_email}</td>
                      <td>{obj.doctor_name}</td>
                      <td>
                        <Button className = "buttonsize" size="lg" type="button"
                            onClick={(e) => {

                                e.preventDefault();

                                this.setState({doctor_id:obj.doctor_id,doctor_email:obj.doctor_email});
                            

                                this.accept(obj.doctor_id);
                            }}
                        >
                            Accept
                        </Button>
                        
                      </td>
                        
                    <td>
                      <Button className = "buttonsize" size="lg" type="button"
                          onClick={(e) => {

                              e.preventDefault();
                              this.setState({doctor_id:obj.doctor_id,doctor_email:obj.doctor_email});

                              this.reject(obj.doctor_id);
                          }}
                      >
                          Reject
                      </Button>
                      
                    </td>
                      

                  </tr>   		

                      
                  ))
                }

              </MDBTableBody>
            </MDBTable>
            </>
            )      
          }
          else{

            return <h1>No Login Requests From Doctor</h1>
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

export default DoctorRegistrationRequestsPage;