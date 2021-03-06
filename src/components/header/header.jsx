import React, { Fragment, useState, useEffect, useLayoutEffect } from "react";
import cn from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

import styles from "./header.module.css";
import Logo from "../logo/logo";
import Drawer from "./drawer";
import ShoppingCartDrawer from "../shopping-cart-drawer";
import { ReactComponent as InicioIcon } from "../../images/mi-coleccion-de-iconos/casa.svg";
import { ReactComponent as SomosIcon } from "../../images/mi-coleccion-de-iconos/grupo.svg";
import { ReactComponent as ProductsIcon } from "../../images/mi-coleccion-de-iconos/un-pan.svg";
import { ReactComponent as ContactoIcon } from "../../images/mi-coleccion-de-iconos/contacto.svg";

// Github : https://github.com/akiran/react-slick
// Slick carousel API : https://react-slick.neostack.com/docs/api/#centerPadding
const iconInicio = (
  <InicioIcon className={styles.imageboxAbout} width="30" height="30" />
);
const iconSomos = (
  <SomosIcon className={styles.imageboxAbout} width="30" height="30" />
);
const iconProductos = (
  <ProductsIcon className={styles.imageboxAbout} width="30" height="30" />
);
const iconContacto = (
  <ContactoIcon className={styles.imageboxAbout} width="30" height="30" />
);
export const dataButtonsList = [
  {
    name: "INICIO",
    icon: iconInicio,
    path: "/home",
    active: true,
    id: 1,
  },
  {
    name: "SOMOS",
    icon: iconSomos,
    path: "/about",
    active: false,
    id: 2,
  },
  {
    name: "PRODUCTOS",
    icon: iconProductos,
    path: "/products",
    active: false,
    id: 3,
  },
  {
    name: "CONTACTO",
    icon: iconContacto,
    path: "/contacto",
    active: false,
    id: 4,
  },
  // {
  //   name: "MI PEDIDO",
  //   path: "/mi-pedido",
  //   active: false,
  //   id: 5,
  // },
];

function Header() {
  const history = useHistory();
  const location = useLocation();
  const { pathname: currentPathname } = location;
  const [buttonHeaderData, setButtonHeaderData] = useState(dataButtonsList);
  const onClickHeaderButton = (itemSelected) => {
    const newHeaderData = buttonHeaderData.map((item) => ({
      ...item,
      active: item.id === itemSelected.id,
    }));

    setButtonHeaderData(newHeaderData);
    history.push(itemSelected.path);
  };

  useEffect(() => {
    const newHeaderData = buttonHeaderData.map((item) => ({
      ...item,
      active: item.path === currentPathname,
    }));
    setButtonHeaderData(newHeaderData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemDelay = (itemId) => {
    let delay = 0;
    if (itemId === 2) {
      delay = 300;
    }
    if (itemId === 3) {
      delay = 400;
    }
    if (itemId === 4) {
      delay = 500;
    }

    return delay;
  };

  const [startScrolling, setStartScrolling] = useState(false);

  useLayoutEffect(() => {
    window.onscroll = function () {
      if (window.pageYOffset === 0) {
        setStartScrolling(false);
      } else {
        setStartScrolling(true);
      }
    };

    return () => {
      window.onscroll = null;
    };
  }, [startScrolling]);
  return (
    <Fragment>
      {/* Header Small */}

      <header
        className={cn(styles.headerResponsiveSmall, {
          [styles.headerTransparent]: startScrolling,
        })}
      >
        <div className={styles.containerLogo}>
          <Logo width={110} height={60} />
        </div>

        <div className={styles.containerButton}>
          <ShoppingCartDrawer />
        </div>
        <div className={styles.containerButton}>
          <Drawer />
        </div>
      </header>

      {/* Header Large */}

      <header
        className={cn(styles.headerResponsiveLarge, {
          [styles.headerTransparent]: startScrolling,
        })}
      >
        <div className={styles.containerLogo}>
          <Fade triggerOnce>
            <Logo width={150} height={80} />
          </Fade>
        </div>
        <div className={styles.containerHeaderButton}>
          {buttonHeaderData.map((item) => {
            const delayNumber = itemDelay(item.id);

            return (
              <Fade
                className={cn(styles.headerButton)}
                delay={delayNumber}
                triggerOnce
                key={item.name}
              >
                <button
                  className={cn(
                    styles.headerButton,
                    item.active === true ? styles.active : null
                  )}
                  type="button"
                  key={item.id}
                  onClick={() => onClickHeaderButton(item)}
                >
                  {item.name}
                </button>
              </Fade>
            );
          })}
        </div>
        <Fade triggerOnce>
          <ShoppingCartDrawer />
        </Fade>
      </header>
    </Fragment>
  );
}

export default Header;
