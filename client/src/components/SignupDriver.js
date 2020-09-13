import React, {useContext, useState} from "react";
import * as Yup from "yup";
import login from "./../img/login.jpg";
import axios from "axios";
import {AuthContext} from "../AuthContext";
import {useFormik} from "formik";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";
import ReactWOW from "react-wow";
import {ToastProvider, useToasts} from "react-toast-notifications";

function Signup() {
  let history = useHistory();
  const {addToast} = useToasts();
  const authContext = useContext(AuthContext);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      number: "",
      password: "",
      name: "",
      gender: "",
      age: "",
    },
    validationSchema: Yup.object({
      number: Yup.string()
        .required("Required")
        .min(9, "10 number at least")
        .matches(phoneRegExp, "only number"),
      password: Yup.string().required("Required").min(8, "8 char at least"),
      name: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      age: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const data = {
        number: values.number,
        password: values.password,
        name: values.name,
        gender: values.gender,
        age: values.age,
      };
      console.log(data);

      axios
        .post("http://localhost:5000/register/driver", data)
        .then((res) => {
          console.log("uppppu", res);
          if (res.data.sucess == 1) {
            const token = res.data.token;
            const inst = res.data.inst;
            localStorage.setItem("token", token);
            localStorage.setItem("number", values.number);
            localStorage.setItem("password", values.password);
            localStorage.setItem("name", values.name);
            localStorage.setItem("age", values.age);
            localStorage.setItem("gender", values.gender);
            authContext.setAuth(token);
            localStorage.setItem("isdriver", true);
            addToast("sign up Successfully", {appearance: "success"});

            history.push("/");
          }
        })
        .catch((err) => {
          addToast("error try again", {appearance: "error"});
        });

      this.formik.resetForm({});
    },
  });
  return (
    <div className="container shadow-lg login  d-flex justify-content-center rounded mt-5">
      <form onSubmit={formik.handleSubmit}>
        <span className=" mt-4 d-flex justify-content-center ">
          <i className="fas fa-lock fa-3x mt-3 text-white"> </i>{" "}
        </span>{" "}
        <h1 className="mt-3 text-white text-center mb-5"> Sign up Driver </h1>{" "}
        <div>
          <input
            type="string"
            name="name"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="mb-5 shadow-sm mt-3  bg-light form-control form-control-lg"
          />{" "}
          {formik.touched.name && formik.errors.name ? (
            <h6 className="text-danger"> {formik.errors.name} </h6>
          ) : null}{" "}
        </div>{" "}
        <div>
          <input
            type="number"
            name="number"
            id="number"
            placeholder="Mobile"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.number}
            className="mb-5 shadow-sm  bg-light form-control form-control-lg"
          />{" "}
          {formik.touched.number && formik.errors.number ? (
            <h6 className="text-danger"> {formik.errors.number} </h6>
          ) : null}{" "}
        </div>{" "}
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="mb-5 shadow-sm  bg-light form-control form-control-lg"
          />{" "}
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger"> {formik.errors.password} </div>
          ) : null}{" "}
        </div>{" "}
        <div>
          <input
            type="string"
            name="gender"
            placeholder="Gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
            className="mb-5 shadow-sm mt-3  bg-light form-control form-control-lg"
          />{" "}
          {formik.touched.gender && formik.errors.gender ? (
            <h6 className="text-danger"> {formik.errors.gender} </h6>
          ) : null}{" "}
        </div>{" "}
        <div>
          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
            className="mb-5 shadow-sm mt-3  bg-light form-control form-control-lg"
          />{" "}
          {formik.touched.age && formik.errors.age ? (
            <h6 className="text-danger"> {formik.errors.age} </h6>
          ) : null}{" "}
        </div>{" "}
        <div className="mb-5">
          <input
            type="submit"
            disabled={!formik.isValid}
            value="sign up"
            className=" mr-2 loginbtn1"
          />
          <Link to="/logindriver" className="text-white">
            sign in
          </Link>{" "}
        </div>{" "}
      </form>{" "}
    </div>
  );
}

export default Signup;
