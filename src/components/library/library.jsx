import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "bootstrap/dist/css/bootstrap.min.css";
import CardActions from "@mui/material/CardActions";
import HistoryIcon from "@mui/icons-material/History";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "../library/library.css";
import "../text/a-box.css";
import Card_library from "../card/card-library";

import Instance from "../../axios_main";

/*1/4/24 */ import data from "../jsonfile/game_homepage.json";
const datas = data["Game_homepage"];

export default function Library() {
  const [select, setSelect] = useState("fav");
  const [favourite, setFavourite] = useState([]);
  const [games, setGames] = useState([]);
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [subtotals, setSubtotals] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteResponse = await Instance.get("/favorite/");
        const favoriteIds = favoriteResponse.data.map((item) => item.gameId);
        const favoriteGames = await Promise.all(
          favoriteIds.map(fetchGameDataById)
        );

        const totalss = favoriteGames.reduce((ac, item) => ac + item.price, 0);
        setFavourite(favoriteGames);

        setSubtotals(totalss);
        console.log(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      try {
        const billResponse = await Instance.get("/bill");
        const orderIds = billResponse.data.map((item) => item.orderId);
        const orderedGames = await Promise.all(
          orderIds.map(fetchOrderDataById)
        );
        const totals = orderedGames.reduce((ac, item) => ac + item.price, 0);
        setGames(orderedGames);
        const updatedItems = select === "fav" ? favourite : orderedGames;
        setSubtotal(totals);
        setItems(updatedItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChangeButton = (value) => {
    setSelect(value);
    setItems(value === "fav" ? favourite : games);
  };

  const fetchGameDataById = async (gameId) => {
    try {
      const response = await Instance.get(`/games/${gameId}`);
      const game = response.data["game"];
      game.image = game.image.split(" ")[0];
      return game;
    } catch (error) {
      console.error(`Error fetching game data for ID ${gameId}:`, error);
      throw error;
    }
  };

  const fetchOrderDataById = async (orderId) => {
    try {
      const response = await Instance.get(`/bill/order/${orderId}`);
      const order = response.data["Game"];
      order.image = order.image.split(" ")[0];
      return order;
    } catch (error) {
      console.error(`Error fetching game data for ID ${orderId}:`, error);
      throw error;
    }
  };
  return (
    <Box>
      {" "}
      <div className="a-box aa">
        <h2>
          <a>Library</a>
        </h2>
      </div>
      <Box
        className="container-library"
        sx={{
          display: "flex",
          padding: "30px 0px 30px 50px",
          justifyContent: "center",
          "@media (max-width: 999px)": {
            // Target screens less than 1000px
            flexDirection: "column", // Stack cards vertically on small screens
            alignItems: "center", // Center cards horizontally
            padding: "20px", // Adjust padding for smaller layouts
          },
          "@media (min-width: 1000px)": {
            // Add styles for larger screens (optional)
            // ... your existing styles here
          },
        }}
      >
        <Box className="kanit-thin" height={30}>
          <Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Grid container spacing={1}>
                <Grid xs={12}>
                  <Stack spacing={2} direction={"row"}>
                    <Card
                      sx={{ minWidth: 10 + "rem", height: 140 }}
                      className="greadient1-library"
                    >
                      <CardContent>
                        <div>
                          <VideogameAssetIcon />
                        </div>
                        <Typography gutterBottom variant="h5" component="div">
                          {games.length}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          sx={{ color: "#ffff" }}
                        >
                          Total Game in the Library
                        </Typography>
                      </CardContent>
                      <CardActions></CardActions>
                    </Card>

                    <Card
                      sx={{ minWidth: 10 + "rem", height: 140 }}
                      className="greadient2-library"
                    >
                      <CardContent>
                        <div>
                          <FavoriteIcon />
                        </div>
                        <Typography gutterBottom variant="h5" component="div">
                          {favourite.length}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          sx={{ color: "#ffff" }}
                        >
                          Wishlist in the Library
                        </Typography>
                      </CardContent>
                      <CardActions></CardActions>
                    </Card>

                    <Card
                      sx={{ minWidth: 10 + "rem", height: 140 }}
                      className="greadient3-library"
                    >
                      <CardContent>
                        <div>
                          <CloudDownloadIcon />
                        </div>
                        <Typography gutterBottom variant="h5" component="div">
                          {subtotal}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          sx={{ color: "#ffff" }}
                        >
                          All games price
                        </Typography>
                      </CardContent>
                      <CardActions></CardActions>
                    </Card>

                    <Card
                      sx={{ minWidth: 10 + "rem", height: 140 }}
                      className="greadient4-library"
                    >
                      <CardContent>
                        <div>
                          <HistoryIcon />
                        </div>
                        <Typography gutterBottom variant="h5" component="div">
                          {subtotals}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          sx={{ color: "#ffff" }}
                        >
                          Price all wishlist game
                        </Typography>
                      </CardContent>
                      <CardActions></CardActions>
                    </Card>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>{" "}
      <Box>
        <Stack
          direction="row"
          spacing={-5}
          sx={{
            marginTop: "2rem",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "150px 0px 30px 50px",
            }}
          >
            <Button
              color="error"
              variant={select === "fav" ? "contained" : "outlined"}
              onClick={() => handleChangeButton("fav")}
            >
              <FavoriteIcon />
              <Typography>Favorite</Typography>
            </Button>
          </div>

          <div
            style={{
              padding: "150px 0px 30px 50px",
            }}
          >
            <Button
              color="error"
              variant={select === "game" ? "contained" : "outlined"}
              onClick={() => handleChangeButton("game")}
            >
              <VideogameAssetIcon />
              <Typography sx={{ marginLeft: "0.5rem" }}>Game</Typography>
            </Button>
          </div>
        </Stack>
      </Box>
      <div style={{ textAlign: "center", padding: "30px 0px 0px 50px" }}>
        <Box
          sx={{
            maxWidth: "800px",
            width: "100%",
            margin: "0 auto", // Center horizontally
            "@media (min-width: 1100px)": {
              marginLeft: "30rem",
            },
          }}
        >
          <Card_library items={datas} />
        </Box>
      </div>
    </Box>
  );
}
