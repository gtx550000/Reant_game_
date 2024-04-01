import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./card-show.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import Instance from "../../axios_main";
function Card_show(props) {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [favourite, setFavourite] = useState(
    Array(props.items.length).fill(false)
  );
  const items = props.items;

  const navigate = useNavigate();
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the items array to get the items for the current page
  const displayedItems = items.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < items.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const navigated = (id) => {
    navigate(`/gamedetail/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Instance.get("/favorite/");

        const checks = props.items.map((game) =>
          response.data.some((favoriteId) => favoriteId.gameId === game.id)
        );
        setFavourite(checks);
        console.log(favourite);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchData();
  }, [props.items]);

  const addFavourite = async (id, i) => {
    try {
      // Ensure id is within the bounds of the favourite array
      if (i >= 0 && i < favourite.length) {
        if (!favourite[i]) {
          await Instance.post("/favorite", { gameId: Number(id) });
        } else {
          await Instance.delete("/favorite", { data: { gameId: Number(id) } });
        }
        console.log(favourite);
        // Update the favourite state based on the action performed
        setFavourite((prevFavourite) => {
          const updatedFavourite = [...prevFavourite];
          updatedFavourite[i] = !prevFavourite[i];
          return updatedFavourite;
        });
      }
    } catch (err) {
      navigate("/");
      console.log(err);
    }
  };
  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {displayedItems.map((item, i) => (
          <div className="col" key={i}>
            <div className="card shadow-sm">
              <img
                src={item.image.split(" ")[0]}
                alt={item.name}
                style={{
                  width: "100%",
                  maxHeight: "225px",
                }}
              ></img>

              <div className="card-body">
                <div className="forn-cen">{item.name}</div>
                <p className="card-text">{item.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => addFavourite(item.id, i)}
                    >
                      {!favourite[i]
                        ? "Add to your wishlist"
                        : "Remove from your wishlist"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigated(item.id)}
                    >
                      <div>
                        <a>View game</a>
                      </div>
                    </button>
                  </div>
                  <small className="text-body-secondary">2019</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          type="button"
          className="btn btn-outline-secondary me-2"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleNextPage}
          disabled={endIndex >= items.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

Card_show.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default Card_show;
