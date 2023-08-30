import axios from "axios";
import { Navigate } from "react-router";

const requestWithOutToken = axios.create({
  baseURL: "https://backend-ecocharge-v9vw.onrender.com/api/",
});
function config(){
    return {
        headers:{authorization:'Bearer '+localStorage.getItem('userToken')}
    }
}
const requestWithToken = axios.create({
  baseURL: "https://backend-ecocharge-v9vw.onrender.com/api/",
});
const sendEmailForReset = async (email)=>{

  let  resp = await requestWithOutToken({
        method:"post",
        url:'passwordtoken/token',
        data:{email}
    })
    return resp
}
const checkToken=(token)=>{
    return  requestWithOutToken.get('passwordtoken/'+token)
}

const changePassword = async(data)=>{
  return await  requestWithOutToken.post('passwordtoken/reset',data)
}
const getAllStation = ()=>{
    return requestWithOutToken.get("stations/AllStations")
}
const deleteStation = async(id)=>{
return await  requestWithToken.delete(`stations/deleteStation/${id}`,config())
}
const updateStation = async(newStation,stationId)=>{
  return await requestWithToken.put(`stations/updateStation/${stationId}`,newStation,config())
}
const addStation  = async(station)=>{
   return await requestWithToken.post("stations/addstation",station,config())
}
const getStationByID = (id)=>{
return    requestWithOutToken.get(`stations/station/${id}`)
} 
const checkAdmin = async()=>{
    return  requestWithToken.get('users/auth/checkA',config());
    
   

}
const checkUser = ()=>{
    return   requestWithToken.get('users/auth/checkU',config())
    
}
export {
    addStation,
    updateStation,
    getStationByID,
    deleteStation,
    sendEmailForReset,
    checkToken,
    getAllStation,
    changePassword,
    checkAdmin,
    checkUser

}