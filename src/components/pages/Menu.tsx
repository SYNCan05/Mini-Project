import { useEffect, useState } from "react";
import Card from "../layouts/Card";
import Button from "../elements/Button";
// import { FetchProducts } from "../../service/FetchProduct";
import CartProduct from "../layouts/CartProduct";
import Form from "../layouts/Form";
import { FetchProduct } from "../../service/FetchProduct";
import Loading from "../layouts/Loading";
import RadioButton from "../elements/RadioButton";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

const Products = () => {
  // const { data, setData } = FetchProducts();
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState<string>("");
  const [meja, setMeja] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const {handleSearch, isLoading, error, setData, data} = FetchProduct();
  
  const handleAddToCart = (id: number) => {
    setCart((prevCart: any) => {
      const existingItem = prevCart.find((item : any) => item.id === id);
      if (existingItem) {
        return prevCart.map((item : any) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const product = data.find((product) => product.id === id);
        return product ? [...prevCart, { ...product, quantity: 1 }] : prevCart;
      }
    });
  };

  
  const handleUploadCart = () => {
    const dataCart = cart
      .map((item) => {
        const product = cart.find((product) => product.id === item.id);
        return product
          ? {
              id: item.id,
              name: product.name,
              price: product.price,
              quantity: item.quantity,
              cekout: new Date().toISOString(),
            }
          : null;
      })
      .filter(Boolean);
      if(name.length > 0 && meja.length > 0){
        localStorage.setItem("name", name);
        localStorage.setItem("meja", meja);
        localStorage.setItem("cart", JSON.stringify(dataCart));
        setCart([]);
        setName("");
        setMeja("");
        alert("pesanan anda dalam antrian")
      }else{
        alert("lengkapi data yang belum diisi");
      }
  };


  useEffect(() => {
    const filterProducts = async(query: string, category: string) => {
      const res = await handleSearch(query, category);
      setData(res);
    };
    filterProducts(query, category);
  }, [query, category]);

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center font-bold text-2xl text-red-600">
        Error: {error.message}
      </div>
    );
  }

  const handleIncrement = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalHarga = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
    {/* NAVBAR */}
    <div className="w-full backdrop-blur-md sticky top-0 z-10 max-sm:text-xs">
    <div className="flex w-[85%] max-md:w-full max-md:p-2 max-md:py-3 mx-auto items-center justify-evenly py-5 flex-wrap">
      <Form.Input
        text="text"
        placeholder="Search..."
        value={query}
        onchange={(e) => setQuery(e.target.value)}
        classname="rounded-md h-[40px] w-[400px] p-2  max-md:w-full max-md:mb-5 focus:outline-none border-1  border-gray-300 "
        />
        <RadioButton>
          <RadioButton.Body  checked={category === ""} onChange={() => setCategory("")}  text="All"/>
          <RadioButton.Body  checked={category === "Coffee"} onChange={(e) => setCategory(e.target.value)}  text="Coffee"/>
          <RadioButton.Body  checked={category === "Non-Coffee"} onChange={(e) => setCategory(e.target.value)}  text="Non-Coffee"/>
          <RadioButton.Body  checked={category === "Sandwiches"} onChange={(e) => setCategory(e.target.value)}  text="Sandwiches"/>
          <RadioButton.Body  checked={category === "Pastries"} onChange={(e) => setCategory(e.target.value)}  text="Pastries"/>
          <RadioButton.Body  checked={category === "Desserts"} onChange={(e) => setCategory(e.target.value)}  text="Desserts"/>
        </RadioButton>
      </div>
      </div>

      {/* CARD  PRODUCT */}
      <div className="w-[85%] m-auto flex justify-between max-md:w-full max-md:flex-wrap-reverse max-md:p-2 max-md:items-center">
        <div className="w-[50%] flex flex-wrap max-md:w-full h-auto mb-5 gap-1">
          {data.length === 0 && !isLoading && (
            <div className="text-center font-bold text-2xl">
              Produk tidak ditemukan
            </div>
          )}
          { !isLoading && data.map((item) => (
            <Card key={item.id}>
              <Card.Header image={item.image_url} />
              <Card.Body
                title={item.name}
                price={`$${item.price}`}
                description={item.description}
              />
              <Button
                onClick={() => handleAddToCart(item.id)}
                classname=" bg-slate-950 hover:bg-slate-500 text-white py-1 px-4 hover:scale-95 transition ease-in-out duration-200 hover:cursor-pointer rounded"
              >
                Pilih
              </Button>
            </Card>
          ))}
        </div>


        {/* CART PRODUK */}
        <div className="xl:fixed xl:top-40 xl:right-50 z-50 max-md:z-0 ">
          <CartProduct>
            <CartProduct.Header text="Action" />
            { cart.map((item) => {
              const product = cart.find((product) => product.id === item.id);
              return product ? (
                <CartProduct.Body
                  key={item.id}
                  title={product.name}
                  price={`$ ${product.price}`}
                >
                  <td className="p-3 ">
                    <Button
                      classname="bg-blue-600 hover:bg-blue-500 text-white w-[20px] hover:scale-95 transition ease-in-out duration-200 hover:cursor-pointer rounded m-2"
                      onClick={() => handleDecrement(item.id)}
                    >
                      -
                    </Button>
                    {item.quantity}
                    <Button
                      classname="bg-blue-600 hover:bg-blue-500 text-white w-[20px] hover:scale-95 transition ease-in-out duration-200 hover:cursor-pointer rounded m-2"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </Button>
                  </td>
                  <td>
                    <Button
                    classname="bg-red-600  hover:bg-red-500 text-white py-1 px-2 hover:scale-95 transition ease-in-out duration-200 hover:cursor-pointer rounded m-2"
                    onClick={() => setCart(cart.filter((cartItem) => cartItem.id !== item.id))}
                    >Hapus</Button>
                  </td>
                </CartProduct.Body>
              ) : null; 
            })}

          </CartProduct>
            <p className="text-right max-sm:m-0 m-3 font-bold">total: ${totalHarga}</p>
            <div className={`flex flex-col m-3 ${cart.length <= 0 ? "hidden" : ""} max-sm:text-sm`}>
              <label htmlFor="name">Nama :</label>
              <input
                type="text"
                placeholder="Nama Pemesan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`rounded-md p-2 w-60 max-md:w-full max-md:mb-5 focus:outline-none border-1 border-gray-300 bg-white ${name.length <= 1 ? "border-red-500" : ""} `}
                />
                {name.length <= 1 && <span className="text-red-500 text-sm">*Nama harus diisi</span>}
              <label htmlFor="meja">No.Meja :</label>
              <input
                type="number"
                placeholder="1/2/3/4..."
                value={meja}
                required
                onChange={(e) => setMeja(e.target.value)}
                className={`rounded-md p-2 w-60 max-md:w-full max-md:mb-5 focus:outline-none border-1 border-gray-300 bg-white ${meja.length === 0 ? "border-red-500" : ""} `}
                />
                {meja.length === 0 && <span className="text-red-500 text-sm">*Meja harus diisi</span>}
              </div>
            <Button 
              classname="w-[100px] bg-slate-950 hover:bg-slate-500 text-white max-sm:text-sm py-1 px-2 hover:scale-95 transition ease-in-out duration-200 hover:cursor-pointer rounded m-2"
              onClick={handleUploadCart}
            >
              Pesan
            </Button>
        </div>
        {/* END CART */}
      </div>
      {isLoading && (
        <div>
          <Loading />
          <Loading />
          <Loading />
          <Loading />

        </div>
      )}
    </>
  );
};

export default Products;
