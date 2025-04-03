import { useState } from "react";
interface Product {
  id: number;
  title: string;
  price: string | number;
  description: string;
  image_url: string;
  name: string;
}
export const FetchProducts = () => {
    const [data, setData] = useState<Product[]>([]);
        return{
            setData,
            data,
        }
}