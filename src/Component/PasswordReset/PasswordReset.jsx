import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import strings from "../../lang/lang";


import { changePassword, checkToken } from "../API/api";

export default function PasswordReset() {
  let navigate = useNavigate();
  let {token} = useParams()
  const [state, setState] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  useEffect(() => {
    checkToken(token).catch(err=>navigate('/'))
  

  }, [])
  
  const onSubmit = (user) => {
    user.token = token
     changePassword(user) .then(({ data }) => {
        // console.log(data);
        navigate("/signin");
     }).catch(err=>{

         reset({ password: "", cpassword: "" });
         setState(reset);
        })
        }
      

    // console.log(user);
  

  return (
    <div className="contentRegister ">
      <h3 className="text-center pt-4 pb-2 mb-3">{strings.ResetPassword.resetPasswordForm}</h3>
      <div className="container py-3 w-lg-50 w-md-100 w-sm-100">
        <div className="row justify-content-center align-items-center " style={{width:"50%"}}>
     
          <div className="col-lg-6">
            <div className="contentForm">
              <Form onSubmit={handleSubmit(onSubmit)}>
             
        
                <Form.Group className="mb-3 ">
                  <input
                    className={"form-control " +(strings.getLanguage()=='en' || 'rtl')}
                    id="password"
                    type="password"
                    name="password"
                    placeholder={strings.ResetPassword.EnterYourNewPassword}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "New Password is required",
                      },
                      pattern: {
                        value: /^[A-Z][a-z0-9]{3,8}$/,
                        message:
                          " password required must start capital and 3-8 any character from(a-z or 0-9)",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="error_message text-danger ">
                      {errors.password.message}
                    </p>
                  )}
                </Form.Group>

                <Form.Group className="mb-1">
                  <input
                    className={"form-control " +(strings.getLanguage()=='en' || 'rtl')}
                    id="cpassword"
                    type="password"
                    name="cpassword"
                    placeholder={strings.ResetPassword.ConfirmYourPassword}
                    {...register("cpassword", {
                      required: {
                        value: true,
                        message: "CPassword is required",
                      },
                      validate: (value) => {
                        if (value !== getValues("password"))
                          return "CPassword must match Password";
                      },
                    })}
                  />
                  {errors.cpassword && (
                    <p className="error_message text-danger ">
                      {errors.cpassword.message}
                    </p>
                  )}
                </Form.Group>
        
                <div className="text-danger text-center">
                  {{ state } ? <h6>{state}</h6> : ""}
                </div>
                <div>
                  <Button
                    className="m-auto w-100 text-center btn submit"
                    type="submit"
                  >
                    {strings.ResetPassword.saveNewPassword}
                  </Button>
                  
                </div>
              </Form>
       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}