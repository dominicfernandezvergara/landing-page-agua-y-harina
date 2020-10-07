import React from "react";
import { useSelector } from "react-redux";

import styles from "./orderSummary.module.css";

import formatNumber from "../../utils/numbers";

function OrderSummary() {
  const dataOrders = useSelector(
    (state) => state.shoppingCart.shoppingCartProducts
  );
  const paymentDetail = useSelector((state) => state.shoppingCart.amount);
  const summaryOrderProductsList = dataOrders.map((item) => {
    return (
      <div key={item.id} className={styles.productOrder}>
        <img className={styles.productImage} src={item.image} alt="" />
        <p className={styles.productName}>{item.name}</p>
        <p className={styles.productPrice}>${formatNumber(item.price)}</p>
        <p className={styles.productQuantity}>x{item.quantity} </p>
        <p className={styles.productTotalAmount}>
          ${formatNumber(item.totalAmount)}
        </p>
      </div>
    );
  });
  return (
    <div className={styles.orderSummaryResponsiveSmall}>
      <div className={styles.titleOrderSummary}> Resumen de la Orden</div>
      <div className={styles.containerProducts}>
        <div className={styles.subtitle}>Productos</div>
        <div className={styles.wrapperOrdenSummaryProductList}>
          {summaryOrderProductsList}
        </div>
      </div>
      <div className={styles.subtitle}>Pago</div>
      <div className={styles.containerPaymentDetail}>
        <p className={styles.text}>Total a pagar:</p>
        <div className={styles.totalAmount}>${formatNumber(paymentDetail)}</div>
      </div>
    </div>
  );
}

export default OrderSummary;