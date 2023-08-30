import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MenuItem, OutlinedInput, Select, useTheme } from "@mui/material";
import { getStationByID, updateStation } from "../API/api";
import strings from "../../lang/lang";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name ,personName, theme) 
{
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const UpdataStation = () => {
  let [station, setStation] = useState({});
  let { stationId } = useParams();
  const theme = useTheme();

  useEffect(() => {
 
    getStationByID(stationId)  .then((res) => {
        setStation(res.data.data);
      });
  }, [stationId]);

  let token = localStorage.getItem("userToken");
  let navigate = useNavigate();
  const [state, setState] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();
  let Plugs =['DC Quick Charge (CHAdeMo) variety of power ratings is 10-400KW',
                'DC Quick Charge(CCS/SAE Combo) variety of power ratings is 24-350 kW',
              'AC Mennekes(Type 2) variety of power ratings is 3.7-22KW'
              ]
  const onSubmit = (newStation) => {

   newStation.Plugs = typeof getValues('Plugs')=='string'?getValues('Plugs').split(','):getValues('Plugs')
  
   updateStation(newStation,stationId)   .then(({ data }) => {

        if (data.message === "updated sucess") {
          navigate("/dashboard/stations");
        } else {
          reset({ stations_name: "", address: "", longitude: "", latitude: "",number_of_plugs:"",availability:"",Amenities:"",Description:"",phone:"",photo:"" });
          setState(data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };
  if (Object.keys(station).length > 0) {
    return (
      <div className="contentRegister ">
        <h3 className="text-center pt-4 pb-2 mb-3">{strings.dashboard.updateStation}</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="container py-3">
            <div className="row w-100">
              <div className="col-md-6">
                <Form.Group className="mb-3 mt-1">
                  <Form.Label htmlFor="station_name">{strings.dashboard.station_name}</Form.Label>
                  <input
                    className="form-control"
                    name="station_name"
                    id="station_name"
                    placeholder="Enter station_name"
                   onChange={(e) => setValue("station_name", e.target.value)}
                   defaultValue={station.station_name}
                    type="text"
                    {...register("station_name", {
                      required: {
                        value: true,
                        message: "station_name is required",
                      },
                    })}
                  />
                  {errors.stations_name && (
                    <p className="error_message text-danger ">
                      {errors.station_name.message}
                    </p>
                  )}
  
                </Form.Group>
  
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 mt-1">
                  <Form.Label htmlFor="station_AR">{strings.dashboard.station_AR}</Form.Label>
                  <input
                    className="form-control"
                    name="station_AR"
                    id="station_AR"
                    placeholder={strings.dashboard.station_AR}
                   onChange={(e) => setValue("station_AR", e.target.value)}
                   defaultValue={station.station_AR}
                    type="text"
                    {...register("station_AR", {
                      required: {
                        value: true,
                        message: "station_AR is required",
                      },
                    })}
                  />
                  {errors.stations_AR && (
                    <p className="error_message text-danger ">
                      {errors.station_AR.message}
                    </p>
                  )}
  
                </Form.Group>
  
              </div>

              <div className="col-md-6">
  
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="address">{strings.dashboard.Address}</Form.Label>

                  <input
                    className="form-control"
                    id="address"
                    type="text"
                    name="address"
                    defaultValue={station.address}
                    onChange={(e) => setValue("address", e.target.value)}
                    placeholder="Enter Address Station"
                    {...register("address", {
                      required: { value: true, message: "address is required" },
                    })}
                  />
                  {errors.address && (
                    <p className="error_message text-danger ">
                      {errors.address.message}
                    </p>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
  
  <Form.Group className="mb-3">
    <Form.Label htmlFor="address_AR">{strings.dashboard.Address_AR}</Form.Label>

    <input
      className="form-control"
      id="address_AR"
      type="text"
      name="address_AR"
      defaultValue={station.address_AR}
      onChange={(e) => setValue("address_AR", e.target.value)}
      placeholder="Enter Address Station"
      {...register("address_AR", {
        required: { value: true, message: "address AR is required" },
      })}
    />
    {errors.address_AR && (
      <p className="error_message text-danger ">
        {errors.address_AR.message}
      </p>
    )}
  </Form.Group>
</div>

              <div className="col-md-6">
                <Form.Group className="mb-3 ">
                  <Form.Label htmlFor="longitude">{strings.dashboard.latitude}</Form.Label>

                  <input
                    className="form-control"
                    id="longitude"
                    type="text"
                    name="longitude"
                    defaultValue={station.longitude}
                    onChange={(e) => setValue("longitude", e.target.value)}
                    placeholder={strings.dashboard.EnterLongitude}
                    {...register("longitude", {
                      required: {
                        value: true,
                        message: "longitude is required",
                      },
                    })}
                  />
                  {errors.longitude && (
                    <p className="error_message text-danger ">
                      {errors.longitude.message}
                    </p>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 ">
                  <Form.Label htmlFor="latitude">{strings.dashboard.latitude}</Form.Label>

                  <input
                    className="form-control"
                    id="latitude"
                    type="text"
                    name="latitude"
                    defaultValue={station.latitude}
                    onChange={(e) => setValue("latitude", e.target.value)}
                    placeholder={strings.dashboard.Enterlatitude}
                    {...register("latitude", {
                      required: {
                        value: true,
                        message: "latitude is required",
                      },
                    })}
                  />
                  {errors.latitude && (
                    <p className="error_message text-danger ">
                      {errors.latitude.message}
                    </p>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 ">
                  <Form.Label htmlFor="number_of_Plugs">
                   {strings.dashboard.number_of_Plugs}
                  </Form.Label>

                  <input
                    className="form-control"
                    id="number_of_Plugs"
                    type="number"
                    name="number_of_Plugs"
                    defaultValue={station.number_of_Plugs}
                    onChange={(e) =>
                      setValue("number_of_Plugs", e.target.value)
                    }
                    placeholder={strings.dashboard.Enternumber_of_plugs}
                    {...register("number_of_Plugs", {
                      required: {
                        value: true,
                        message: "number_of_Plugs is required",
                      },
                    })}
                  />
                  {errors.number_of_plugs && (
                    <p className="error_message text-danger ">
                      {errors.number_of_Plugs.message}
                    </p>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 ">
                  <Form.Label htmlFor="availability">{strings.dashboard.Availability}</Form.Label>

                  <input
                    className="form-control"
                    id="availability"
                    type="text"
                    name="availability"
                    defaultValue={station.availability}
                    onChange={(e) => setValue("availability", e.target.value)}
                    placeholder={strings.dashboard.EnterAvailability}
                    {...register("availability", {
                      required: {
                        value: true,
                        message: "availability is required",
                      },
                    })}
                  />
                  {errors.availability && (
                    <p className="error_message text-danger ">
                      {errors.availability.message}
                    </p>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 ">
                  <Form.Label htmlFor="Amenities">{strings.dashboard.Amenities}</Form.Label>

                  <input
                    className="form-control"
                    id="Amenities"
                    type="text"
                    name="Amenities"
                    defaultValue={station.Amenities}
                    onChange={(e) => setValue("Amenities", e.target.value)}
                    placeholder={strings.dashboard.EnterAmenities}
                    {...register("Amenities", {
                      required: {
                        value: true,
                        message: "Amenities is required",
                      },
                    })}
                  />
                  {errors.Amenities && (
                    <p className="error_message text-danger ">
                      {errors.Amenities.message}
                    </p>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 ">
                  <Form.Label htmlFor="Amenities_AR">{strings.dashboard.Amenities_AR}</Form.Label>
                  <input
                    className="form-control"
                    id="Amenities_AR"
                    type="text"
                    name="Amenities_AR"
                    defaultValue={station.Amenities_AR}
                    onChange={(e) => setValue("Amenities_AR", e.target.value)}
                    placeholder={strings.dashboard.EnterAmenities}
                    {...register("Amenities_AR", {
                      required: {
                        value: true,
                        message: "Amenities AR is required",
                      },
                    })}
                  />
                  {errors.Amenities_AR && (
                    <p className="error_message text-danger ">
                      {errors.Amenities_AR.message}
                    </p>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 ">
                  <Form.Label htmlFor="Description">{strings.dashboard.Description}</Form.Label>

                  <input
                    className="form-control"
                    id="Description"
                    type="text"
                    name="Description"
                    defaultValue={station.Description}
                    onChange={(e) => setValue("Description", e.target.value)}
                    placeholder={strings.dashboard.EnterDescription}
                    {...register("Description", {
                      required: {
                        value: true,
                        message: "Description is required",
                      },
                    })}
                  />
                  {errors.Description && (
                    <p className="error_message text-danger ">
                      {errors.Description.message}
                    </p>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 ">
                  <Form.Label htmlFor="Description_AR">{strings.dashboard.Description_AR}</Form.Label>
                  <input
                    className="form-control"
                    id="Description_AR"
                    type="text"
                    name="Description_AR"
                    defaultValue={station.Description_AR}
                    onChange={(e) => setValue("Description_AR", e.target.value)}
                    placeholder={strings.dashboard.EnterDescription}
                    {...register("Description_AR", {
                      required: {
                        value: true,
                        message: "Description AR is required",
                      },
                    })}
                  />
                  {errors.Description_AR && (
                    <p className="error_message text-danger ">
                      {errors.Description_AR.message}
                    </p>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 ">
                  <Form.Label htmlFor="phone">{strings.dashboard.phone}</Form.Label>

                  <input
                    className="form-control"
                    id="phone"
                    type="text"
                    name="phone"
                    defaultValue={station.phone}
                    onChange={(e) => setValue("phone", e.target.value)}
                    placeholder={strings.dashboard.Enterphone}
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "phone is required",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="error_message text-danger ">
                      {errors.phone.message}
                    </p>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 ">
                  <Form.Label htmlFor="photo">{strings.dashboard.photo}</Form.Label>

                  <input
                    className="form-control"
                    id="photo"
                    type="text"
                    name="photo"
                    defaultValue={station.photo}
                    onChange={(e) => setValue("photo", e.target.value)}
                    placeholder={strings.dashboard.Enterphoto}
                    {...register("photo", {
                      required: {
                        value: true,
                        message: "photo is required",
                      },
                    })}
                    />
                  {errors.photo && (
                    <p className="error_message text-danger ">
                      {errors.photo.message}
                    </p>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                  <Form.Label htmlFor="photo">{strings.dashboard.Plugs}</Form.Label>
                <Form.Group className="mb-3 ">

                  <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name w-100"
          multiple
          defaultValue={station.Plugs}
          onChange={(e) => setValue("Plugs",typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value )}
          value={ getValues('Plugs') }
          {...register("Plugs", {
            required: {
              value: true,
              message: "Plugs is required",
            },
          })}   
          input={<OutlinedInput className="w-100 bg-white" label="Name" />}
          MenuProps={MenuProps}
        >
          {Plugs.map((name) => (
            <MenuItem
              key={name}
              value={name}
               style={getStyles(name,getValues('Plugs') || station.Plugs, theme)}
            >
              {name}
            </MenuItem>
          ))}
     
        </Select>
                  {errors.Plugs && (
                    <p className="error_message text-danger ">
                      {errors.Plugs.message}
                    </p>
                  )}
                </Form.Group>
              </div>
              <div className="text-danger text-center">
                {{ state } ? <h6>{state}</h6> : ""}
              </div>
              <div>
                <Button
                  className="m-auto w-100 text-center btn submit"
                  type="submit"
                >
                  {strings.dashboard.updateStation}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
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

export default UpdataStation;
