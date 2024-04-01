import { useState, useEffect } from "react";
import Instance from "../../axios_main";
import "../cart/cart.css";
import data from "../jsonfile/game_example.json";

function ShoppingCart() {
  let items = data["Game_example"];
  const [products, setProducts] = useState(items);

  const itemCount = products.reduce(
    (count, product) => count + parseInt(product.length) || 0,
    0
  );
  const subTotal = products.reduce(
    (total, product) => total + parseFloat(product.price),
    0
  );

  const totalPrice = subTotal;

  const removeItem = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };
  useEffect(() => {
    const Fetchdata = async () => {
      try {
        const response = await Instance.get("/cart/");
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    Fetchdata();
  }, []);

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
                        <a href="#">{product.title}</a>
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
                      <button onClick={() => removeItem(index)}>Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-product">
              <h3>There are no products in your cart.</h3>
              <button>Shopping now</button>
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
              <button type="button">Check Out</button>
            </div>
          )}
        </section>
        {/* End Summary */}
      </div>{" "}
    </div>
  );
}

export default ShoppingCart;
