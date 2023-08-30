import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Header/Navbar';
import {BrowserRouter,Routes,Route,Navigate, withRouter} from "react-router-dom";
import Home from '../Component/Home/Home';
import Station from '../Component/StationById/Station';
import Register from '../Component/Register/Register';
import Error from '../Component/Error/Error';
import About from '../Component/About/About';
import Service from '../Component/Services/Service';
import SignIn from '../Component/SignIn/SignIn';
import Footer from '../Component/Footer/Footer';
import jwtDecode from 'jwt-decode';
import NearestRoad from '../Component/NearestRoad/NearestRoad';
import GoogleSigninSuccess from '../Component/SignIn/GoogleSigninSuccess';
import Dashboard from '../Component/dashboard/dashboard';

import AddStation from '../Component/dashboard/addStation';
import UpdataStation from '../Component/dashboard/updataStation';
import { useNavigate } from 'react-router';
import Logout from '../Component/Logout';
import CheckEmail from '../Component/PasswordReset/CheckEmail';
import PasswordReset from '../Component/PasswordReset/PasswordReset';
import { checkAdmin, checkUser } from '../Component/API/api';
import Profile from '../Component/ProfilePage/Profile';
import EditProfile from '../Component/ProfilePage/EditProfile';
import strings from '../lang/lang';
function App() {
  const [userData,setUserData]=useState(null);
  // const [profileData,setProfileData]=useState({})
  
  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      saveUserData()
    }
  },[])
  
  let logOut=()=>{
    setUserData(null)
    localStorage.removeItem("userToken");
    
  }
  let newData =(data)=>{
    setUserData(data)
  }
  let saveUserData=()=>{
    try{

      let token=localStorage.getItem("userToken"); //incoded token
      let decodedToken =jwtDecode(token);
      setUserData(decodedToken);

    }catch(err){
      
    }
  }
  
  
  let ProtectedRoute=(props)=>{
 const navigate = useNavigate()
 const [check, setCheck] = useState(false)
    if(localStorage.getItem("userToken") === null){
      return <Navigate to="/signin"/>
    }else{
      let token=localStorage.getItem("userToken"); //incoded token
      let decodedToken =jwtDecode(token);
      if(props.admin ){
        
        checkAdmin().then(res=>{!res.data.message || navigate('/login')
        setCheck(true)
        })

  }else{
    checkUser().then(res=>{!res.data.message || navigate('/login')
    setCheck(true)
    })
  }
  if(check){
return props.children;
   }
      }
      
      
    }
    return (
      < div id='root2' dir={strings.getLanguage()=='en' || 'rtl'}>
<BrowserRouter >
{/* <Header></Header> */}
<Navbar userData={userData} logOut={logOut} />
 <Routes className="bodyApp" >
  
  <Route path="/" element={<Home/>}></Route>

  <Route path="StationDetails/:stationId" element={<Station/>}></Route>
  <Route path="/register" element={<Register/>}></Route>
  <Route path="/logout" element={<Logout logOut={logOut}/>}></Route>
  <Route path="/signin" element={<SignIn saveUserData={saveUserData}/>}></Route>
  <Route path="/google/signin/" element={<GoogleSigninSuccess saveUserData={saveUserData}/>}></Route>
  <Route path="/service" element={<Service/>}></Route>
  <Route path="/forgetpassword" element={<CheckEmail/>}></Route>
  <Route path="/resetpassword/:token" element={<PasswordReset/>}></Route>
  <Route path="/nearestStation" element={ <ProtectedRoute><NearestRoad/></ProtectedRoute>}></Route>
  <Route path="/dashboard/*" element={ <ProtectedRoute admin={true}><Dashboard/></ProtectedRoute>}></Route>
 <Route path="/profile" element={ <ProtectedRoute><Profile logOut={logOut} /></ProtectedRoute>}></Route>
  <Route path="/editprofile" element={<ProtectedRoute><EditProfile newData={newData} /></ProtectedRoute>}></Route>

  <Route path="about" element={<About/>}></Route>
  <Route path="*" element={<Error/>}></Route>

</Routes>
<Footer/>
</BrowserRouter> 
    </div>
  );
}

export default (App);
