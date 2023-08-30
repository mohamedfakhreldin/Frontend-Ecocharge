import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { deleteStation, getAllStation } from '../API/api';
import strings from "../../lang/lang";

const Stations = () => {
let token =localStorage.getItem("userToken");

    let [allStations, setAllStations] = useState([]);

    useEffect(() => {
      
        getAllStation().then((res) => {setAllStations(res.data.data)})
    },[token]);
    let deleteOne = (_id) => {
        deleteStation(_id)
        .then((res) =>{
            setAllStations((oldData)=>{return allStations.filter((station)=>{ return station._id !== _id})})  
      });
    }
    
    let renderStations = allStations.map((station) => {
        return (
          <tr key={station._id}>
            {/* <td>{station._id}</td> */}
            <td>{station.station_name}</td>
            <td>{station.address}</td>
            <td>{station.latitude}</td>
            <td>{station.longitude}</td>
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
             
              <Link to={`/dashboard/updateStation/${station._id}`}>
                <button className="btn btn-info">{strings.dashboard.Update}</button>
              </Link>
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteOne(station._id);
                }}
              >
                {strings.dashboard.Delete}
              </button>
            </td>
          </tr>
        );
      });
 
if(allStations.length>0){
    return (
        <div className='w-100'>
          
        <h5 className="text-white p-2 w-25 m-auto rounded-2 text-center my-1 shadow" style={{backgroundColor:"rgb(45 159 124)",minWidth:'120px'}}>
           {strings.dashboard.Stations}
        </h5>
            
        <Table striped responsive bordered hover className="w-100 m-auto text-center shadow">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>{strings.dashboard.station_name}</th>
              <th>{strings.dashboard.Address}</th>
              <th>{strings.dashboard.latitude}</th>
              <th>{strings.dashboard.Longitude}</th>
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

export default Stations;