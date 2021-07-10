import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfiq";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import "./Login.css";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

const LogIn = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
  
    let { from } = location.state || { from: { pathname: "/" } };
  
    const [newUser, setNewUser] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
        
        //create new account of email and password
        if (newUser) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then((response) => {
              const newUserInfo = { ...loggedInUser };
              newUserInfo.error = "";
              newUserInfo.success = true;
              setLoggedInUser(newUserInfo);
            })
            .catch((error) => {
              const errorMessage = error.message;
              const newUserInfo = { ...loggedInUser };
              newUserInfo.error = errorMessage;
              newUserInfo.success = false;
              setLoggedInUser(newUserInfo);
            });
        }
        
        //sing in with email and password
        if(!newUser) {
          firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then((response) => {
              const newUserInfo = { ...loggedInUser };
              newUserInfo.error = "";
              newUserInfo.success = true;
              setLoggedInUser(newUserInfo);
              const { displayName, email } = response.user;
              const userData = { name: displayName, email: email };
              setLoggedInUser(userData);
              history.replace(from);
            })
            .catch((error) => {
              const errorMessage = error.message;
              const newUserInfo = { ...loggedInUser };
              newUserInfo.error = errorMessage;
              newUserInfo.success = false;
              setLoggedInUser(newUserInfo);
            });
        }
      };
    return (
        <div className="m-auto">
        <div className="logInform">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center pb-3">Log In</h3>
            <input
              type="checkbox"
              onChange={() => setNewUser(!newUser)}
              name="newUser"
              id=""
            />
            <label htmlFor="newUser">Are you new User</label>
            {newUser && (
              <div>
                <h5>Please Create a account</h5>
                <input
                  className="w-100 border-primary rounded"
                  placeholder="Enter your Name"
                  {...register("name", { required: true })}
                />{" "}
                <br />
                {errors.exampleRequired && (
                  <span>This field is required</span>
                )}{" "}
                <br />
              </div>
            )}
            <input
              className="w-100 border-primary rounded"
              placeholder="Enter your Email"
              {...register("email", { required: true })}
            />{" "}
            <br />
            {errors.exampleRequired && (
              <span>This field is required</span>
            )}{" "}
            <br />
            <input
              className="w-100 border-primary rounded"
              placeholder="Enter your Password"
              {...register("password", { required: true })}
            />{" "}
            <br />
            {errors.exampleRequired && (
              <span>This field is required</span>
            )}{" "}
            <br />
            <input className="btn btn-primary" type="submit" />
          </form>
          <p className="text-danger">{loggedInUser.error}</p>
          {loggedInUser.success && (
            <p className="text-success">
              {" "}
              User {newUser ? "created" : "log in"} successfully
            </p>
          )}
        </div>
      </div>
    );
};

export default LogIn;