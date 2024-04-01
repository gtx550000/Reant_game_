import { useState, useEffect } from "react";
import "../card/card-library.css";
import { Grid, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router";
export default function Card_library(props) {
  const [games, setGames] = useState(props.items);

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/gamedetail/${id}`);
  };
  useEffect(() => {
    const FetchDatass = async () => {
      await setGames(props.items);
    };
    FetchDatass();
  }, [props.items]);
  return (
    <div className="container-libraryss">
      <Grid container spacing={2}>
        {games.map((item, index) => (
          <Grid key={index} item xs={5} sm={6} md={4} lg={6}>
            <Card className="cardContainer-libraryss">
              <img
                src={item.image}
                alt={item.name}
                className="img-libraryss cardImage-libraryss"
                onMouseOver={(e) => {
                  e.target.style.filter = "blur(3px)";
                  e.target.nextElementSibling.style.opacity = "1";
                }}
                onMouseOut={(e) => {
                  e.target.style.filter = "blur(0px)";
                  e.target.nextElementSibling.style.opacity = "0";
                }}
                onClick={() => handleClick(games.id)}
              />
              <Typography variant="subtitle2" className="cardText-libraryss ">
                {item.name}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
