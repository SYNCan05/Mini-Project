import { useEffect, useState } from "react";
import Button from "../elements/Button";
import CartProduct from "../layouts/CartProduct";
import CardList from "../layouts/CardListOrder";

interface pesan {
    id: number,
    name: string,
    price: number,
    quantity: number
}
export const AdminDashboard = () => {
    const [pesan, setPesan] = useState<pesan[]>([]);
    const [pesanan, setPesanan] = useState<{ key: string; values: any }[]>([]);
    const email = sessionStorage.getItem("email");
    const name = localStorage.getItem("name");

    useEffect(() =>{
        const token = sessionStorage.getItem("token");
        if(!token || token === "undefined"){
            window.location.href = "/auth/login";
        }
    })

    useEffect(() => {
        const interval = setInterval(() => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            setPesan(cart);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    
    
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        window.location.href = "/auth/login";
    }
    
    
    useEffect(() => {
    const showUi = () => {
    
        const storedKeys = Object.keys(sessionStorage);
        const parsedData = storedKeys.map((key) => {
            try {
                const value = sessionStorage.getItem(key);
                const parsedValue = value ? JSON.parse(value) : null;
                
    if (Array.isArray(parsedValue)) {
        return { key, values: parsedValue };
    } else {
        return null; 
    }
    } catch (error) {
        // console.error(`Error parsing sessionStorage key: ${key}`, error);
        return null;
    }
    }).filter(Boolean) as { key: string; values: string[] }[];

    setPesanan(parsedData);      
    }
    showUi();
    }, []);
const handlePesanan = () =>{
    const name = localStorage.getItem("name");
    const meja = localStorage.getItem("meja");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length > 0) {
        localStorage.removeItem("cart");
        localStorage.removeItem("name");
        localStorage.removeItem("meja");
        sessionStorage.setItem("cart-" + name + "-" + meja , JSON.stringify(cart));
        window.location.reload();
    } else{
         alert("tidak ada pesanan")
    }    
}

const handleDelete = (key: string) => {
    sessionStorage.removeItem(key);
    window.location.reload();
}

    return (
        <div className="w-full flex flex-col gap-20 justify-center font-thin items-center relative py-5">
            <div className="absolute top-5 right-5">
                <Button classname="bg-red-500 hover:bg-red-700 cursor-pointer hover:scale-95 transition ease-in-out duration-200 text-white font-bold py-1 px-4 rounded" children="Logout" onClick={handleLogout} />
            </div>
                <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-black ">Selamat Datang, {email}</h1>
                {pesan.length > 0 ? (
                    <>
                    <h2 className="text-xl ">Berikut adalah pesanan dari <span className="text-blue-700 font-black">{name}</span></h2>
                    <h3 className="text-xl">meja No.<span className="text-blue-700 font-black">{localStorage.getItem("meja")}</span></h3>
                    <div className="overflow-y-auto max-h-[400px]">
                        <div className="">
                            <CartProduct 
                             classname="w-[400px] table-auto border-collapse border shadow-md rounded-lg"
                             >
                                <CartProduct.Header
                                    text=""
                                    />
                                {pesan.map((pesan) => (
                                    
                                    <CartProduct.Body 
                                    title={pesan.name} 
                                    price={`$ ${pesan.price}`} 
                                    key={pesan.id} 
                                    >
                                            <td className="p-3 text-center">
                                                {pesan.quantity}
                                            </td>
                                        </CartProduct.Body>
                                    ))
                                }   
                                
                            </CartProduct>
                            <h1 className="text-xl font-bold">Total : $ {pesan.reduce((total, pesan) => total + pesan.price * pesan.quantity, 0)}</h1>
                        </div>
                    </div>
                    </>
                    
                ) :  (
                    <h2 className="text-xl font-bold text-red-600">Belum ada pesanan</h2>
                )}
                        <Button
                    classname=" bg-blue-600 hover:bg-blue-500 text-white py-2 hover:scale-95 transition ease-in-out duration-200 hover:cursor-pointer rounded m-3 w-[200px]"
                    onClick={() => handlePesanan()}
                >
                    upload pesanan
                </Button>
                    
                </div>
            <div className="w-full">
                <h1 className="text-3xl mb-2 text-center font-bold">PESANAN</h1>
                <div className=" w-[70%] flex flex-wrap justify-start m-auto gap-3 p-3 ">
                        {pesanan.map((pesan) => (
                            <CardList key={pesan.key}>
                            <Button classname="absolute top-1 right-1 bg-red-500 hover:bg-red-700 text-white px-1  hover:cursor-pointer text-sm" onClick={() => handleDelete(pesan.key)}>X</Button>
                                <CardList.Header key={pesan.key} text={pesan.key} />
                                {pesan.values.map((value: any) => (
                                    <CardList.Body 
                                    key={value.id}
                                    title={value.name} 
                                    >
                                        <p>{value.quantity}</p>
                                    </CardList.Body>
                                ))}
                            </CardList>
                        ))}    
                </div>
            </div>
                
            </div>
    );
};
