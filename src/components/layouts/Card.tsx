export default function Card(props:{children?: React.ReactNode}) {
    return (
        <div className="border border-gray-300 overflow-hidden flex justify-between  items-center my-2 gap-3  w-full rounded p-2">
            {props.children}
        </div>
    )
}

function Header(props: {image?: string, children?: React.ReactNode}){
    return(
        <div className="h-[200px] overflow-hidden flex justify-center relative rounded-2xl">
            {props.children}
            <img src={props.image} className="w-[300px] object-cover object-center" alt="" />
        </div>
    )
}

function Body (props: {title: any, price: any, description: any}){
    return(
        <div className="w-[300px] flex flex-col gap-2">
            <h2 className="text-2xl font-extrathin line-clamp-1 ">{props.title}</h2>
            <p className="">{props.price}</p>
            <p className="line-clamp-3">{props.description}</p>
        </div>
    )
}

Card.Header = Header
Card.Body = Body
