import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";
const AvergeRating = (props) => {
    const {stationId}=props;
    let [averageRating, setAverRating] = useState(0);
    let idealStar=0
    useEffect(() => {
      if (stationId) {
        axios
          .get(`https://backend-ecocharge-v9vw.onrender.com/api/rating/rateStation/${stationId}`)
          .then((res) => {
            //  console.log(res.data.rate)
            setAverRating(res.data.rate) })
      }
    }, [stationId]);
    console.log(averageRating);

    return (
      <div className="star-rating" style={{display:"inline"}}>
        {[...Array(5)].map((star, index) => {
          index += 1;
        //   console.log(index)

          return (
            <button
              type="button"
              key={index}
              className={index <= (averageRating || idealStar) ? "on" : "off"}
              //  value={averageRating}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };
  export default AvergeRating;