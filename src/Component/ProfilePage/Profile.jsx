import React,{useEffect, useState} from "react";
import "./style.css";
import axios from 'axios';
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import strings from "../../lang/lang";

// import ParticleEffectButton from 'react-particle-effect-button'

const Profile=(props)=>{
    const [userData,setUserData]=useState();

    const [usenumber,setusenumber] = useState(1);
    
    const [fullimage,setfullimage]=useState(true);
    const [isActive,setisActive] = useState(false);
    const [buttonState,setButtonState]=useState({hidden:false});
    const navigate=useNavigate();
    
    
    
    const AddUser=()=>{
    setusenumber(usenumber+1);
    }
    
    let token=localStorage.getItem("userToken");
        let decodedToken=jwtDecode(token);
        console.log(decodedToken.id);
        useEffect(() => {
           axios.get(`https://backend-ecocharge-v9vw.onrender.com/api/user/getone/${decodedToken.id}`)
             .then((res) => {
             setUserData(res.data);
                // console.log(res.data);
            
            });
                
            }, [decodedToken.id]);

   
    const handleEdit=()=>
    {
        navigate("/editprofile");
    }
    if(userData)
    {
    return(
    <>
        <div className="container">
            <div className={`card ${isActive ? "black" : "" }`}>
                <div className={`overlay ${fullimage ? "d-none" : "" }`}>
                </div>
                <div className="circle">
                    <span >
                        {
                            userData?.hasOwnProperty("image")?
                            <img alt="imageUser" src={userData?.image} />
                            :  <img alt="imageUser" src="/Images/use.png" /> 
                        }
                        
                       
                        </span>
                        {console.log(userData)}
                    <h3 style={{marginTop:"1.6rem",textAlign: "center ",fontWeight:"bolder"}}>{userData?.name}</h3>
                    <h6>{userData?.email}</h6>

                        <div style={{display:"flex",justifyContent:"space-evenly",width: "100%",marginTop:"inherit"}}>
                        <button onClick={handleEdit}  className='btnTag btn btn-primary btn-lg sendBtn '>{strings.ProfilePage.edit}</button>
                    <button onClick={props.logOut}  className='btnTag btn btn-primary btn-lg sendBtn '><Link to="/logout" style={{color:"white"}}>{strings.ProfilePage.logOut}</Link></button>
                        </div>
                    
        
                </div>
       
            </div>
    
        </div>
    
    </>
    );
    }
    else
    
    {
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
    }
    export default Profile;