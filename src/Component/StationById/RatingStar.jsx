import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import "./styleStation.css";
const StarRating = (props) => {
    const {stationId}=props;
    // console.log(stationId);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const handleRating=()=> 
    {
        setHover(rating)
    }
        console.log(`rating from front = ${rating}`)
        let token=localStorage.getItem("userToken");
        // let decodedToken=jwtDecode(token);
        // console.log(decodedToken.id);
        useEffect(() => {
            if(rating)
            {
            axios.post(`https://backend-ecocharge-v9vw.onrender.com/api/rating/rateStation`,{rating,station:stationId},{
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
              .then((res) =>console.log(res.data))
          }},[rating,stationId]);
    return (
      <div className="star-rating" style={{display:"inline"}}>
        {[...Array(5)].map((star, index) => {
          index += 1;
        //   console.log(index)

          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() =>
                { 
                    setRating(index);
                    // console.log(`click = ${index}`)

                }}
              onMouseEnter={() =>
                { setHover(index)
                    // console.log("sdfghj")
                }}
              onMouseLeave={handleRating}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };
  export default StarRating;