import React,{useState} from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { sendEmailForReset } from '../API/api'
import strings from "../../lang/lang";
import "./reset-style.css";


export default function CheckEmail() {
    const [success, setSuccess] = useState('')
    let navigate = useNavigate()
const handleSubmit = (e)=>{
    e.preventDefault()
sendEmailForReset(e.target.email.value).then(res=>setSuccess(res.data))
}   
  return (
    <div className="container w-lg-50 w-md-50 w-sm-100 mt-lg-5 mt-md-1 mt-sm-1 mb-md-1 mb-sm-1 bg-white p-5">
      <div
        className="row w-lg-50 w-md-100 w-sm-100"
      >
        <div className="col-md-12">
          {success && (
            <div className="alert alert-success w-100">{success}</div>
          )}
        </div>
        <div className="col-md-12 col-sm-12">
          <form onSubmit={handleSubmit} className="w-100">
            <label>{strings.ResetPassword.sendEmail}</label>
            <input
              className="form-control"
              id="email"
              type="email"
              name="email"
              placeholder={strings.ResetPassword.enterYourEmail}
              pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
            />
            <Button
              className="m-auto w-100 text-center btn submit"
              type="submit"
            >
              {strings.ResetPassword.sendEmail}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
