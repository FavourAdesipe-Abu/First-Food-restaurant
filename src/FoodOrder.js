import React, { Fragment, useState, useContext } from "react";
import { foodItemsContext } from "./App";
import "./FoodOrder.css";
import ErrorFunctionalBoundary from "./ErrorFunctionalBoundary";

const FoodOrder = (props) => {
  const [isErrorCatched, setIsErrorCatched] = useState(false);
  const menuItems = useContext(foodItemsContext);
  const selectedFood = props.food;
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(selectedFood.price);
  const [isOrdered, setIsOrdered] = useState(false);
  const handleQuantityChange = (event) => {
    try {
      setTotalAmount(selectedFood.price * event.target.value);
      setQuantity(event.target.value);
    } catch {
      setIsErrorCatched(true);
    }
  };

  const handleClick = () => {
    setIsOrdered(true);
    menuItems.map((item) => {
      if (item.id === selectedFood.id) {
        item.quantity = item.quantity - quantity;
      }
    });
  };
  return (
    <Fragment>
      {!isErrorCatched && (
        <Fragment>
          <h4 className="subTitle">{selectedFood.name}</h4>
          <img
            className="selFoodImg"
            src={require(`./images/${selectedFood.image}`)}
            alt={selectedFood.name}
          />
          <ul className="ulFoodDetails">
            <li>
              <p className="selFoodDesc">{selectedFood.desc}</p>
            </li>
            <li>
              <p className="selFoodPrice">{totalAmount}$</p>
            </li>
            <li className="selQuantity">
              <label>Quantity</label>
              <input
                type="number"
                defaultValue={1}
                className="quantity"
                min="1"
                max="10"
                onChange={handleQuantityChange}
              />
            </li>
            <li className="liDetails">
              <input
                type="text"
                className="inputFields"
                id="name"
                name="name"
                placeholder="Your Name"
              />
            </li>
            <li>
              <input
                type="text"
                className="inputFields"
                id="mobile"
                name="mobile"
                placeholder="Your mobile number"
              />
            </li>
            <li>
              <button className="btn btnOrder" onClick={handleClick}>
                Submit Order
              </button>
              <button
                className="btn btnReturnMenu"
                onClick={props.returnToMenu}
              >
                Return to Menu
              </button>
            </li>
            {isOrdered && (
              <li className="liMessage">
                <label>
                  Order Submitted! You will receive an SMS to once ready for
                  pickup.
                </label>
              </li>
            )}
          </ul>
        </Fragment>
      )}
      {isErrorCatched && <ErrorFunctionalBoundary />}
    </Fragment>
  );
};
export default FoodOrder;
