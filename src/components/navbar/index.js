import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

let Navbar;
export default Navbar = (props) => {
  // state = {
  //   mobileNav: false,
  //   currentPage: "/",
  // };
  // render() {
  const [mobileNav, setMobileNav] = useState(false);
  const [currentPage, setCurrentPage] = useState("/");
  const handleClick = () => {
    if (!mobileNav) {
      // this.setState({
      //   mobileNav: true,
      // });
      setMobileNav(true);
      document.body.classList.add("mobile-nav-active");
      document.getElementById("mobile-body-overly").classList.remove("d-none");
      document.getElementById("mobile-body-overly").classList.add("d-block");
      document.getElementById("toggleButton").classList.remove("fa-bars");
      document.getElementById("toggleButton").classList.add("fa-times");
      // } else {
      //   this.setState({
      //     mobileNav: false,
      //   });
      setMobileNav(false);
      document.body.classList.remove("mobile-nav-active");
      document.getElementById("mobile-body-overly").classList.add("d-none");
      document.getElementById("mobile-body-overly").classList.remove("d-block");
      document.getElementById("toggleButton").classList.remove("fa-times");
      document.getElementById("toggleButton").classList.add("fa-bars");
    }
  };
  const routeArr = [
    {
      label: "Add Order Status",
      path: "/add-order-status",
    },
    {
      label: "Add Cuisine",
      path: "/add-cuisine",
    },
    {
      label: "Edit Site Info",
      path: "/site-info",
    },
    {
      label: "Newsletter Emails",
      path: "/news-letters",
    },
    {
      label: "Feedbacks From Customers",
      path: "/feedback",
    },
    {
      label: "Contact Us Forms From Customers",
      path: "/contact-queries",
    },
    {
      label: "Reviews From Customers",
      path: "/reviews",
    },
    {
      label: "Edit T&Cs",
      path: "/terms-and-conditions",
    },
    {
      label: "Edit FAQs",
      path: "/faqs",
    },
    {
      label: "Edit Privacy",
      path: "/privacy",
    },
    {
      label: "Edit Sitemap",
      path: "/sitemap",
    },
  ];
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
              <Link to="/">
                <img alt="Logo" src="assets/img/logo.svg" className="mr-3" />
              </Link>
            </div>
            <nav id="nav-menu-container">
              <ul class="nav-menu">
                <li class="navbarItems">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="navbarItems">
                  <Link to="/customer-management-table">
                    Customer Management
                  </Link>
                </li>
                <li className="navbarItems">
                  <Link to="restaurant-management-table">View Restaurants</Link>
                  {/* <i
                    class="fas fa-chevron-down"
                    style={{ transform: "translateY(2px)" }}
                  ></i> */}
                  {/* <ul className="navbarItemSubmenu">
                    <li>
                      <Link to="/restaurant-management-table">
                        All Restaurants
                      </Link>
                    </li>
                    <li>
                      <Link to="add-order-status">Add Order Status</Link>
                    </li>
                    <li>
                      <Link to="/add-cuisine">Add Cuisine</Link>
                    </li>
                  </ul> */}
                </li>
                <li className="navbarItems">
                  <Link to="/order-management-table">Order Management</Link>
                </li>
                {/* <li className="navbarItems">
                  <Link>Kitchen Management</Link>
                  <i
                    class="fas fa-chevron-down"
                    style={{ transform: "translateY(2px)" }}
                  ></i>
                  <ul className="navbarItemSubmenu">
                    <li>
                      <Link to="/add-category">Add Category</Link>
                    </li>
                    <li>
                      <Link to="/add-item">Add Items</Link>
                    </li>
                    <li>
                      <Link to="/add-addon-category">Add Addon Category</Link>
                    </li>
                    <li>
                      <Link to="/add-addon-item">Add Addon Item</Link>
                    </li>
                  </ul>
                </li> */}
                <li class="navbarItems">
                  <Link to="/">
                    <i class="fas fa-cog"></i>
                  </Link>
                  <i
                    class="fas fa-chevron-down"
                    style={{ transform: "translateY(2px)" }}
                  ></i>
                  <ul
                    className="navbarItemSubmenu"
                    style={{
                      boxShadow: "0px 0px 5px 2px grey",
                      transform: "translate(-150px, -10px)",
                    }}
                  >
                    {/* <li>
                      <Link to="/faqs">Faqs</Link>
                    </li>
                    <li>
                      <Link to="/terms-and-conditions">
                        Terms and conditions
                      </Link>
                    </li>
                    <li>
                      <Link to="/add-addon-category">Sitemap</Link>
                    </li> */}
                    {routeArr.map((nav, i) => {
                      return (
                        <li key={i}>
                          <Link to={nav.path}>{nav.label}</Link>
                        </li>
                      );
                    })}
                  </ul>
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
  // }
};
