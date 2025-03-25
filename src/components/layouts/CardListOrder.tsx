 interface CardListProps{
    children?: React.ReactNode,
    classname?: string,
 }

export default function CardList ({children, classname="w-[300px] p-5 text-white bg-blue-500 rounded relative"}: CardListProps) {
    return(
        <div className={classname} >
            <div>
                {children}
            </div>
        </div>
    )
}

const Header = (props:{text:string}) => {
    return (
        <div>
            <h2 className="text-2xl font-extrathin line-clamp-1 ">{props.text}</h2>
        </div>
    )
}

const Body = (props:{title:string, children?: React.ReactNode}) => {
    return (
        <div className="justify-between flex mb-1 border-b-1">
            <p className="">{props.title}</p>
            {props.children}
        </div>
    )
}

CardList.Header = Header
CardList.Body = Body