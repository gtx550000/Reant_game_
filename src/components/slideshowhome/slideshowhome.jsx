import { useEffect, useState } from "react";
import "../gamedetail/gamedetail.css";
import Slide_show from "../slideshowgamedetail/slideshowgamedetail";
import data from "../jsonfile/game_homepage.json";
import Instance from "../../axios_main";
import { useParams, useNavigate } from "react-router-dom";
import { useData, DataProvider } from "../contextprovider/provider";
const game_homepage = data["Game_homepage"];

function slideshowhome() {
  const navigate = useNavigate();
  const [games, setGames] = useState(game_homepage); // Initialize games as null
  const [images, setImages] = useState(game_homepage);
  const [cart, setCart] = useState(false);
  const [avaliable, setAvaliable] = useState(false);
  const [key, setKey] = useState();
  const { setGameids, setChoice } = useData(DataProvider);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Instance.get(`/games/${id}`);
        const data = response.data["game"];
        setGames(data);
        setImages(data.image.split(" "));

        const response_checkcart = await Instance.get("/cart/", {
          gameId: Number(id),
        });
        const datas = response_checkcart.data;
        const isGameInCart = datas.some((item) => item.gameId === parseInt(id)); // Check if the game is in cart
        setCart(isGameInCart);
      } catch (err) {
        console.log(err);
        /*navigate("/login");*/
      }
      try {
        const response = await Instance.post("/bill/all");
        const isActive = response.data.some(
          (item) => item.gameId === parseInt(id)
        );
        const keys = response.data.map((item) =>
          item.gameId === parseInt(id) ? item.key : null
        );
        setKey(keys);
        setAvaliable(isActive);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);
  const addshoppingcart = async () => {
    try {
      if (!cart) {
        const response = await Instance.post("/cart/", { gameId: Number(id) });
        setCart(true);
        if (response.data.check == false) {
          console.log("duplicate");
        } else {
          console.log("add successfull");
        }
      } else {
        const response = await Instance.delete("/cart/", {
          data: {
            gameId: Number(id),
          },
        });
        console.log("res: " + response);
        setCart(false);
      }
    } catch (err) {
      console.log("Error: " + err);
      navigate("/login");
    }
  };
  const buygame = () => {
    if (localStorage.getItem("token")) {
      navigate(`/payment`);
      setChoice("game");
      setGameids(parseInt(id));
    } else {
      navigate("/login");
    }
  };
  // Render nothing if games are not loaded yet
  if (!games) {
    return null;
  }

  return (
    <div>
      <section className="py-5">
        <div className="   ">
          <div className="">
            <div className="md-6">
              <Slide_show height="50px" width="10px" h="10px" items={images} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default slideshowhome;
