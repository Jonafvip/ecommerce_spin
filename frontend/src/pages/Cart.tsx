import { type OmitUserInCart } from "@/types/types";
import { api } from "@/api/api";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useCart } from "@/context/CartContext";

export const Cart = () => {
  const [cartData, setCartData] = useState<OmitUserInCart[]>([]);
  const { refreshCartCount } = useCart();

  const subtotal = cartData.reduce((accCart, car) => {
    const cartTotal = car.details.reduce((accDetail, det) => {
      const itemPrice = Number(det.product_price) * det.quantity;
      return accDetail + itemPrice;
    }, 0);
    return accCart + cartTotal;
  }, 0);

  const handleIncrease = async (detailId: number, currentQuantity: number) => {
    const newQuantity = currentQuantity + 1;

    setCartData((prev) =>
      prev.map(
        (car): OmitUserInCart => ({
          ...car,
          details: car.details.map((det) =>
            det.id === detailId ? { ...det, quantity: newQuantity } : det,
          ),
        }),
      ),
    );
    try {
      await api.updateCartItemQuantity(detailId, newQuantity);
      await refreshCartCount();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Respuesta de error de Django:", error.response?.data);
      }
    }
  };

  const handleDecrease = async (detailId: number, currentQuantity: number) => {
    if (currentQuantity <= 1) return;

    const newQuantity = currentQuantity - 1;

    setCartData((prev) =>
      prev.map(
        (car): OmitUserInCart => ({
          ...car,
          details: car.details.map((det) =>
            det.id === detailId
              ? {
                  ...det,
                  quantity: newQuantity,
                  total: Number(det.product_price) * newQuantity,
                }
              : det,
          ),
        }),
      ),
    );

    try {
      await api.updateCartItemQuantity(detailId, newQuantity);
      await refreshCartCount();
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  const handleRemove = async (detailId: number) => {
    setCartData((prev) =>
      prev.map((car) => ({
        ...car,
        details: car.details.filter((det) => det.id !== detailId),
      })),
    );

    try {
      await api.removeCartItem(detailId);
      await refreshCartCount();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data;
        console.log(serverError);
      }
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await api.getCartList();
        setCartData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartData();
  }, []);

  const handleCheckout = async () => {
    try {
      await api.postOrder(
        cartData.flatMap((car) =>
          car.details.map((det) => ({
            product: det.product,
            quantity: det.quantity,
          })),
        ),
      );
      alert("Compra realizada");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data;
        console.log(serverError);
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center  md:flex-row md:justify-center">
      {/* section */}
      <section className="w-full min-h-175 md:w-10/17">
        <h2 className="text-4xl font-light mb-2 p-8 md:p-10">Cart</h2>
        <Separator />
        {cartData.map((car) => (
          <div key={car.id} className="p-2 md:p-0">
            {car.details.map((det) => (
              <div key={det.id} className="w-full flex">
                {" "}
                <div className="w-full flex flex-wrap py-4 pl-9 gap-10">
                  <img src={det.product_image} className="w-44 h-50" />
                  <div className="flex flex-col justify-between">
                    <div className="py-2">
                      <h2 className="text-2xl font-light">
                        {det.product_name}
                      </h2>
                      <p>{det.product_description}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-xl"
                        onClick={() => handleDecrease(det.id, det.quantity)}
                        disabled={det.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="text-xl font-medium text-gray-700 min-w-5 text-center">
                        {det.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-xl"
                        onClick={() => handleIncrease(det.id, det.quantity)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between p-6">
                  <p className="text-2xl">
                    ${Number(det.product_price) * det.quantity}
                  </p>
                  <Button
                    variant="ghost"
                    className="cursor-pointer pt-4 "
                    onClick={() => handleRemove(det.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ))}
        <Separator />
      </section>

      {/* aside */}
      <aside className="w-full py-20 px-8 md:px-8 md:w-1/3 md:py-30">
        <div className="border rounded-2xl p-6 shadow-md flex flex-col gap-3 md:gap-4 bg-gray-50 ">
          <h2 className="text-xl font-light tracking-wider border-b pb-3">
            Resumen del pedido
          </h2>

          <div className="flex flex-col justify-between items-center md:flex-row text-lg py-2 px-4">
            <span className="text-gray-600">SubTotal:</span>
            <span className="font-light text-xl">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex flex-col justify-between items-center md:flex-row text-lg py-2 px-4">
            <span className="text-gray-600">Envio:</span>
            <span className="font-light text-xl">Calculado para pagar</span>
          </div>

          <div className="flex flex-col justify-between items-center md:flex-row text-lg py-2 px-4">
            <span className="text-gray-600">Tax:</span>
            <span className="font-light text-xl">$0.00</span>
          </div>

          <Separator />

          <div className="flex flex-col justify-between items-center md:flex-row text-lg py-2 px-4">
            <span className="text-gray-600">Total:</span>
            <span className="font-semibold text-2xl">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <Button
            className="w-40 max-w-40  md:max-w-full mx-auto py-6 text-2xs mt-2 md:w-80 md:text-lg"
            onClick={handleCheckout}
          >
            Continuar Compra
          </Button>
          <div className="flex flex-col gap-3 px-2 py-4">
            <div className="flex gap-5">
              <ShieldCheck /> <h4>Suguridad al Comprar</h4>
            </div>
            <p className="pl-10">
              Transacciones encryptadas via Paypal o Stripe
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};
