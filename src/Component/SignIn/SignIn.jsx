
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import "./style.css";
import strings from "../../lang/lang";


export default function SignIn(props) {
  let navigate = useNavigate();
  const [state, setState] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (user) => {
    axios
      .post("https://backend-ecocharge-v9vw.onrender.com/api/users/auth/signin", user)
      .then(({ data }) => {
        console.log(data);
        if (data.message === "signin successfully") {
            localStorage.setItem("userToken",data.token)
            props.saveUserData()

          // navigate("/nearestStation");
          navigate("/profile");
        } else {
          reset({ password: ""});
          setState(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(user);
  };

  return (
    <div className="contentRegister">
      <h3 className="text-center pt-4 pb-2 mb-3">{strings.Login.loginForm}</h3>
      <div className="container py-3">
        <div className="row justify-content-center align-items-center ">
          <div className="col-md-6">
            <div className="contentImage">
              <img
                src="./Images/electric-vehicle.jpg"
                className="w-100 rounded-2"
                alt=""
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="contentForm">
              <Form onSubmit={handleSubmit(onSubmit)}>
           
                <Form.Group className="mb-3 mt-2">
                  <input
                    className={"form-control " +(strings.getLanguage()=='en' || 'rtl')}
                    id="email"
                    type="email"
                    name="email"
                    placeholder={strings.Login.placeholderEmail}
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Email not valid",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="error_message text-danger ">
                      {errors.email.message}
                    </p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3 ">
                  <input
                    className="form-control"
                    id="password"
                    type="password"
                    name="password"
                    placeholder={strings.Login.placeholderPassword}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
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
                <p className="m-0 p-0" >{strings.Login.forgetPassword}  
            <Link to="/forgetpassword" className='text-danger'>{strings.Login.resetPassword}</Link>
            </p>
            <p className="m-0 p-0" >{strings.Login.DoNotHaveAnAcount}  
            <Link to="/register" className='text-danger'>{strings.Login.register}</Link>
            </p>

                <div className="text-danger text-center">
                  {{ state } ? <h6>{state}</h6> : ""}
                </div>
                <div>
                  <Button
                    className="m-auto w-100 text-center btn submit"
                    type="submit"
                  >
                    {strings.Login.login}
                  </Button>
                  {/* <h5 style={{margin:"11px"}}>{strings.Login.or}</h5> */}
                </div>
              </Form>
              {/* <Button onClick={()=>window.open('https://backend-ecocharge-v9vw.onrender.com/auth/google/callback','_self')} className="d-flex justify-content-center align-items-center m-auto w-100 text-center btn text-white google">
                    <FcGoogle  className="text-2xl bg-white rounded-full mr-2" />{" "}
                          {strings.Login.continueWithGoogle} </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}