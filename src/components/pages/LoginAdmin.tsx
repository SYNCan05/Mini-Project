import Button from "../elements/Button";
import { useState } from "react";
import { AuthLogin } from "../../service/AuthLogin";
export default function LoginAdmin() {
    const { postDataLogin} = AuthLogin();
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    
    const handleLogin = (e: any): void => {
        e.preventDefault();
        const username = user.username;
        const password = user.password;
        if (username === "" || password === "") {
            alert("masukan email dan password");
            return;
        }else{
            postDataLogin(username, password)
            .then((res) => {
                console.log(res);
                sessionStorage.setItem("token", res.token);
                sessionStorage.setItem("email", res.user.email);
                window.location.href = "/admindashboard";
            })
            .catch((err) => {
                console.log(err.message);
                alert("masukan email atau password dengan benar");
            })
        }

        
    }
    return (
        <div className="w-full h-screen flex justify-center items-center z-50 absolute top-0 left-0 bg-white">
            <form onSubmit={(e) => {handleLogin(e)}} className="w-96 px-10 py-10 bg-white shadow-xl shadow-gray-400 rounded">
                <h2 className="text-2xl font-bold mb-5">Login</h2>
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2">Email</label>
                    <input type="text" placeholder="jhondoe@email.com" name="username" id="username" autoComplete="off" onChange={(e) => setUser({...user, username: e.target.value})} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2">Password</label>
                    <input type="password" name="password" placeholder="********" onChange={(e) => setUser({...user, password: e.target.value})} id="password" className="w-full px-3 py-2 border rounded" />
                </div>
                <Button onClick={() => {handleLogin}} classname="w-full hover:cursor-pointer bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">Login</Button>
            </form>
        </div>
    );
}