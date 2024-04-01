import { useState, useEffect } from "react";
import data from "../jsonfile/game_example.json";
import datas from "../jsonfile/game_homepage.json";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./categories.css";
import "../text/a-box.css";
import Card_show from "../card/card-show";
import SlideShow from "../slide_show/slide_show";
import Slide from "../slide_show/slide";
import { useParams } from "react-router";
import Instance from "../../axios_main";
let itemss = data["Game_example"];
let item = datas["Game_homepage"];
function Categories() {
  const { category } = useParams();
  const [categories_name] = useState(category);
  const [games, setGames] = useState(itemss);
  const [allgames, setAllgames] = useState(item);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Instance.get(`games/category/${category}`);
        console.log(response.data);
        setAllgames(response.data["game"]);
        setGames(response.data["game"].slice(0));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="body-category">
      <div className="container-card-show">
        <div className="a-box" style={{ margin: "1rem 0.5rem" }}>
          <h2>
            <a>{categories_name}</a>
          </h2>
        </div>
        <div className="container-cardshows2">
          <Slide slides={games} />
        </div>
        <div className="container-cardshows">
          <SlideShow slides={games} />
        </div>
        <br />
        <br />
        <div className="a-box" style={{ margin: "1rem 0.5rem" }}>
          <h2>
            <a>All game</a>
          </h2>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="container">
        <Card_show className="card-shows" items={allgames} />
      </div>
    </div>
  );
}
export default Categories;
