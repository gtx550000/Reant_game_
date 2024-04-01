import { createContext, useContext, useState } from "react";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [choice, setChoice] = useState("cart");
  const [gameIds, setGameids] = useState();
  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();
  return (
    <DataContext.Provider
      value={{
        choice,
        gameIds,
        username,
        userId,
        setUsername,
        setUserId,
        setChoice,
        setGameids,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
