import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import logo from "./../img/logo.png";
import axios from "axios";
import {useHistory} from "react-router-dom";
import ReactWOW from "react-wow";
import {ToastProvider, useToasts} from "react-toast-notifications";

export default function Getintouch() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [number, setnumber] = useState("");
  const data = {name, email, number, message};
  let history = useHistory();
  const {addToast} = useToasts();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    if (name == "" || email == "" || message == "" || number == "")
      alert("تأكد من ملأ جميع الحقول قبل الإرسال");
    else {
      axios
        .post("/contact_us", data)
        .then((res) => {
          console.log(data);
          addToast("messege sent Successfully", {appearance: "success"});

          history.push("/");
        })
        .catch((err) => {
          addToast("error try again", {appearance: "error"});
        });
    }
  };
  return (
    <div className="container shadow-lg rounded  py-5 mb-5">
      <div className="row">
        {" "}
        <div className="div col-md-10">
          {" "}
          <ReactWOW animation="fadeInDown">
            <h1 className=" text1">Contact us</h1>
          </ReactWOW>
        </div>
        <div className="div col-md-2">
          {" "}
          <ReactWOW animation="fadeInRight">
            <img src={logo} className="mr-auto  " />
          </ReactWOW>
        </div>
      </div>
      <hr />
      <div className="row mt-3">
        <div className="col-md-6">
          <ReactWOW animation="fadeInLeft">
            <div className=" ml-3 mb-2">
              <h5>address</h5>
              <p> Syria-Homs</p>
            </div>
            <div className="ml-3 mb-2">
              <h5>email</h5>
              <p> info@waslni.com</p>
            </div>
            <div className="ml-3 mb-5">
              <h5>mobile</h5>
              <p> +963-0951516896</p>
            </div>
          </ReactWOW>
          <hr />
          <div className="social">
            <ul className="list-inline list-unstyled">
              <li className="list-inline-item">
                <Link to="#">
                  <i className="fab fa-google-plus-g icon"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#">
                  <i className="fab fa-linkedin-in icon"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#">
                  <i className="fab fa-facebook-f icon"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#">
                  <i className="fab fa-twitter icon"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <ReactWOW animation="fadeInRight">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <input
                        id="Full Name"
                        name="Full Name"
                        placeholder="full name"
                        className="form-control "
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        className="form-control "
                        id="inputEmail4"
                        placeholder="email"
                        value={email}
                        onChange={(event) => setemail(event.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        id="Mobile No."
                        name="Mobile No."
                        placeholder="mobile number"
                        className="form-control "
                        required="required"
                        type="text"
                        value={number}
                        onChange={(event) => setnumber(event.target.value)}
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <textarea
                        id="comment"
                        name="comment"
                        cols="40"
                        rows="5"
                        placeholder="message"
                        className="form-control "
                        value={message}
                        onChange={(event) => setmessage(event.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-row">
                    <p onClick={onSubmit} className="loginbtn ">
                      send
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </ReactWOW>{" "}
        </div>
      </div>{" "}
    </div>
  );
}
