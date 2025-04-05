import { useState } from "react";
interface Product {
    id: number;
    title: string;
    price: string | number;
    description: string;
    image_url: string;
    name: string;
  }
export const  FetchProduct = () => {  
    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const handleSearch = async (searchTerm: string, catTerm: string) => {

        try{
            setIsLoading(true);
            const response = await fetch(`https://wpu-cafe.vercel.app/api/menu?pageSize=50&search=${searchTerm}&category=${catTerm}`);
            const result = await response.json();
            return result.data;    
        }catch(err){
            setError(err as Error);
        }finally{
            setIsLoading(false);
        }
    }
    return { handleSearch, isLoading, error, data, setData };

}