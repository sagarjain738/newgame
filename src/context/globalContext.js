const { createContext, useReducer, useContext } = require("react");
import reducer from "./reducers/globalReducer";

export const GlobalContext = createContext();

const initialState = {
  gateName: "All",
  loginUser: "",
};

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default GlobalContextProvider;
