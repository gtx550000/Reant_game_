import { useState, useEffect } from "react";
import Instance, { refreshPage } from "../../axios_main";
import "../cart/cart.css";
import { useNavigate } from "react-router";
import { useData, DataContext } from "../contextprovider/provider";

function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const itemCount = products.reduce(
    (count, product) => count + parseInt(product.length) || 0,
    0
  );
  const { setChoice } = useData(DataContext);
  const subTotal = products.reduce(
    (total, product) => total + parseFloat(product.price),
    0
  );

  const totalPrice = subTotal;

  const FetchGame = async (id) => {
    try {
      const response = await Instance.get(`/games/${id}`);
      const data = response.data;
      data.image = data.image.split(" ")[0];
      console.log(data);
      return data;
    } catch (error) {
      return id + " not valid";
    }
  };

  const removeItem = async (index, id) => {
    try {
      const requestBody = { gameId: id };
      await Instance.delete(`/cart/`, { data: requestBody });
      const newProducts = [...products];
      newProducts.splice(index, 1);
      setProducts(newProducts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const Fetchdata = async () => {
      refreshPage();
      try {
        const response = await Instance.get("/cart/");
        const data = response.data;
        const gamePromises = data.map((order) => FetchGame(order.gameId));
        const gamesData = await Promise.all(gamePromises);
        setProducts(gamesData);
        console.log(gamesData);
      } catch (error) {
        navigate("/login");
        console.error(error);
      }
    };
    Fetchdata();
  }, []);
  const handleGamedetails = () => {
    setChoice("cart");
    navigate("/payment");
  };
  return (
    <div id="app">
      <div className="body-cart">
        {/* Header */}
        <header className="container">
          <h1>Shopping Cart</h1>
          <ul className="breadcrumb">
            <li>Home</li>
            <li>Shopping Cart</li>
            <li>Price includes tax</li>
          </ul>
          <span className="count">{itemCount} items in the bag</span>
        </header>

        <section className="container">
          {products.length > 0 ? (
            <ul className="products">
              {products.map((product, index) => (
                <li className="row" key={index}>
                  <div className="col left">
                    <div className="thumbnail">
                      <a href="#">
                        <img src={product.image} alt={product.name} />
                      </a>
                    </div>
                    <div className="detail">
                      <div className="name">
                        <a>{product.name}</a>
                      </div>

                      <div className="price">
                        {product.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="col right">
                    <div className="remove">
                      <button onClick={() => removeItem(index, product.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-product">
              <h3>There are no products in your cart.</h3>
              <button onClick={() => navigate("/")}>Shopping now</button>
            </div>
          )}
        </section>
        {/* End Product List */}

        {/* Summary */}
        <section className="container">
          {products.length > 0 && (
            <div className="summary">
              <ul>
                <li>
                  Subtotal{" "}
                  <span>
                    {subTotal.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </li>

                <li className="total">
                  Total{" "}
                  <span>
                    {totalPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </li>
              </ul>
            </div>
          )}

          {products.length > 0 && (
            <div className="checkout">
              <button onClick={handleGamedetails} type="button">
                Check Out
              </button>
            </div>
          )}
        </section>
        {/* End Summary */}
      </div>{" "}
    </div>
  );
}

export default ShoppingCart;
