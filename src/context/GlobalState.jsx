import { useContext, useReducer, createContext, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  transactions: [],
};

export const Context = createContext(initialState);

export const useGlobalState = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useGlobalState must be used within a GlobalState");
  return context;
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    const localData = localStorage.getItem("transactions");
    return localData ? JSON.parse(localData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state));
  }, [state]);

  const deleteTransaction = (id) =>
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });

  const addTransaction = (transaction) =>
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });

  return (
    <Context.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </Context.Provider>
  );
};
