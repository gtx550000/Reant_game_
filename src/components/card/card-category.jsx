import { useNavigate } from "react-router";
import "./card-category.css";
import PropTypes from "prop-types";

function Card_category(props) {
  const items = props.items;
  const navigates = useNavigate();
  const categorys = (event, links) =>
    navigates("/categories", { replace: true, state: { links } });
  return (
    <div className="gameListContainer">
      {items.map((item, i) => (
        <div
          className="game"
          key={i}
          onClick={(event) => categorys(event, item.name)}
          style={{
            background: `url(${item.image})`,
            backgroundSize: "auto 350px",
          }}
        >
          <h1 className="h1-game_category">{item.name}</h1>
        </div>
      ))}
    </div>
  );
}
Card_category.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object.isRequired),
};
export default Card_category;
