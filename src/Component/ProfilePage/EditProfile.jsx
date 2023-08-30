import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import "./style.css"
import strings from "../../lang/lang";


const EditProfile = (props) => {
    const [userData,setUserData]=useState();
    const [fullimage,setfullimage]=useState(true);
    const [isActive,setisActive] = useState(false);

    let token=localStorage.getItem("userToken");
    let decodedToken=jwtDecode(token);
    console.log(decodedToken.id);
    useEffect(() => {
       axios.get(`https://backend-ecocharge-v9vw.onrender.com/api/user/getone/${decodedToken.id}`)
         .then((res) => {
         setUserData(res.data);
      console.log("return data",res.data);
        });
        }, [decodedToken.id]);

        const handleChange=(e)=>
        {
           const {value,name}=e.target;
           console.log(name,value);
           setUserData((oldData) => ({ ...oldData, [name]: value }))
           console.log(userData)
       
        }
        const navigate=useNavigate();
        const [selectedImage,setSelectedImage]=useState()
const handleUpdate=(e)=>
 {
    e.preventDefault();
    if(userData){
      axios.put(`https://backend-ecocharge-v9vw.onrender.com/api/user/put/${userData?._id}`,userData)
      .then((res)=>{
        console.log(res.data)
        localStorage.setItem('userToken',res.data.token)
        props.newData(res.data);
        navigate('/profile');
      }).catch((err)=>{console.log(err)})
    //  fetch(`https://backend-ecocharge-v9vw.onrender.com/api/user/put/${userData?._id}`, 
    //  {
    //     method: 'PUT',
        
    //     body:JSON.stringify(userData) ,
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => {
    //     console.log("feeee");
    //     console.log(res);
        
    //     //   alert("Update Sucessfully :)");
    //       
    //     return res;
    // }).catch(err =>console.log( err));
}

 }

 const uploadImage=(file)=>
 {
    const formData=new FormData();
    formData.append("file",file);
    formData.append("upload_preset","ud1b7tsm");

    axios.post("https://api.cloudinary.com/v1_1/dqeuhyyic/image/upload",formData)
    .then((res)=>
    {console.log("imageeeeeee",res)

    setUserData((oldData) => ({ ...oldData, image: res?.data.secure_url}));

    //  navigate("/profile");
}
    )

   
 }
 console.log(userData);
 useEffect(()=>{
  console.log("New Data",userData);
  
 },[userData]

 )
if(userData)
{
return(
<>
    <div className="container">
        <div className={`card ${isActive ? "black" : "" }`}>
            <div className={`overlay ${fullimage ? "d-none" : "" }`}>
            </div>
            <div className="circle">
            <form onSubmit={handleUpdate} style={{width:"200px",textAlign:"center"}}>
                <span >
                    {/* <img alt="imageUser" src={`/public/Images/${userData?.image}`} /> */}
                    {
                        userData?.hasOwnProperty("image")?
                        <img alt="imageUser" src={userData?.image} />
                        :  <img alt="imageUser" src="/Images/use.png" /> 
                    }
                    </span>
                    <input type="file" name='image' style={{margin:"6px"}} onChange={(event)=>{
                        setSelectedImage(event.target.files[0]);
                        uploadImage(event.target.files[0]);
                    }}/>
                    <div className="form-group d-flex mb-3" style={{justifyContent: "space-evenly"}}>
                    <label className="col-3" style={{alignSelf:" center",width:"30%"}}>{strings.ProfilePage.name}</label>
                    <input className="form-control" style={{width:"65%"}} type="text" name="name"  value={userData?.name} onChange={handleChange} />       
                     </div>
    
                    <div style={{display:"flex",justifyContent:"space-evenly",width: "100%",marginTop:"inherit"}}>
                            <input className="btnTagEdit" type="submit" value={strings.ProfilePage.Save} />

                    </div>
                </form>
                
    
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

export default EditProfile;