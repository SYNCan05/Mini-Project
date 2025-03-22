import { ReactNode } from "react";

interface Buttonprops{
    classname: string;
    children: ReactNode;
    onClick: () => void;
    type?: "button" | "submit";
}


const Button = ({classname="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded", children, onClick, type}: Buttonprops) => {
    return (
        <button className={classname} type={type}  onClick={onClick}>{children}</button>
    )
}

export default Button