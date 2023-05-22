import axios from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useState } from "react";

export let UserContext = createContext('')

export default function UserContextProvider(props)
{
    
    const[userData,setUserData] = useState(null);
    const [profileData, setProfileData] = useState([]);
    
    function decodeUserToken(){
        let encodedToken = localStorage.getItem('userToken');
        let decodedToken = jwtDecode(encodedToken);
        setUserData(decodedToken); 
      }

    async function getUserProfileData() {
      let {data} = await axios.get('http://localhost:5000/user', {
        headers: {
          token: localStorage.getItem('userToken')
        },
      });
      setProfileData(data.user);
    }


    return <UserContext.Provider value={{userData,setUserData,decodeUserToken,getUserProfileData,setProfileData,profileData}}>{props.children}</UserContext.Provider>
}