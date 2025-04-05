import { useState } from "react";
interface RadioButtonProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    classname?: string;
    text:any;
}

const RadioButton = (props:{children: React.ReactNode}) => {
  const [block, setBlock] = useState<boolean>(false);
    return (
    <div className="p-4 max-sm:p-0 max-sm:w-full">
      <div className="w-full md:hidden flex items-center justify-center cursor-pointer bg-slate-200" onClick={() => setBlock(!block)}>
        {block ? <img src="../src/assets/icons/arrowhead-up.png" alt="down" width={20} /> : <img src="../src/assets/icons/down.png" alt="up" width={20} />}
        
      </div>
      <div className={`flex w-full ${block ? "max-sm:flex-col" : "max-sm:hidden"} gap-7 max-sm:gap-2 max-sm:mt-2 items-center justify-between flex-wrap`}>
        {props.children}
      </div>
    </div>
  );
};


const Body = ({checked, onChange, classname="hidden peer", text}: RadioButtonProps) => {
    return(
        <label className="flex items-center gap-2 cursor-pointer ">
          <input
            type="radio"
            value={text}
            checked={checked}
            onChange={onChange}
            className={classname}
          />
          <div className="h-auto flex items-center justify-center peer-checked:text-white peer-checked:bg-slate-950 border border-gray-950 px-5 py-1 max-sm:w-[350px]">
            <span>{text}</span>
          </div>
        </label>
    )
}

RadioButton.Body = Body

export default RadioButton