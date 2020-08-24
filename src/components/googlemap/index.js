import React, { useState, useRef, useCallback, useContext } from "react";
import classes from "./GoogleMapContainer.module.css";
import redMarker from "../../assets/Images/Pin.png";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Geocode from "react-geocode";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { useEffect } from "react";
import Modal from "../UIElements/Modal";
import SearchBarForm from "../../../Customer/Components/Home/SearchBarForm";
import { useLocationData } from "../../hooks/location-latlng-hook";
import { LocationContext } from "../../context/location-latlng-context";
import { set } from "lodash";

const mapStyles = {
  width: "100%",
  height: "100%",
  position: "absolute",
  display: "block",
};

const LoadingContainer = (props) => (
  <span className="center">
    <LoadingSpinner asOverlay />
  </span>
);

const GoogleMapContainer = (props) => {
  // const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  // const [activeMarker, setActiveMarker] = useState({});
  // const [selectedPlace, setSelectedPlace] = useState({});
  const {
    latLng,
    address,
    handleLatLngData,
    handleAddressData,
    getDeliveredAreas,
    deliverHere,
    loading,
    setLoading,
  } = useContext(LocationContext);
  // const [currentPlace, setCurrentPlace] = useState({});
  // const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [centerLoading, setCenterLoading] = useState(false);
  // const [deliverText, setDeliverText] = useState(
  //     "Sorry, we don't deliver here",
  // );
  // const [center, setCenter] = useState({
  //     lat: currentPlace.lat && currentPlace.lat,
  //     lng: currentPlace.lng && currentPlace.lng,

  // });

  // console.log("updated LatLng from Hook", latLng);

  const refMap = useRef(null);

  const nearbyRestaurants = () => {};

  const getCityStateArea = (address) => {
    let city = getCity(address);
    let area = getArea(address);
    let state = getState(address);
    let street = getStreet(address);
    let country = getCountry(address);
    setCity(city);
    setArea(area);
    setState(state);
    setStreet(street);
    setCountry(country);
  };
  const getCountry = (addressArray) => {
    let country = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && "country" === addressArray[i].types[0]) {
        country = addressArray[i].long_name;
        console.log("country", country);
        return country;
      }
    }
  };
  const getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  const getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  const getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  const getStreet = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "street_number" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
              if (
                addressArray[i].types[0] &&
                "route" === addressArray[i].types[0]
              ) {
                console.log("rotueee");
                state += " ";
                return (state += addressArray[i].long_name);
              }
            }
          }
          return state;
        } else {
          for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
              if (
                addressArray[i].types[0] &&
                "route" === addressArray[i].types[0]
              ) {
                state += " ";
                return (state += addressArray[i].long_name);
              }
            }
          }
          return state;
        }
      }
    }
  };
  const centerMove = (mapProps, map) => {
    console.log("Center Loading");
    // console.log("refMap", refMap);
    setCenterLoading(true);
  };
  const centerMoved = (mapProps, map) => {
    // ...
    setLoading(false);
    console.log("map", map.center.lat());
    console.log("map", map.center.lng());
    handleLatLngData({
      lat: map.center.lat(),
      lng: map.center.lng(),
    });
    Geocode.fromLatLng(map.center.lat(), map.center.lng()).then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log("address", address);
        getCityStateArea(response.results[0].address_components);
        setCenterLoading(false);
        let splitAddress = address.split(",");
        splitAddress = splitAddress[0].split("-");
        handleAddressData(splitAddress[0]);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const onMarkerClick = () => {
    setLoading(false);
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      handleLatLngData({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      refMap.current.state.currentLocation.lat = position.coords.latitude;
      refMap.current.state.currentLocation.lng = position.coords.longitude;
      Geocode.fromLatLng(
        position.coords.latitude,
        position.coords.longitude
      ).then(
        (response) => {
          const address2 = response.results[0].formatted_address;
          console.log("address", address2);
          getCityStateArea(response.results[0].address_components);
          let splitAddress = address2.split(",");
          splitAddress = splitAddress[0].split("-");
          handleAddressData(splitAddress[0]);
          setCenterLoading(false);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    console.log("latLng", latLng);
    if (latLng.lat) {
      Geocode.fromLatLng(latLng.lat, latLng.lng).then(
        (response) => {
          const address2 = response.results[0].formatted_address;
          console.log("address", address2);
          let splitAddress = address2.split(",");
          splitAddress = splitAddress[0].split("-");
          handleAddressData(splitAddress[0]);
          getCityStateArea(response.results[0].address_components);
          setCenterLoading(false);
          getDeliveredAreas(
            latLng,
            props.hotel,
            response.results[0].address_components
          );
        },
        (error) => {
          console.error("error UE", error);
        }
      );
    } else
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        handleLatLngData({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        Geocode.fromLatLng(
          position.coords.latitude,
          position.coords.longitude
        ).then(
          (response) => {
            const address2 = response.results[0].formatted_address;
            console.log("address", address2);
            getCityStateArea(response.results[0].address_components);
            setCenterLoading(false);
            let splitAddress = address2.split(",");
            splitAddress = splitAddress[0].split("-");
            handleAddressData(splitAddress[0]);
            getDeliveredAreas(
              {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              props.hotel,
              response.results[0].address_components
            );
          },
          (error) => {
            console.error(error);
          }
        );
      });
  }, [latLng]);

  if (latLng.lat)
    return (
      <div className={classes.GoogleMapContainer}>
        {latLng.lat && (
          <Modal
            className={classes.ModalContainer}
            show={props.googleMap}
            onCancel={() => props.googleMapHandler(false)}
            header="Delivery Address"
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
              }}
            >
              <div
                style={{
                  height: "75%",
                  width: "100%",
                  position: "absolute",
                }}
                id="googleMapCenter"
              >
                <Map
                  streetViewControl={false}
                  fullscreenControl={false}
                  mapTypeControl={false}
                  gestureHandling={"greedy"}
                  disableDoubleClickZoom={false}
                  ref={refMap}
                  google={props.google}
                  zoom={18}
                  style={mapStyles}
                  minZoom={13}
                  maxZoom={19}
                  initialCenter={{
                    lat: 24.868321083333335,
                    lng: 67.07783075,
                  }}
                  center={{
                    lat: latLng.lat,
                    lng: latLng.lng,
                  }}
                  // draggable={true}
                  // onBoundsChanged={centerMove}
                  onDragend={centerMoved}
                  // onBoundsChanged={centerMoved}
                  // onIdle={centerMoved}
                  // onDragstart={() => setLoading(true)}
                >
                  {/* <Marker
                                        onClick={onMarkerClick}
                                        icon={{
                                            url: redMarker,
                                        }}
                                    /> */}
                  <div onClick={onMarkerClick}>
                    <img
                      src={redMarker}
                      style={{
                        left: "50%",
                        top: "50%",
                        position: "absolute",
                        transform: "translate(-50%,-100%)",
                        // marginTop: "22px",
                      }}
                    />
                  </div>
                </Map>
              </div>
              <div
                style={{
                  bottom: "0",
                  height: "25%",
                  padding: "0.8rem 0.5rem",
                  width: "100%",
                  margin: "0 auto",
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {state && (
                  <div
                    style={{
                      width: "90%",
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={redMarker}
                      width="12px"
                      height="12px"
                      style={{ marginTop: "3px" }}
                    />
                    <p>
                      <span
                        style={{
                          lineHeight: "0",
                          marginLeft: "8px",
                          color: "#757575",
                        }}
                      >
                        Deliver to:{" "}
                      </span>
                      {street ? `${street}, ` : ""}
                      {area ? `${area}, ` : ""}
                      {city ? `${city}, ` : ""}
                      {state ? `${state}.` : ""}
                    </p>
                  </div>
                )}
                <p className={classes.DeliverButton}>
                  {
                    !props.hotel && deliverHere ? (
                      <span>Deliver Here</span>
                    ) : !props.hotel && !deliverHere ? (
                      <span>Sorry, we don't deliver here</span>
                    ) : props.hotel && deliverHere ? (
                      <span>Deliver Here</span>
                    ) : (
                      <span>Sorry, this brand doesn't deliver here</span>
                    )
                    //  props.hotel && !deliverHere ? (
                    //     <span>
                    //         Sorry, this brand doesn't deliver
                    //         here
                    //     </span>
                    // ) : null
                  }
                  {/* {loading ? (
                                        <span>Detecting Location</span>
                                    ) : props.hotel && deliverHere ? (
                                        <span>Deliver Here</span>
                                    ) : deliverHere ? (
                                        <span>Deliver Here</span>
                                    ) : (
                                        <span>
                                            Sorry, this brand doesn't deliver
                                            here.
                                        </span>
                                    )} */}
                </p>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                top: "50px",
                position: "absolute",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SearchBarForm
                placeholder="Search for area, street name, landmark..."
                onClick={() => {}}
                setLatLng={() => {}}
                map
              />
            </div>
          </Modal>
        )}
      </div>
    );
  else return <span></span>;
};

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_PLACES_API);

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_PLACES_API,
  LoadingContainer: LoadingContainer,
})(GoogleMapContainer);
