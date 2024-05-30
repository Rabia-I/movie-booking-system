import {
  Box,
  Dialog,
  FormLabel,
  TextField,
  Typography,
  Button,
  IconButton
} from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";

const labelStyles = { mt: 1, md: 1 };


const AuthForm = ({onSubmit, isAdmin}) => {
    const [inputs, setInputs] = useState({ name:"", email:"", password:""});


    const [isSignup, setSignup] = useState(false);
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
    const handleSumbit= (e)=>{
          e.preventDefault();
          onSubmit({inputs, signup: isAdmin ? false : isSignup});

    };


  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {isSignup ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handleSumbit}>
        <Box
          padding={6}
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          width={400}
          margin="auto"
          alignContent={"center"}
        >
          {!isAdmin && isSignup && (
            <>
              {" "}
              <FormLabel sx={labelStyles}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type={"text"}
                name="name"
              />{" "}
            </>
          )}

          <FormLabel sx={labelStyles}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"email"}
            name="email"
          />

          <FormLabel sx={labelStyles}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"password"}
            name="password"
          />

          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>

          {!isAdmin && <Button
            onClick={() => setSignup(!isSignup)}
            sx={{ mt: 2, borderRadius: 10 }}
            fullWidth
          >
            Switch To {isSignup ? "Login" : "Signup"}
          </Button>}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
