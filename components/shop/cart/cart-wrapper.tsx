import { CartProvider } from "components/shop/cart/cart-context";
import { getCart } from "lib/api";
import { ReactNode } from "react";

export default async function CartWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const cart = getCart();
  return <CartProvider cartPromise={cart}>{children}</CartProvider>;
}
