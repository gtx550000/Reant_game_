import { createContext, useContext, useState } from "react";
const DataRegContext = createContext();
export const DataRegProvider = ({ children }) => {
  const [namegame, setNamegame] = useState();
  const [videourl, setVideourl] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [releaseDate, setreleaseDate] = useState();
  const [imageurl, setImageurl] = useState();
  const [description, setDescription] = useState();
  const [choice, setChoice] = useState();
  const [gameIds, setGameids] = useState();
  return (
    <DataRegContext.Provider
      value={{
        namegame,
        videourl,
        category,
        price,
        releaseDate,
        imageurl,
        description,
        choice,
        gameIds,
        setNamegame,
        setVideourl,
        setCategory,
        setPrice,
        setreleaseDate,
        setImageurl,
        setDescription,
        setChoice,
        setGameids,
      }}
    >
      {children}
    </DataRegContext.Provider>
  );
};
export const useDataReg = () => useContext(DataRegContext);
