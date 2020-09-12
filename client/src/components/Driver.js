import React, {useContext, useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import {AuthContext} from "./../AuthContext";
import {useFormik} from "formik";
import {Link} from "react-router-dom";
import {ToastProvider, useToasts} from "react-toast-notifications";

function Driver() {
  const authContext = useContext(AuthContext);
  const {addToast} = useToasts();

  const formik = useFormik({
    initialValues: {
      carmodel: "",
      gender: "",
      age: "",
    },
    validationSchema: Yup.object({
      carmodel: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      age: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const data = {
        carmodel: values.carmodel,
        gender: values.gender,
        age: values.age,
        name: authContext.name,
        password: authContext.password,
        number: authContext.password,
      };
      {
        axios
          .post("http://localhost:5000/api/users/add_user", data)
          .then((res) => {
            addToast(" Success", {appearance: "success"});
          })
          .catch((err) => {
            addToast("error try again", {appearance: "error"});
          });
      }

      this.formik.resetForm({});
    },
  });
  return (
    <div className="container shadow-lg mb-5 d-flex justify-content-center rounded w-75">
      <form onSubmit={formik.handleSubmit}>
        <h1 className="mt-5 text-secondary"> Become a Driver With Waslni </h1>
        <div className="w-75">
          <input
            type="string"
            name="age"
            placeholder="enter your age"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
            className="mb-5 shadow-sm mt-3  bg-light form-control form-control-lg"
          />
          {formik.touched.age && formik.errors.age ? (
            <h6 className="text-danger">{formik.errors.age}</h6>
          ) : null}
        </div>
        <div className="w-75">
          <input
            type="string"
            name="carmodel"
            id="carmodel"
            placeholder="enter mobile car model"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.carmodel}
            className="mb-5 shadow-sm  bg-light form-control form-control-lg"
          />
          {formik.touched.carmodel && formik.errors.carmodel ? (
            <h6 className="text-danger">{formik.errors.carmodel}</h6>
          ) : null}
        </div>
        <div className="w-75">
          <input
            type="gender"
            placeholder="enter gender"
            name="gender"
            id="gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
            className="mb-5 shadow-sm  bg-light form-control form-control-lg"
          />
          {formik.touched.gender && formik.errors.gender ? (
            <div className="text-danger">{formik.errors.gender}</div>
          ) : null}
        </div>
        <div className="mb-5">
          <input
            type="submit"
            disabled={!formik.isValid}
            value="Become A Driver"
            className=" mr-2 loginbtn"
          />
        </div>
      </form>
    </div>
  );
}

export default Driver;
