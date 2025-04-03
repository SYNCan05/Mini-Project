interface RadioButtonProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    classname?: string;
    text:any;
}

const RadioButton = (props:{children: React.ReactNode}) => {
    return (
    <div className="p-4">
      <div className="flex w-full gap-7 justify-between flex-wrap">
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
          <div className="h-auto flex items-center justify-center peer-checked:text-white peer-checked:bg-slate-950 border border-gray-950 px-5 py-1">
            <span>{text}</span>
          </div>
        </label>
    )
}

RadioButton.Body = Body

export default RadioButton