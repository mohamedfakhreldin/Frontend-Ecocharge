import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import strings from "../../../lang/lang";

const Users = () => {
let token =localStorage.getItem("userToken");
console.log(token)
    let [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
      axios
        .get("https://backend-ecocharge-v9vw.onrender.com/api/users/auth/AllUsers",{ headers: {"authorization" : `Bearer ${token}`} })
        .then((res) => {setAllUsers(res.data.data)})
    },[token]);
    let deleteOne = (_id) => {
        axios.delete(`https://backend-ecocharge-v9vw.onrender.com/api/users/auth/deleteUser/${_id}`,{ headers: {"authorization" : `Bearer ${token}`} })
        .then((res) =>{
            setAllUsers((oldData)=>{return allUsers.filter((station)=>{ return station._id !== _id})})  
      });
    }
    // console.log(allStations);
    let renderStations = allUsers.map((user) => {
        return (
          <tr key={user._id}>
            {/* <td>{station._id}</td> */}
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            
            {/* <td>{station.number_of_Plugs}</td> */}
            {/* <td>{station.Plugs}</td> */}
            {/* <td>{station.availability}</td>
            <td>{station.Amenities}</td>
            <td>{station.Description}</td>
            <td>{station.photo}</td> */}

            {/* <td>
             
              <Link to={`students/${student.id}`}>
                <button className="btn btn-outline-info">Details</button>
              </Link>
            </td> */}
            <td>
             
              <Link to={`/dashboard/updateUser/${user._id}`}>
                <button className="btn btn-info">{strings.dashboard.Update}</button>
              </Link>
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteOne(user._id);
                }}
              >
                {strings.dashboard.Delete}
              </button>
            </td>
          </tr>
        );
      });
 
if(allUsers.length>0){
    return (
        <div className='w-100'>
          
        <h5 className="text-white p-2 w-25 m-auto rounded-2 text-center my-1 shadow" style={{backgroundColor:"rgb(45 159 124)",minWidth:'95px'}}>
           {strings.dashboard.Users}
        </h5>
            
        <Table responsive striped bordered hover className="w-100 m-auto text-center shadow">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>{strings.dashboard.name}</th>
              <th>{strings.dashboard.EmailAddress}</th>
              <th>{strings.dashboard.Role}</th>
           
              <th>{strings.dashboard.Update}</th>
              <th>{strings.dashboard.Delete}</th>
              {/* {/* <th>number_of_Plugs</th> */}
              
              {/* <th>Plugs</th> */}
              {/* <th>Amenities</th>
              <th>Description</th>
              <th>photo</th>  */}


            </tr>
          </thead>
          <tbody>
            {renderStations}
          </tbody>

        </Table>
      </div>
    );
}else{
    return <div className='d-flex justify-content-center align-items-center'>
    <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
}
 
};

export default Users;