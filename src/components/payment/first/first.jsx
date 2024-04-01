import { useState } from "react";
import Grid from "@mui/material/Grid";
import "../first/banks.css";
import "../first/first.css";
import "../../text/a-box.css";
import { DataProvider, useData } from "../../contextprovider/provider";
import {
  Paper,
  Typography,
  Select,
  MenuItem,
  Card,
  CardMedia,
} from "@mui/material";
import { useEffect } from "react";
import Instance from "../../../axios_main";
const CartForm = () => {
  // Sample data for cart
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Game 1",
      price: 50,
      image: "https://inwfile.com/s-da/avqv6z.jpg",
    },
    { id: 2, name: "Game 2", price: 40, image: "game2.jpg" },
    { id: 3, name: "Game 3", price: 60, image: "game3.jpg" },
  ]);

  // Sample data for bank options
  const [bankOptions] = useState([
    { name: "Bangkok bank", img: "bank bank-bbl" },
    { name: "K bank", img: "bank bank-kbank" },
    { name: "Krung Thai bank", img: "bank bank-ktb" },
    { name: "Ayudhya bank", img: "bank bank-bay" },
    { name: "Siam Commercial bank", img: "bank bank-scb" },
    { name: "Savings bank", img: "bank bank-gsb" },
  ]);
  const fetchGameDataById = async (gameId) => {
    try {
      const response = await Instance.get(`/games/${gameId}`); // Adjust the endpoint as per your server API
      const game = response.data["game"];
      game.image = game.image.split(" ")[0];
      return game;
    } catch (error) {
      console.error(`Error fetching game data for ID ${gameId}:`, error);
      throw error;
    }
  };
  const { choice, gameIds, username } = useData(DataProvider);
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    const FetchData = async () => {
      try {
        if (choice === "cart") {
          const response = await Instance.get("/cart/");
          const gameIds = response.data.map((item) => item.gameId);
          const allGamesPromises = gameIds.map((gameId) =>
            fetchGameDataById(gameId)
          );
          const allGames = await Promise.all(allGamesPromises);
          setSubtotal(cartItems.reduce((acc, item) => acc + item.price, 0));
          setCartItems(allGames);
        } else if (choice === "game") {
          console.log(gameIds);
          const game = await fetchGameDataById(gameIds);
          console.log("game", game);
          setSubtotal(game.price);
          setCartItems([game]); // Wrap the game data in an array to ensure it's iterable
        }
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, []);
  // State to keep track of selected bank
  const [selectedBank, setSelectedBank] = useState("");

  // Function to handle bank selection
  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  // Calculate subtotal

  return (
    <div
      style={{
        padding: "30px 0px 0px 20px",
      }}
    >
      <Grid container spacing={3} direction="row">
        {/* Left Part: Cart Details */}
        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: "5%" }}>
            <div
              className="a-box"
              style={{ margin: "-15px", marginBottom: "1rem" }}
            >
              <h2>
                <a>Cart Detail</a>
              </h2>
            </div>
            <Typography variant="subtitle1" gutterBottom>
              Username: {username}
            </Typography>
            <Typography variant="subtitle1">Subtotal: ${subtotal}</Typography>
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
              {choice == "cart" ? (
                cartItems.map((item) => (
                  <Card key={item.id} style={{ marginBottom: 10 }}>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{ padding: "5%" }}
                    >
                      <Grid item xs={4}>
                        <CardMedia
                          component="img"
                          height="100"
                          image={item.image}
                          alt={item.name}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <Typography>{item.name}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>${item.price}</Typography>
                      </Grid>
                    </Grid>
                  </Card>
                ))
              ) : (
                <Card key={cartItems.id} style={{ marginBottom: 10 }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{ padding: "5%" }}
                  >
                    <Grid item xs={4}>
                      <CardMedia
                        component="img"
                        height="100"
                        image={cartItems.image}
                        alt={cartItems.name}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <Typography>{cartItems.name}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>${cartItems.price}</Typography>
                    </Grid>
                  </Grid>
                </Card>
              )}
            </div>
            <hr />
          </Paper>
        </Grid>

        {/* Right Part: Bank Selection */}
        <div></div>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: "5%" }}>
            <div
              className="a-box"
              style={{ margin: "-15px", marginBottom: "11.7rem" }}
            >
              <h2>
                <a>Select method</a>
              </h2>
            </div>
            <Typography variant="subtitle1" gutterBottom>
              Payment: QRCode & Bank Transfer
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Bank: {selectedBank}
            </Typography>
            <Select value={selectedBank} onChange={handleBankChange} fullWidth>
              <MenuItem value="">Select Bank</MenuItem>
              {bankOptions.map((bank) => (
                <MenuItem key={bank.name} value={bank.name}>
                  <Typography gutterBottom variant="h" component="div">
                    <i className={bank.img}></i>
                    {bank.name}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartForm;
