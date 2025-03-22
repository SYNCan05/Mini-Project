
export const AuthLogin = () => {
    const postDataLogin = async (email: string, password: string) => {
        try{
            const response = await fetch('https://wpu-cafe.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    };
    return { postDataLogin };
}