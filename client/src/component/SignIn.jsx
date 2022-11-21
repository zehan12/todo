import { useState } from "react"
import { BASE_URL } from "../utils/constant";

const SingIn = (  ) => {

    const [ email, setEmail ] = useState("");
    const [password, setPassword]  = useState("");

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        try {
            const res = await fetch(BASE_URL+"api/users/signin",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })               
            })
            const data = await res.json();
            const token = data.user.token;
       
           window.localStorage.setItem('user_token', JSON.stringify(data.user));

           ///   saldljl
           console.log(res,data,"result");
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <>
        <input onChange={(e)=>setEmail(e.target.value) } value={email}  /> <br/>
        <input onChange={(e)=>setPassword(e.target.value) } value={password} /> <br/>
        <button onClick={(e)=>handleSubmit(e)} type="submit">Sign In </button>
        </>
    )
}

export default SingIn;