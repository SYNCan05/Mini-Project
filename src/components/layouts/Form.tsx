interface InputProps {
    classname: string;
    placeholder: string;
    text: string;
    value: any;
    onchange: (e: any) => void;
}
interface FormProps extends React.FormEvent<HTMLFormElement> {
    children: React.ReactNode,
    onsubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
export default function Form ({children, onsubmit}: FormProps ) {
    return (
        <form className="flex flex-col items-center" onSubmit={onsubmit}>{children}</form>
    )
}

const Input = ({classname, placeholder, text, value, onchange}: InputProps) => {
    return (
        <input 
        onSubmit={(e) => {e.preventDefault()}}
        className={classname} 
        type={text} 
        placeholder={placeholder}
        value={value}
        onChange={onchange}
        />
    )
}

Form.Input = Input