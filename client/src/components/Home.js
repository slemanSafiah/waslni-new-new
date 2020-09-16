import React, {Component} from "react";
import {Link} from "react-router-dom";

import TypeIt from "typeit-react";
import ReactWOW from "react-wow";
import head1 from "./../img/head1.jpg";
import head2 from "./../img/head2.jpeg";
import head3 from "./../img/head3.jpg";
import map from "./../img/map.svg";
export default class Home extends Component {
  render() {
    return (
      <div className="">
        <header className="header mb-5">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <p className="ml-5">
                  {" "}
                  <TypeIt element={"h1"}>
                    We will take you wherever you need{" "}
                  </TypeIt>
                </p>
                <img
                  className="d-block w-100 headerimg"
                  src={head1}
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <p className="ml-5">
                  {" "}
                  <h1>We will take you wherever you need </h1>
                </p>
                <img
                  className="d-block w-100 headerimg"
                  src={head2}
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <p className="ml-5">
                  {" "}
                  <h1>We will take you wherever you need </h1>
                </p>
                <img
                  className="d-block w-100 headerimg"
                  src={head3}
                  alt="Third slide"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </header>

        <section className="section1 mt-5">
          <div className="container text-center">
            <div className="row">
              <div className="col-md-12 mt-5 ">
                {" "}
                <ReactWOW animation="bounce">
                  <h2 className="mb-5">What is Waslni?</h2>
                </ReactWOW>
                <p>
                  waslni is a website to order taxi in syria as fast as you need
                  start using our website now
                </p>
              </div>

              <div className="col-md-12 mt-5 irtsec">
                <div className="container text-center">
                  <div className="container mt-4">
                    <div className="row">
                      <div className="col-md-4 ">
                        <ReactWOW animation="backInLeft">
                          <div class="">
                            <i className="fas fa-dollar-sign fa-3x icon "></i>
                          </div>
                          <div className="card-body">
                            <p className="card-text texthov">
                              Reliably low-cost services with the goal of saving
                              you up to 50% on common repairs
                            </p>
                          </div>
                        </ReactWOW>
                      </div>
                      <div className="col-md-4 ">
                        <ReactWOW animation="backInDowm">
                          <div class="">
                            <i className="fas fa-shipping-fast	icon fa-3x"></i>
                          </div>
                          <div className="card-body">
                            <p className="card-text texthov">
                              With a goal of 50% faster service, we’ll cut wait
                              times from hours to minutes{" "}
                            </p>
                          </div>
                        </ReactWOW>{" "}
                      </div>
                      <div className="col-md-4">
                        <ReactWOW animation="backInRight">
                          <div class="">
                            <i className="fas fa-map-marker-alt	fa-3x icon"></i>
                          </div>
                          <div className="card-body">
                            <p className="card-text texthov">
                              First location already open, with more locations
                              and additional services coming soon.
                            </p>
                          </div>
                        </ReactWOW>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section2 mt-5 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6 ">
                {" "}
                <ReactWOW animation="heartBeat">
                  <h1 className=" pr-5 mt-3  text-white">
                    Want to be your own boss? Start today.
                  </h1>
                </ReactWOW>
                <p className="mt-3 pr-5  text-white">
                  Earnings, flexibility, and support
                  <br />
                  The WaslniDriver app and its features help you make money you
                  can depend on. When you're ready, cash out instantly.
                </p>
                <ReactWOW animation="bounceInUp">
                  <Link to="/signupdriver">
                    <span className="mr-2 loginbtn1 m-5">Become A Driver</span>
                  </Link>
                </ReactWOW>
              </div>
              <div className="col-md-6  mt-5"></div>
            </div>
          </div>
        </section>
        <section className="section3 mt-5 mb-5 text-center">
          <ReactWOW animation="fadeInDown">
            <h1 className="mt-2 text-secondary mb-5">
              why Waslni for business?
            </h1>
          </ReactWOW>

          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-3 pt-1">
                <ReactWOW animation="fadeInLeft">
                  <div class="">
                    <i className="fas fa-donate	icon fa-3x"></i>

                    <div className="card-body">
                      <h3 className="card-text">Reliable earnings</h3>
                      <p className="card-text texthov">
                        The Lyft Driver app and its features help you make money
                        you can depend on. When you're ready, cash out
                        instantly.{" "}
                      </p>
                    </div>
                  </div>
                </ReactWOW>
              </div>
              <div className="col-md-4 col-sm-3">
                <ReactWOW animation="fadeInUp">
                  <div class="">
                    <i className="fas fa-male	 icon fa-3x"></i>
                    <div className="card-body">
                      <h3 className="card-text">A few necessities</h3>
                      <p className="card-text texthov">
                        You’ll need to meet the age requirement for your region,
                        have a smartphone, and pass an online DMV and background
                        check. Requirements vary across cities.
                      </p>
                    </div>
                  </div>
                </ReactWOW>{" "}
              </div>
              <div className="col-md-4 col-sm-3">
                <ReactWOW animation="fadeInRight">
                  <div class="">
                    <i className="fas fa-car	fa-3x icon"></i>
                    <div className="card-body">
                      <h3 className="card-text">Need a car?</h3>
                      <p className="card-text texthov">
                        Get one when you want from our trusted Express Drive
                        partners. Also included: insurance, maintenance, and
                        unlimited miles to earn with Lyft.
                      </p>
                    </div>
                  </div>
                </ReactWOW>{" "}
              </div>
            </div>
          </div>
        </section>
        <section className="section4">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                {" "}
                <img src={map} className="section4img" />
              </div>
              <div className="col-md-7 ">
                {" "}
                <h1 className="text-right text-white pt-5 mt-5">
                  Delivary anything any time
                  <br />
                  Save big on every order
                  <br />
                  Ready to order?
                </h1>
                <ReactWOW animation="bounceInUp">
                  <Link to="map">
                    <span className="float-right loginbtn1 m-5">Order now</span>
                  </Link>
                </ReactWOW>
              </div>
            </div>{" "}
          </div>{" "}
        </section>
      </div>
    );
  }
}
