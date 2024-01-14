import React from "react";
import { useCart } from "../../../hooks/cartContext";

import SideDrawer from "../SideDrawer/SideDrawer";
import CartFooter from "./CartFooter/CartFooter";
import CartContent from "./CartContent/CartContent";

export default function Cart() {
  const { cartItems, isCartOpen, closeCart } = useCart();

  return (
    <SideDrawer
      isDrawerOpen={isCartOpen}
      closeSideDrawer={closeCart}
      title={"Kosár"}
      ContentComponent={<CartContent />}
      FooterComponent={cartItems.length > 0 ? <CartFooter /> : null}
    />
  );
}
