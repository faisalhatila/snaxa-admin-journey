import { createContext } from "react";

export const LocationContext = createContext({
  latLng: undefined,
  address: "",
  handleLatLngData: () => {},
  handleAddressData: () => {},
});
