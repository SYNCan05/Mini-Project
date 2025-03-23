interface RadioButtonProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    classname?: string;
    text:any;
}

const RadioButton = (props:{children: React.ReactNode}) => {
    return (
    <div className="p-4">
      <div className="flex w-full space-x-7 justify-between">
        {props.children}
      </div>
    </div>
  );
};


const Body = ({checked, onChange, classname="hidden peer", text}: RadioButtonProps) => {
    return(
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value={text}
            checked={checked}
            onChange={onChange}
            className={classname}
          />
          <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500">
            <div className="w-3 h-3 bg-blue-500 rounded-full peer-checked:block hidden"></div>
          </div>
          <span className="text-gray-700 peer-checked:text-blue-500">{text}</span>
        </label>
    )
}

RadioButton.Body = Body

export default RadioButton