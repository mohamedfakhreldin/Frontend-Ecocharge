import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import AvergeRating from './AvergeRating';
import strings from "../../../lang/lang";

const Cards = () => {
  let [stations, setStation] = useState([]);
  let [filterKey, setFilterKey] = useState("");
  let filterStations = stations.filter((station) =>
    station.station_name.toLowerCase().includes(filterKey.toLowerCase())
  );

  useEffect(() => {
    axios.get("https://backend-ecocharge-v9vw.onrender.com/api/stations/AllStations").then((res) => {
      setStation(res.data.data);
    });
  }, []);

  if (filterStations.length > 0 || stations.length > 0) {
    return (
      <section dir={strings.getLanguage()=='en' || 'rtl'} className="py-5 text-center"style={{fontFamily: "revert"}}>
        <h2 className="card-h pt-3">{strings.home.header}</h2>
        <p className="lead card-p text-dark " >
          {strings.home.p}
          <i className="fa-solid fa-charging-station"></i>
        </p>
        <div className="find-location">
          <input
            type="text"
            placeholder={strings.home.searchplaceholder}
            onChange={(e) => setFilterKey(e.target.value)}
          ></input>
        </div>
        <div className="container text-left pt-5">
          <div className="row d-flex w-100" >
            {(filterKey ? filterStations : stations).map((station) => (
              <div className="col-md-4  p-3 pb-4 rounded-3" key={station._id}>
                <div className="card-imge ">
                  <img src={station.photo} alt=""></img>
                </div>
                <Link to={`StationDetails/${station._id}`}>
                  <div className="card-content p-3 d-flex justify-content-around align-items-center">
                    <div className="text-center">
                      <h5 className="stationName pt-1 d-block text-center mt-1">
                      {strings.getLanguage() == 'ar'?station.station_AR:station.station_name}
                      </h5>
                      <div className="text-center mb-2 rating">
                        <AvergeRating stationId={station._id} />
                      </div>
                      <p className="pt-1 text-dark text-center" style={{fontFamily: "revert"}}>
                      {strings.getLanguage() == 'ar'?station.address_AR:station.address}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="lds-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
};

export default Cards;
