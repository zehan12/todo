import { useState } from "react";
import { BASE_URL } from "../utils/constant";
console.log(BASE_URL)

const ResetPassword = (  ) => {

    const  [email, setEmail] = useState("")
    // const [ name, setName ] = useState("")
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(BASE_URL+"api/users/reset",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    // name, 
                    email, 
                    })
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
            {/* <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="name" /><br/> */}
            <button onClick={handleSubmit}  type="submit">submit</button>
        </>
    )
}

export default ResetPassword;