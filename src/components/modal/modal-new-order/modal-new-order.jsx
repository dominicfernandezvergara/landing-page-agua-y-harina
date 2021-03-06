import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import styles from "./modalNewOrder.module.css";
import { addNewProductShopCar } from "../../../redux/shopping-cart-store";

function ModalNewOrder({ data, close }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const totalAmount = quantity * data.price;

  const onClickAddProductShopCar = () => {
    const newProduct = {
      id: data.id,
      name: data.title,
      data: "",
      quantity,
      image: data.image,
      totalAmount,
      price: data.price,
      type: data.type,
    };
    dispatch(addNewProductShopCar(newProduct));
    close();
  };
  const subtractQuantity = () => {
    if (!(quantity === 1)) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={styles.containerModalNewOrder}>
      <div className={styles.newOrderProductTitle}>{data.title}</div>
      <img className={styles.newOrderProductImage} src={data.image} alt="" />
      <div className={styles.newOrderProductText}>
        Agrega la cantidad que deseas ordenar
      </div>
      <div className={styles.containerQuantityChange}>
        <button
          type="button"
          className={styles.buttonChange}
          onClick={() => subtractQuantity()}
        >
          -
        </button>
        <div className={styles.quantityInput}>{quantity}</div>

        <button
          type="button"
          className={styles.buttonChange}
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className={styles.addProductButton}
        onClick={() => onClickAddProductShopCar()}
      >
        AGREGAR AL PEDIDO ${totalAmount}
      </button>
    </div>
  );
}
ModalNewOrder.propTypes = {
  data: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
export default ModalNewOrder;
