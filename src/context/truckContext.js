const { createContext, useReducer, useContext } = require("react");
import reducer from "./reducers/truckReducer";

export const TruckContext = createContext();

const initialState = {
  LoadiId: "",
  TruckNumber: "",
  TruckStatus: "",
};

const TruckContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TruckContext.Provider value={{ state, dispatch }}>
      {children}
    </TruckContext.Provider>
  );
};

export const useTruckContext = () => {
  return useContext(TruckContext);
};

export default TruckContextProvider;
