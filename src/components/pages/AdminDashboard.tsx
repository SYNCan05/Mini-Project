import { useEffect, useState } from "react";
import Button from "../elements/Button";
import CartProduct from "./CartProduct";

interface pesan {
    id: number,
    name: string,
    price: number,
    quantity: number
}
export const AdminDashboard = () => {
    const [pesan, setPesan] = useState<pesan[]>([]);
    const [pesanan, setPesanan] = useState<pesan[]>([]);
    
    const name = localStorage.getItem("name");

    useEffect(() =>{
        const token = sessionStorage.getItem("token");
        if(token !== token){
            window.location.href = "/loginadmin";
        }
    })

    useEffect(() => {
        const interval = setInterval(() => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            setPesan(cart);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handlePesanan = () =>{
        const name = localStorage.getItem("name");
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        sessionStorage.setItem("cart-" + name , JSON.stringify(cart));
    }


    const handleLogout = () => {
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("password");
        window.location.href = "/loginadmin";
    }

    const getAllSessionStorageData = () => {
        return Object.keys(sessionStorage).map((key) => ({
          key,
          value: sessionStorage.getItem(key),
        }));
      };
      
      

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold">Selamat Datang, </h1>
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold">Berikut adalah pesanan dari {name}</h2>
                    <div className="overflow-y-auto max-h-[400px]">
                        <ul className="list-disc pl-5">
                            <CartProduct 
                             classname="w-[400px] table-auto border-collapse border shadow-md rounded-lg"
                            >
                                <CartProduct.Header
                                    text=""
                                />
                                {pesan.map((pesan) => (
                            
                                        <CartProduct.Body 
                                            title={pesan.name} 
                                            price={pesan.price} 
                                            quantity={pesan.quantity} 
                                            key={pesan.id} 
                                        >
                                            
                                        </CartProduct.Body>
                                    ))
                                }   
                            </CartProduct>
                                <Button
                                    classname=" bg-blue-600 hover:bg-blue-500 text-white py-2 px-3 hover:scale-95 transition ease-in-out duration-200 hover:cursor-pointer rounded m-3"
                                    onClick={() => handlePesanan()}
                                >
                                    upload pesanan
                                </Button>
                        </ul>
                    </div>
                </div>
                {/* <Loading/> */}
                <Button classname="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" children="Logout" onClick={handleLogout} />
            </div>
        </div>
    );
};