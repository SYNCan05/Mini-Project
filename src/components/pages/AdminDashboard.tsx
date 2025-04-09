import { useEffect, useState } from "react";
import Button from "../elements/Button";
import CartProduct from "../layouts/CartProduct";
// import CardList from "../layouts/CardListOrder";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface PesananData {
  key: string;
  values: CartItem[];
  done: boolean;
}

export const AdminDashboard = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<PesananData[]>([]);

  const email = sessionStorage.getItem("email");
  const customerName = localStorage.getItem("name");
  const tableNumber = localStorage.getItem("meja");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token || token === "undefined") {
      window.location.href = "/auth/login";
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(cart);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedKeys = Object.keys(sessionStorage);
    const parsed = storedKeys.map((key) => {
      try {
        const value = sessionStorage.getItem(key);
        const parsedValue = value ? JSON.parse(value) : null;

        if (Array.isArray(parsedValue)) {
          return { key, values: parsedValue, done: false };
        }
      } catch {
        return null;
      }
      return null;
    });

    setOrders(parsed.filter(Boolean) as PesananData[]);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    window.location.href = "/auth/login";
  };

  const handleSubmitOrder = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
      alert("Tidak ada pesanan");
      return;
    }

    const storageKey = `cart-${customerName}-${tableNumber}`;
    sessionStorage.setItem(storageKey, JSON.stringify(cart));

    localStorage.removeItem("cart");
    localStorage.removeItem("name");
    localStorage.removeItem("meja");

    window.location.reload();
  };

  const handleDeleteOrder = (key: string) => {
    sessionStorage.removeItem(key);
    window.location.reload();
  };

  const toggleDone = (key: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.key === key ? { ...order, done: !order.done } : order
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full flex flex-col gap-16 justify-center items-center py-10 bg-gray-100 min-h-screen">
      <div className="absolute top-5 right-5">
        <Button
          classname="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Selamat Datang, <span className="text-blue-600">{email}</span>
        </h1>

        {cartItems.length > 0 ? (
          <div className="space-y-3">
            <p className="text-gray-600">
              Pesanan dari <span className="font-bold text-blue-700">{customerName}</span>,
              meja <span className="font-bold text-blue-700">{tableNumber}</span>
            </p>

            <CartProduct classname="w-full border shadow-sm rounded-lg overflow-hidden">
              <CartProduct.Header text="" />
              {cartItems.map((item) => (
                <CartProduct.Body
                  key={item.id}
                  title={item.name}
                  price={`$ ${item.price}`}
                >
                  <td className="p-3 text-center">{item.quantity}</td>
                </CartProduct.Body>
              ))}
            </CartProduct>

            <p className="text-right font-semibold text-lg text-gray-800">
              Total: $ {totalPrice}
            </p>

            <Button
              classname="bg-blue-600 hover:bg-blue-500 text-white py-2 w-full rounded-md shadow hover:scale-95 transition"
              onClick={handleSubmitOrder}
            >
              Upload Pesanan
            </Button>
          </div>
        ) : (
          <p className="text-center text-red-600 font-semibold">
            Belum ada pesanan
          </p>
        )}
      </div>

      <div className="w-[90%]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Antrian Pesanan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div
              key={order.key}
              className={`relative bg-white p-4 rounded-lg shadow cursor-pointer transition border-2 ${
                order.done ? "border-green-500" : "border-yellow-400"
              }`}
              onClick={() => toggleDone(order.key)}
            >
              <Button
                classname="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                onClick={() => {
                  handleDeleteOrder(order.key);
                }}
              >
                Hapus
              </Button>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {order.key}
              </h3>
              <div className="space-y-1">
                {order.values.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                  </div>
                ))}
              </div>
              <p className={`mt-2 text-sm font-semibold ${order.done ? "text-green-600" : "text-yellow-600"}`}>
                Status: {order.done ? "Selesai" : "Belum Selesai"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
