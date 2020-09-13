import React, {useContext, useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import {AuthContext} from "../AuthContext";
import {useFormik} from "formik";
import ReactWOW from "react-wow";
import {ToastProvider, useToasts} from "react-toast-notifications";

function Profile() {
  const authContext = useContext(AuthContext);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const {addToast} = useToasts();

  const formik = useFormik({
    initialValues: {
      password: "",
      name: "",
      gender: "",
      age: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Required").min(8, "8 char at least"),
      name: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      age: Yup.string().required("Required").min(2, "only 2 digit"),
    }),
    onSubmit: (values) => {
      const data = {
        number: localStorage.getItem("number"),
        password: values.password,
        name: values.name,
        gender: values.gender,
        age: values.age,
      };
      console.log(data);
      if (authContext.isdriver) {
        axios
          .post("http://localhost:5000/driver/update_info", data)
          .then((res) => {
            console.log("uppppu", res);
            if (res.data.sucess == 1) {
              addToast("editing Successfully", {appearance: "success"});
            }
          })
          .catch((err) => {
            addToast("error try again", {appearance: "error"});
          });
      } else {
        axios
          .post("http://localhost:5000/user/update_info", data)
          .then((res) => {
            console.log("uppppu", res);
            if (res.data.sucess == 1) {
              addToast("editing Successfully", {appearance: "success"});
            }
          })
          .catch((err) => {
            addToast("error try again", {appearance: "error"});
          });
      }

      this.formik.resetForm({});
    },
  });
  return (
    <div className="container shadow-lg mb-5 rounded">
      <form onSubmit={formik.handleSubmit}>
        <ReactWOW animation="fadeInDown">
          <i className="far fa-edit	pt-4 fa-2x icon d-flex justify-content-center"></i>
          <h1 className="mt-3  text-center mb-5 text1">Edit info</h1>
        </ReactWOW>
        <ReactWOW animation="fadeInLeft">
          <div>
            <input
              type="string"
              name="name"
              placeholder="enter your new name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="mb-5 shadow-sm mt-3  bg-light form-control form-control-lg"
            />
            {formik.touched.name && formik.errors.name ? (
              <h6 className="text-danger">{formik.errors.name}</h6>
            ) : null}
          </div>

          <div>
            <input
              type="password"
              placeholder="enter new password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mb-5 shadow-sm  bg-light form-control form-control-lg"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          <div>
            <input
              type="string"
              name="gender"
              placeholder="enter your gender"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gender}
              className="mb-5 shadow-sm mt-3  bg-light form-control form-control-lg"
            />
            {formik.touched.gender && formik.errors.gender ? (
              <h6 className="text-danger">{formik.errors.gender}</h6>
            ) : null}
          </div>
          <div>
            <input
              type="number"
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
        </ReactWOW>
        <div className="mb-5">
          <input
            type="submit"
            disabled={!formik.isValid}
            value="edit"
            className=" mr-2 mb-3 loginbtn"
          />
        </div>
      </form>
    </div>
  );
}

export default Profile;
