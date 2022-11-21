import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constant";

const Profile = () => {
  

    const [pro, setPro]= useState(null);

    const getProfile  = async( ) => {
        const user = localStorage["user_token"];
        const {
            token
        } = JSON.parse(user);

        const res = await fetch(BASE_URL + "api/users/", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })

        const data = await res.json(res);

        setPro(data.users);
    }
  
    useEffect(()=>{
        getProfile();
    },)


    if ( pro ) {
        return (
            <>
                <h1>{setPro.name}</h1>
                <p>{setPro.email}</p>
            </>
        )
    } else {
        return null
    }

}

export default Profile;