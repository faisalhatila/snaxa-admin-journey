import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
// import React, { useState, useEffect, useContext } from "react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
// import classes from "./SearchBarForm.module.css";
// import { LocationContext } from "./location-latlng-context";
// import searchIcon from "./searchIcon.png";
// import closeIcon from "./closeIcon.png";
// import myLocationIcon from "./myLocationIcon.png";

// const AutoComplete = (props) => {
//   const [value, setValue] = useState("");
//   const {
//     latLng,
//     address,
//     handleLatLngData,
//     handleAddressData,
//     clearLocation,
//     restaurantlatLng,
//     handleRestaurantLocationData,
//     getDeliveredAreas,
//   } = useContext(LocationContext);
//   const [error, setError] = useState(false);
//   const handleSelect = (address) => {
//     setError(false);
//     console.log("address", address);
//     let splitAddress = address.split(",");
//     splitAddress = splitAddress[0].split("-");
//     handleAddressData(splitAddress[0]);
//     let countryAddress = [];
//     geocodeByAddress(address)
//       .then((results) => {
//         countryAddress = results[0].address_components;
//         return getLatLng(results[0]);
//       })
//       .then((latLngData) => {
//         if (!props.googleMap) props.onClick(true);
//         handleLatLngData(latLngData);
//         console.log("Success", latLngData);
//         getDeliveredAreas(latLngData, props.hotel, countryAddress);
//       })
//       .catch((error) => console.error("Error", error));
//   };
//   const options = {
//     // componentRestrictions: { country: ["pk"] },
//     // // componentRestrictions: { country: ["ae"] },
//     // types: ["establishment"],
//   };
//   return (
//     <div style={{ zIndex: 100 }}>
//       <form className={classes.formContainer}>
//         <PlacesAutocomplete
//           searchOptions={options}
//           value={address}
//           onChange={handleAddressData}
//           onSelect={(e) => handleSelect(e)}
//         >
//           {({
//             getInputProps,
//             suggestions,
//             getSuggestionItemProps,
//             loading,
//           }) => (
//             <div
//               style={{
//                 width: "100%",
//                 margin: "auto",
//                 // display: "flex",
//                 // justifyContent: "center",
//               }}
//             >
//               <div
//                 className={[
//                   props.map && classes.active,
//                   classes.inputContainer,
//                 ].join(" ")}
//               >
//                 <img src={searchIcon} alt="searchIcon" />
//                 <input
//                   type="search"
//                   // placeholder={props.placeholder}
//                   placeholder="Search Location"
//                   value={value}
//                   onChange={(e) => setValue(e.target.value)}
//                   // onChange={handleAddressData}
//                   {...getInputProps({
//                     className: "location-search-input",
//                   })}
//                 />
//                 <img
//                   src={address === "" ? myLocationIcon : closeIcon}
//                   alt="myLocationIcon"
//                   onClick={
//                     address === ""
//                       ? () => props.onClick(true)
//                       : () => clearLocation()
//                   }
//                 />
//               </div>
//               <div className={classes.autocompleteDropdownContainer}>
//                 {suggestions.map((suggestion) => {
//                   const className = suggestion.active
//                     ? "suggestion-item--active"
//                     : "suggestion-item";
//                   const style = suggestion.active
//                     ? {
//                         backgroundColor: "#fafafa",
//                         cursor: "pointer",
//                         padding: ".5rem 0.5rem",
//                         textAlign: "left",
//                       }
//                     : {
//                         backgroundColor: "#ffffff",
//                         cursor: "pointer",
//                         padding: ".5rem 0.5rem",
//                         textAlign: "left",
//                       };
//                   console.log("suggestion", suggestion);
//                   return (
//                     <div
//                       style={{}}
//                       {...getSuggestionItemProps(suggestion, {
//                         className,
//                         style,
//                       })}
//                     >
//                       <div></div>
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           fontSize: "95%",
//                         }}
//                       >
//                         <span
//                           style={{
//                             fontWeight: "bold",
//                             color: "#b40008",
//                           }}
//                         >
//                           {suggestion.formattedSuggestion.mainText}
//                         </span>
//                         <span
//                           style={{
//                             fontSize: "70%",
//                             color: "#9d9d9c",
//                             marginTop: "3px",
//                           }}
//                         >
//                           {suggestion.description}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//               {error && !address && (
//                 <div>
//                   <div className={classes.arrowUp}></div>
//                   <p
//                     style={{
//                       fontSize: "1em",
//                       backgroundColor: "#b40008",
//                       margin: " 0 .6rem",
//                       // marginTop: "10px",
//                       padding: ".25rem .1rem",
//                     }}
//                   >
//                     Enter Full Delivery Address
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </PlacesAutocomplete>
//         {!props.map && (
//           <div className={classes.searchButton}>
//             <button
//               style={{
//                 width: "100%",
//                 padding: "12px 30px",
//                 borderRadius: "40px",
//                 backgroundColor: "#ed1b24",
//               }}
//               onClick={
//                 address ? () => props.onClick(true) : () => setError(true)
//               }
//             >
//               Button
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default AutoComplete;
