import { useEffect, useState } from "react";
import "../gamedetail/gamedetail.css";
import Slide_show from "../slideshowgamedetail/slideshowgamedetail";
import data from "../jsonfile/game_homepage.json";
import Instance, { refreshPage } from "../../axios_main";
import { useParams, useNavigate } from "react-router-dom";
import { useData, DataProvider } from "../contextprovider/provider";
const game_homepage = data["Game_homepage"];

function Gamedetail() {
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
      if (!localStorage.getItem("token")) {
        navigate("/login");
      }
      refreshPage();
      try {
        const response = await Instance.get(`/games/${id}`);
        const data = response.data;
        console.log(data);
        setGames(data);
        setImages(data.image.split(" "));
      } catch (err) {
        console.log(err);
      }
      try {
        const response_checkcart = await Instance.get("/cart/");
        const datas = response_checkcart.data;
        const isGameInCart = datas.some((item) => item.gameId === parseInt(id)); // Check if the game is in cart
        setCart(isGameInCart);
      } catch (err) {
        console.error(err);
      }
      try {
        const response = await Instance.post("/bill/all");
        console.log(response.data);
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
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <Slide_show
                height="100px"
                width="100px"
                h="10px"
                items={images}
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">{games.name}</h1>
              <div className="fs-5 mb-5">
                <span className="text-decoration">{games.price} BATH</span>
              </div>
              <p className="lead">{games.description}</p>
              {avaliable && (
                <div className="d-flex">
                  <h4>key: </h4>
                  <h4 style={{ marginLeft: "10px" }}>{key}</h4>
                </div>
              )}
              {!avaliable && (
                <div className="d-flex">
                  <button
                    className={`btn ${cart ? "btn-success" : "btn-outline-dark"} flex-shrink-0`}
                    type="button"
                    onClick={() => addshoppingcart()}
                  >
                    <i className="bi-cart-fill me-1"></i>
                    {cart ? "Already in cart" : "Add to cart"}
                  </button>
                  {cart ? (
                    false
                  ) : (
                    <button
                      className="btn btn-outline-dark flex-shrink-0"
                      type="button"
                      onClick={() => buygame()}
                    >
                      Buy now
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Gamedetail;
