import { ReactNode } from "react"
import Button from "../elements/Button"

interface Props {
    children?: ReactNode,
    classname?: string
}
// import { SetCart } from "../../service/SetCart"
export default function CartProduct({children, classname="w-[400px] table-auto border-collapse border shadow-md rounded-lg"}: Props) {
    return (
        <div className="relative">
            <table className={`${classname}`}>
                {children}   
            </table>
        </div>
    )
}

const Header = (props:{text:string}) => {
    return (
        <thead className="bg-blue-500 text-white ">
            <tr>
                <th className="p-3 text-left">Produk</th>
                <th className="p-3 text-left">Harga</th>
                <th className="p-3 text-left">Kuantitas</th>
                <th className="p-3 text-left">{props.text}</th>
            </tr>
        </thead>
    )
}

const Body = (props:{title:string, price:string | number, quantity:number, key:number | string, children?: ReactNode, kurang: () => void, tambah: () => void}) => {
    return (
        <tbody>
            <tr className="bg-gray-200 border-b">
                <td className="p-3">{props.title}</td>
                <td className="p-3">{props.price}</td>
                <td className="p-3 flex justify-evenly ">
                    <Button classname="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold w-[20px] rounded" type="button" onClick={props.kurang}>-</Button>
                    {props.quantity}
                    <Button classname="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold w-[20px] rounded" type="button" onClick={props.tambah}>+</Button>
                </td>
                <td>{props.children}</td>
            </tr>
        </tbody>
    )
}

CartProduct.Header = Header
CartProduct.Body = Body

