import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = {
    mobileNav: false,
    currentPage: "/",
  };
  render() {
    const handleClick = () => {
      if (!this.state.mobileNav) {
        this.setState({
          mobileNav: true,
        });
        document.body.classList.add("mobile-nav-active");
        document
          .getElementById("mobile-body-overly")
          .classList.remove("d-none");
        document.getElementById("mobile-body-overly").classList.add("d-block");
        document.getElementById("toggleButton").classList.remove("fa-bars");
        document.getElementById("toggleButton").classList.add("fa-times");
      } else {
        this.setState({
          mobileNav: false,
        });
        document.body.classList.remove("mobile-nav-active");
        document.getElementById("mobile-body-overly").classList.add("d-none");
        document
          .getElementById("mobile-body-overly")
          .classList.remove("d-block");
        document.getElementById("toggleButton").classList.remove("fa-times");
        document.getElementById("toggleButton").classList.add("fa-bars");
      }
    };
    return (
      <div>
        <div id="mobile-body-overly" className="d-none" />
        <button onClick={handleClick} type="button" id="mobile-nav-toggle">
          <i id="toggleButton" className="fa fa-bars" aria-hidden="true" />
        </button>
        <div className="headerDiv">
          <header id="header" className="container">
            <div class="">
              <div id="logo" class="pull-left">
                {/* <h1> */}
                <a href="#intro" class="scrollto">
                  <img src="assets/img/logo.svg" className="mr-3" />
                  {/* E-Shop */}
                </a>
                {/* </h1> */}
              </div>
              <nav id="nav-menu-container">
                <ul class="nav-menu">
                  <li class="">
                    <a href="#intro">Dashboard</a>
                  </li>
                  <li>
                    <a href="#about">Customer Management</a>
                  </li>
                  <li>
                    <a href="#services">Restaurant Management</a>
                  </li>
                  <li>
                    <a href="#services">Order Management</a>
                  </li>
                  <li>
                    <a href="#services">Kitchen Management</a>
                  </li>
                  {/* <li>
                  <a href="#portfolio">Portfolio</a>
                </li>
                <li>
                  <a href="#team">Team</a>
                </li>
                <li class="menu-has-children">
                  <a href="">Drop Down</a>
                  <ul>
                    <li>
                      <a href="#">Drop Down 1</a>
                    </li>
                    <li>
                      <a href="#">Drop Down 3</a>
                    </li>
                    <li>
                      <a href="#">Drop Down 4</a>
                    </li>
                    <li>
                      <a href="#">Drop Down 5</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li> */}
                </ul>
              </nav>
              <nav id="mobile-nav">
                <ul className="" style={{ touchAction: "pan-y" }} id="">
                  {/* <li className="menu-active">
              <Link to="/">Home</Link>
            </li> */}
                  <li>
                    <Link to="/about-us">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/services">Customer Management</Link>
                  </li>
                  <li>
                    <Link to="/blogs">Restaurant Management</Link>
                  </li>
                  <li>
                    <Link to="/blogs">Order Management</Link>
                  </li>
                  <li>
                    <Link to="/blogs">Kitchen Management</Link>
                  </li>
                  {/* <li id="navbarButton">
                    <Link
                      to="#featured-services"
                      className="btn-get-started scrollto navbarButton"
                    >
                      Learn More
                    </Link>
                  </li> */}
                </ul>
              </nav>{" "}
            </div>
          </header>{" "}
        </div>
      </div>
    );
  }
}
