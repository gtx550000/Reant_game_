import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "../jsonfile/game_homepage";
import datas from "../jsonfile/category_page.json";

import "../text/a-box.css";
import "./page.css";
import { useNavigate } from "react-router";
import Card_show from "../card/card-show";
import Card_category from "../card/card-category";
import PropTypes from "prop-types";
import { useData, DataProvider } from "../contextprovider/provider";
import { useEffect } from "react";

import Gamehome from "../slideshowhome/slideshowhome";

let items = data["Game_homepage"];
let category_item = datas["Category"];

const Hero = () => {
  const navigate = useNavigate();
  const { userId } = useData(DataProvider);

  const category = (event, links) =>
    navigate(`/categories/${links}`, { replace: true, state: { links } });
  useEffect(() => {
    const Fetchdata = async () => {
      console.log(userId);
    };
    Fetchdata();
  }, []);
  return (
    <div>
      <body>
        <div /**/ className="bigimage-container1">
          <Gamehome></Gamehome>
        </div>

        <div className="album py-5 bg-body-tertiary">
          <div className="a-box">
            <h2>
              <a>Category</a>
            </h2>
          </div>
          <div className="gameListContainer-responsive">
            <button
              type="button"
              onClick={(event) => category(event, "Action")}
              className="btn btn-primary"
            >
              Action
            </button>
            <button
              type="button"
              onClick={(event) => category(event, "Adventure")}
              className="btn btn-secondary"
            >
              Adventure
            </button>
            <button
              type="button"
              onClick={(event) => category(event, "RPG")}
              className="btn btn-success"
            >
              RPG
            </button>
            <button
              type="button"
              onClick={(event) => category(event, "Racing")}
              className="btn btn-danger"
            >
              Racing
            </button>
            <button
              type="button"
              onClick={(event) => category(event, "Cooking")}
              className="btn btn-warning"
            >
              Cooking
            </button>
            <button
              type="button"
              onClick={(event) => category(event, "Survival")}
              className="btn btn-info"
            >
              Survival
            </button>
            <button
              type="button"
              onClick={(event) => category(event, "Story")}
              className="btn btn-light"
            >
              Story
            </button>
            <button
              type="button"
              onClick={(event) => category(event, "Horror")}
              className="btn btn-dark"
            >
              Horror
            </button>
          </div>
          <Card_category items={category_item} />
          <div className="a-box">
            <h2>
              <a>Trending game</a>
            </h2>
          </div>
          <div className="container">
            <Card_show items={items} />
          </div>
        </div>

        <footer className="text-body-secondary py-5 bigimage-container2">
          <div className="container">
            <p className="float-end mb-1">
              <a href="#">Back to top</a>
            </p>
            <p className="mb-1">
              Album example is &copy; Bootstrap, Power By Bootstrap and
              customize it for yourself!
            </p>
            <p className="mb-0">
              {" "}
              Register game :
              <a href="/register" className="font-coloer-home1 ">
                Register page
              </a>
              ,Suport User : Contact Admin -
              <a href="/report" className="font-coloer-home1 ">
                {" "}
                Report Problem{" "}
              </a>
            </p>
          </div>
        </footer>
        <script
          src="/docs/5.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
        ></script>
      </body>
    </div>
  );
};

Hero.propTypes = {
  item: PropTypes.arrayOf(PropTypes.object.isRequired),
};
export default Hero;
