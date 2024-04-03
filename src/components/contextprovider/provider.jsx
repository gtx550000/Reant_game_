import { createContext, useContext, useState } from "react";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [choice, setChoice] = useState("cart");
  const [gameIds, setGameids] = useState(-1);
  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();
  const [profile, setProfile] = useState(
    "https://static.vecteezy.com/system/resources/previews/022/123/337/original/user-icon-profile-icon-account-icon-login-sign-line-vector.jpg"
  );
  const [bank, setBank] = useState("Bangkok bank");
  const [order, setOrder] = useState();
  return (
    <DataContext.Provider
      value={{
        choice,
        gameIds,
        username,
        userId,
        profile,
        bank,
        order,
        setUsername,
        setUserId,
        setChoice,
        setGameids,
        setProfile,
        setBank,
        setOrder,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
