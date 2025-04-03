import Card from "./Card"
import Button from "../elements/Button"
export default function Loading (){
    return(
        <div className=" w-[85%] max-md:w-full m-auto ">
            <div className="w-[50%] flex flex-wrap max-md:w-full max-md:p-2 h-auto animate-pulse gap-1">
            <Card >
              <Card.Header>
                <div className="w-full z-30 absolute h-[200px] bg-slate-300 " />
              </Card.Header>
              <Card.Body
                title={<div className="w-[40%] h-10 bg-slate-300 rounded"></div>}
                price={<div className="w-[10%] h-5 bg-slate-300 rounded"></div>}
                description={<div className="w-full h-5 bg-slate-300 rounded"></div>}
              />
              <Button
                onClick={() => {}}
                classname="bg-slate-300 w-15 h-7 rounded"
              >
                <p></p>
              </Button>
            </Card>
          
        </div>
      </div>
    )
}