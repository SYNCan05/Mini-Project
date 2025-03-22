export default function Card({children}: any) {
    return (
        <div className="bg-slate-200 h-[400px] flex flex-col justify-between w-[300px] rounded p-2">
            {children}
            
        </div>
    )
}

function Header(props: {image: string}){
    return(
        <div className="h-[600px] overflow-hidden flex justify-center">
            <img src={props.image} className="w-[300px] object-cover object-center" alt="" />
        </div>
    )
}

function Body (props: {title: string, price: string | number, description: string}){
    return(
        <div className="h-full pt-3 pb-3">
            <h2 className="text-2xl font-extrathin line-clamp-1 ">{props.title}</h2>
            <p className="">{props.price}</p>
            <p className="line-clamp-3">{props.description}</p>
        </div>
    )
}

Card.Header = Header
Card.Body = Body
