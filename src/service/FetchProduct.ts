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
    const [error, setError] = useState<Error | null>(null);

        const fetchData = async () => {
          try {
            // setIsLoading(true);
            const response = await fetch("https://wpu-cafe.vercel.app/api/menu");
            const result = await response.json();
            setData(result.data);
          } catch (err) {
            setError(err as Error);
          } finally {
            // setIsLoading(false);
          }
        };
        return{
            fetchData,
            setData,
            data,
            error,
            // isLoading
        }
}