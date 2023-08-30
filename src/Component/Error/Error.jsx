import React from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Link } from 'react-router-dom';
import strings from "../../lang/lang";



import BackImage from "../Error/pg.jpg";

const Error = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${BackImage})`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Cambria",
      }}
    >
      <Paper
        sx={{
          width: { xs: "320px", sm: "450px" },
          height: { xs: "320px", sm: "450px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(255,255,255,0.7)",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "150px", sm: "200px" },
            fontFamily: "Passion One",
            color: "#34303e",
          }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "20px", sm: "25px" }, marginBottom: "15px" }}
        >
          {strings.Error.pageNotFound}
        </Typography>
        <Link to='/'>
        <Button variant="contained" color="success">{strings.Error.backToHome}</Button>
      </Link>
      </Paper>
    </Box>
  );
};
export default Error;
