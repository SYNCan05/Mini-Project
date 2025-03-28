import { ReactNode } from "react"
// import Button from "../elements/Button"

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
        <thead className="bg-slate-950 text-white ">
            <tr>
                <th className="p-3 text-left">Produk</th>
                <th className="p-3 text-left">Harga</th>
                <th className="p-3 text-left">Kuantitas</th>
                <th className="p-3 text-left">{props.text}</th>
            </tr>
        </thead>
    )
}

const Body = (props:{title:string, price:string | number, key:number | string, children?: ReactNode}) => {
    return (
        <tbody>
            <tr className="border-b">
                <td className="p-3">{props.title}</td>
                <td className="p-3">{props.price}</td>
                {props.children}
            </tr>
        </tbody>
    )
}

CartProduct.Header = Header
CartProduct.Body = Body

