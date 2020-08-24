import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  Component,
  useEffect,
} from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Geocode from "react-geocode";

const MapContainer = (props) => {
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
  });
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      //   alert(position.coords.latitude);
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [navigator.geolocation.getCurrentPosition]);
  const centerMoved = (mapProps, map) => {
    // ...
    // setLoading(false);
    console.log("map", map.center.lat());
    console.log("map", map.center.lng());
    // handleLatLngData({
    //   lat: map.center.lat(),
    //   lng: map.center.lng(),
    // });
    setCoords({
      lat: map.center.lat(),
      lng: map.center.lng(),
    });
    Geocode.fromLatLng(map.center.lat(), map.center.lng()).then(
      (response) => {
        // console.log("############################################");
        console.log("response", response);
        // console.log("############################################");

        const address = response.results[0].formatted_address;
        // console.log("############################################");
        // console.log("address", address);
        // console.log("############################################");
        getCityStateArea(response.results[0].address_components);
        // setCenterLoading(false);
        let splitAddress = address.split(",");
        splitAddress = splitAddress[0].split("-");
        // handleAddressData(splitAddress[0]);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const onMarkerClick = () => {
    // setLoading(false);
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      //   handleLatLngData({
      //     lat: position.coords.latitude,
      //     lng: position.coords.longitude,
      //   });
      //   refMap.current.state.currentLocation.lat = position.coords.latitude;
      //   refMap.current.state.currentLocation.lng = position.coords.longitude;
      Geocode.fromLatLng(
        position.coords.latitude,
        position.coords.longitude
      ).then(
        (response) => {
          const address2 = response.results[0].formatted_address;
          console.log("address", address2);
          //   getCityStateArea(response.results[0].address_components);
          let splitAddress = address2.split(",");
          splitAddress = splitAddress[0].split("-");
          //   handleAddressData(splitAddress[0]);
          //   setCenterLoading(false);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  };
  const getCityStateArea = (address) => {
    let city = getCity(address);
    let area = getArea(address);
    // let state = getState(address);
    // let street = getStreet(address);
    let country = getCountry(address);
    setCity(city);
    setArea(area);
    // setState(state);
    // setStreet(street);
    setCountry(country);
  };
  const getCountry = (addressArray) => {
    let country = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && "country" === addressArray[i].types[0]) {
        country = addressArray[i].long_name;
        // console.log("country", country);
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
  return (
    <Map
      streetViewControl={false}
      fullscreenControl={false}
      mapTypeControl={false}
      gestureHandling={"auto"}
      disableDoubleClickZoom={false}
      google={props.google}
      zoom={14}
      center={{
        lat: coords.lat,
        lng: coords.lng,
      }}
      onDragend={centerMoved}
    >
      {/* <Marker
        position={{ lat: coords.lat, lng: coords.lng }}
        onClick={props.onMarkerClick}
        name={"Current location"}
      /> */}
      <div onClick={onMarkerClick}>
        <img
          src="assets/img/PIN.png"
          style={{
            left: "50%",
            top: "50%",
            position: "absolute",
            transform: "translate(-50%,-100%)",
            // marginTop: "22px",
          }}
        />
      </div>

      {/* <InfoWindow onClose={props.onInfoWindowClose}>
        <div><h1>{this.state.selectedPlace.name}</h1></div>
      </InfoWindow> */}
    </Map>
  );
};
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_PLACES_API);
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_PLACES_API,
  //   LoadingContainer: LoadingContainer,
})(MapContainer);
