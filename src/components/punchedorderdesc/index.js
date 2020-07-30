import React, { Component } from "react";

export default class PunchedOrderDesc extends Component {
  render() {
    return (
      <div className="punchedOrderMainParent pb-1 mt-5">
        <div className="punchedOrderHeadingDiv">
          <h3>Punched Orders</h3>
        </div>
        <div className="container">
          <div className="receiptFirstRow d-flex justify-content-between">
            <div className="receiptLogoDiv">
              <img alt="Logo" src="assets/img/receiptLogo.svg" />
            </div>
            <div className="receiptFirstRowButtonsDiv">
              {/* <div className="d-flex">
                <label className="mr-2 receiptButton receiptDeclineButton">
                  <i class="fas fa-times pr-2"></i>Decline
                </label>
                <label
                  className="receiptButton receiptPrintButton"
                  onClick={() => window.print()}
                >
                  <i class="fas fa-print pr-2"></i>Print
                </label>
              </div> */}
            </div>
          </div>
          <div className="receiptSecondDiv mt-3">
            <p className="noMargin">
              <i class="far fa-check-circle pr-2 redFont"></i>Accepted and
              delivered this order
            </p>
          </div>
        </div>
        <div className="receiptThirdRow orderAndCustomerDetailDiv d-flex justify-content-between container flex-column flex-lg-row flex-md-row">
          <div className="orderDetailsDiv mt-3">
            <table>
              <tr>
                <th>Order ID</th>
                <td>123456</td>
              </tr>
              <tr>
                <th>Restaurant Name</th>
                <td>Alexa</td>
              </tr>
              <tr>
                <th>Phoone No</th>
                <td></td>
              </tr>
              <tr>
                <th>Order Received At</th>
                <td>10/05/2020 03:05pm</td>
              </tr>
            </table>
          </div>
          <div className="customerDetailsDiv mt-3">
            <table>
              <tr>
                <th>Customer Name</th>
                <td>Faisal</td>
              </tr>
              <tr>
                <th>Mobile Number</th>
                <td>0300-xxxxxxx</td>
              </tr>
              <tr>
                <th>Payment</th>
                <td>Card</td>
              </tr>
              <tr>
                <th>Order Source</th>
                <td>Snaxa</td>
              </tr>
            </table>
          </div>
        </div>
        <hr style={{ marginLeft: "15px", marginRight: "15px" }} />
        <div className="receiptThirdRow orderAndCustomerDetailDiv container">
          <div className="orderDetailsDiv">
            <p className="noMargin redFont">Delivery Detail Address</p>
            <table>
              <tr>
                <th>City</th>
                <td className="pl-5">Dubai</td>
              </tr>
              <tr>
                <th>Area</th>
                <td className="pl-5">Zakher</td>
              </tr>
              <tr>
                <th>Street</th>
                <td className="pl-5">Road 17 Villa 10</td>
              </tr>
              <tr>
                <th>Villa</th>
                <td className="pl-5">Villa 10</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="receiptFourthRow dataTableDiv container mt-4">
          <table className="table table-hover">
            <thead className="receiptTableHead">
              <tr>
                <th>Quantity</th>
                <th>Items</th>
                <th>Addon</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Lorem</td>
                <td>addons</td>
                <td>00.00 AED</td>
                <td>00.00 Aed</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Lorem</td>
                <td>addons</td>
                <td>00.00 AED</td>
                <td>00.00 Aed</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="receiptFifthRow container">
          <div className="row">
            <div className="col-12 col-lg-7 col-md-7">
              <div class="form-group">
                <label for="exampleFormControlTextarea1">
                  Example textarea
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="6"
                ></textarea>
              </div>
            </div>
            <div className="col-12 col-md-5 col-lg-5">
              <div className="d-flex justify-content-between">
                <div>
                  <p>Lorem Ipsum</p>
                  <p>Lorem Ipsum</p>
                  <p>Lorem Ipsum</p>
                  <p>Lorem Ipsum</p>
                </div>
                <div>
                  <p>Lorem Ipsum</p>
                  <p>Lorem Ipsum</p>
                  <p>Lorem Ipsum</p>
                  <p>Lorem Ipsum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="receiptSixthRow container">
          <p className="redFont">Your Text Here</p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged
          </p>
        </div>
      </div>
    );
  }
}
