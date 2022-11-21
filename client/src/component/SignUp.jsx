import { useState } from "react";
import { BASE_URL } from "../utils/constant";
console.log(BASE_URL)

const SignUp = (  ) => {

    const  [email, setEmail] = useState("")
    const [ name, setName ] = useState("")
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email,name,password,bio)
        try {
            const res = await fetch(BASE_URL+"api/users/signup",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, bio })
            })
            const data = await res.json();
            /// sing  in
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="email" /><br/>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="name" /><br/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" placeholder="password" /><br/>
            <input onChange={(e)=>setBio(e.target.value)} value={bio} type="text" placeholder="bio" /><br/>
            <button onClick={handleSubmit}  type="submit">submit</button>
        </>
    )
}

export default SignUp;