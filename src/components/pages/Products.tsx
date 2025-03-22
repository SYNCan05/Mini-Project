import { useEffect, useState } from "react";
// import { useDebounce } from "../Hooks/useDebounce";
import Card from "../layouts/Card";
import Button from "../elements/Button";
import { FetchProducts } from "../../service/FetchProduct";
import CartProduct from "./CartProduct";
import Form from "../layouts/Form";
import { SearchProduct } from "../../service/SearchProduct";
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
  const { data, setData } = FetchProducts();
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const {handleSearch, isLoading, error} = SearchProduct();
  

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
        const product = data.find((product) => product.id === item.id);
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
      if(name.length > 0){ 
        localStorage.setItem("name", name);
        localStorage.setItem("cart", JSON.stringify(dataCart));
      }else{
        alert("Masukan Nama Pemesan");}
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

  return (
    <>
    {/* NAVBAR */}
    <div className="flex items-center justify-between sticky top-0 bg-white z-10">
      <Form.Input
        text="text"
        placeholder="Search..."
        value={query}
        onchange={(e) => setQuery(e.target.value)}
        classname="rounded-md h-[30px] p-2 w-60 max-md:w-full max-md:mb-5 focus:outline-none border-1 border-gray-300 m-10"
        />
        <RadioButton>
          <RadioButton.Body  checked={category === ""} onChange={() => setCategory("")} classname="" text="All"/>
          <RadioButton.Body  checked={category === "Coffee"} onChange={(e) => setCategory(e.target.value)} classname="" text="Coffee"/>
          <RadioButton.Body  checked={category === "Non-Coffee"} onChange={(e) => setCategory(e.target.value)} classname="" text="Non-Coffee"/>
          <RadioButton.Body  checked={category === "Sandwiches"} onChange={(e) => setCategory(e.target.value)} classname="" text="Sandwiches"/>
          <RadioButton.Body  checked={category === "Pastries"} onChange={(e) => setCategory(e.target.value)} classname="" text="Pastries"/>
          <RadioButton.Body  checked={category === "Desserts"} onChange={(e) => setCategory(e.target.value)} classname="" text="Desserts"/>
        </RadioButton>
      </div>

      {isLoading && (
        <div className="w-full h-screen flex justify-center items-center font-bold text-2xl text-gray-500 absolute top-0 left-0 bg-white">
          <Loading />
        </div>
      )}


      {/* PRODUCT */}
      <div className="w-full flex justify-start">
        <div className="w-[70%] max-md:w-full h-auto mb-5 flex flex-wrap justify-center gap-5">
          {data.length === 0 && !isLoading && (
            <div className="text-center font-bold text-2xl">
              Produk tidak ditemukan
            </div>
          )}
          {data.map((item) => (
            <Card key={item.id}>
              <Card.Header image={item.image_url} />
              <Card.Body
                title={item.name}
                price={item.price}
                description={item.description}
              />
              <Button
                onClick={() => handleAddToCart(item.id)}
                classname="w-full bg-blue-600 hover:bg-blue-500 text-white py-1 px-2 hover:scale-95 transition ease-in-out duration-200 hover:cursor-pointer rounded"
              >
                Add to Cart
              </Button>
            </Card>
          ))}
        </div>


        {/* CART PRODUK */}
        <div className="xl:fixed max-md:h-[500px] right-20 p-3 rounded">
          <CartProduct>
            <CartProduct.Header text="Action" />
            {cart.map((item) => {
              const product = data.find((product) => product.id === item.id);
              return product ? (
                <CartProduct.Body
                  key={item.id}
                  title={product.name}
                  price={product.price}
                  quantity={item.quantity}
                >
                  <Button
                  classname="bg-red-600 hover:bg-red-500 text-white py-1 px-2 hover:scale-95 transition ease-in-out duration-200 hover:cursor-pointer rounded m-2"
                  onClick={() => setCart(cart.filter((cartItem) => cartItem.id !== item.id))}
                  >Hapus</Button>
                </CartProduct.Body>
              ) : null;
            })}
          </CartProduct>
            <div className={`flex flex-col m-3 ${cart.length <= 0 ? "hidden" : ""} `}>
              <input
                type="text"
                placeholder="Nama Pemesan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`rounded-md p-2 w-60 max-md:w-full max-md:mb-5 focus:outline-none border-1 border-gray-300 bg-white ${name.length <= 1 ? "border-red-500" : ""} `}
                /> 
                {name.length <=1 && (
                  <label className="text-red-700 font-serif ">
                  * nama harus diisi
                </label>
                )}
              </div>
            <Button 
              classname="w-[100px] bg-blue-600 hover:bg-blue-500 text-white py-1 px-2 hover:scale-95 transition ease-in-out duration-200 hover:cursor-pointer rounded m-2"
              onClick={handleUploadCart}
            >
              Pesan
            </Button>
        </div>
      </div>
    </>
  );
};

export default Products;
