import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const LOGIN = "/login";

export const Login = () => {
  const Gmail = useRef(null);
  const Passcode = useRef(null);

  const { user, setUser } = useAuth();

  const [visiblemodel, setVisibleModel] = useState(false);
  const navigate = useNavigate();
  const DemoPaper = styled(Paper)(({ theme }) => ({
    marginRight: "50px",
    marginLeft: "50px",
    paddingTop: "25px",
    paddingBottom: "25px",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
  }));
console.log(user);
  const SubmitHandler = async (event) => {
    event.preventDefault();
    console.log(Gmail.current.value, Passcode.current.value);

    const response = await axios.post(LOGIN, {
      gmail: Gmail.current.value,
      passwords: Passcode.current.value,
    });
    console.log(response?.data?.data[0]);
    if (response?.data?.status) {
      setUser({
        user_id: response?.data?.data[0].id,
        username: response?.data?.data[0].username,
        gmail: Gmail.current.value,
        password: Passcode.current.value,
      });
      localStorage.setItem("username", response?.data?.data[0].username);
      localStorage.setItem("email", response?.data?.data[0].email);
      localStorage.setItem("user_id", response?.data?.data[0].id);
      navigate("/");
    } else {
      alert("Login Unsuccessfull!!");
    }
  };

  return (
    <div className="w-full pt-20 bg-purple-200 h-svh">
      <DemoPaper variant="outlined" sx={{ backgroundColor: "#d5cef8" }}>
        <div className="flex flex-row items-center justify-center w-full ">
          <div div className="flex flex-col items-center justify-center w-full">
            <p className="mt-5 mb-5 text-2xl font-semibold text-purple-950">
              Login Here
            </p>
            <form
              className="flex flex-col items-center justify-center w-full"
              onSubmit={(event) => {
                SubmitHandler(event);
              }}
              action=""
              method="post"
            >
              <TextField
                id="filled-basic"
                color="secondary"
                className="w-2/4 pt-2 pb-2 pl-5 pr-5 mt-5 mb-5 border-2 rounded-lg border-purple-950 focus:outline-none placeholder:text-purple-400 max-md:w-3/4"
                label="email"
                variant="filled"
                inputRef={Gmail}
                sx={{ marginTop: "15px", marginBottom: "15px" }}
              />

              <TextField
                id="filled-basic"
                className="w-2/4 pt-2 pb-2 pl-5 pr-5 mt-5 mb-5 border-2 rounded-lg border-purple-950 focus:outline-none placeholder:text-purple-400 max-md:w-3/4"
                color="secondary"
                label="password"
                variant="filled"
                type="password"
                inputRef={Passcode}
                sx={{ marginTop: "15px", marginBottom: "15px" }}
              />

              <button
                className="pt-2 pb-2 pl-5 pr-5 mt-5 mb-10 rounded-lg gradient"
                type="Submit"
              >
                Login
              </button>
            </form>
            {visiblemodel && (
              <Link to={"/SignUp/login"}>
                <p style={{ textAlign: "center" }} className="Return">
                  Return To Login Page
                </p>
              </Link>
            )}
          </div>
        </div>
      </DemoPaper>
    </div>
  );
};
