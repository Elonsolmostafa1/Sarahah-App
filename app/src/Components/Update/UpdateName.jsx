import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../Context/UserContext';

export default function UpdateName() {

    const {t} = useTranslation();

    const [username,setUsername] = useState('')
    let {getUserProfileData}=useContext(UserContext)

    
    const updateUsername = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put('http://localhost:5000/user', {name:username} , {
              headers: {
                token: localStorage.getItem('userToken')
              },
            });
          if(response.data?.message === "success")
          {
            getUserProfileData();
            setUsername("")
            document.getElementById('error').classList.replace("d-block","d-none")
            document.getElementById('sent').classList.replace("d-none","d-block")
          }
        } 
        catch (error) {
          console.log(error);
          document.getElementById('error').classList.replace("d-none","d-block")
          document.getElementById('sent').classList.replace("d-block","d-none")
        }
      };

  return (
    <>
    
    <div className='pt-3'>
                <div className='w-100 mt-5 d-flex justify-content-center align-items-center'>
                    <form onSubmit={updateUsername}  className='w-100  w-input px-5'>
                        <p className='fs-4 fw-bold'>{t("personal")}</p>
                        <hr className='w-input px-5 mx-auto mb-3' />
                        <input onChange={(e)=>{setUsername(e.target.value)}} value={username}  type="text" className='form-control w-100 mx-auto my-3' name='name' placeholder={t("enterName")} />
                        <button className='text-center bg-main w-100 rounded-5 py-2 sign'>{t("changeName")}</button>
                        <p id='error' className='text-center text-danger d-none text-center pt-2'>{t("nameFail")}</p>
                        <p id='sent' className='text-center text-main d-none text-center pt-2'>{t("nameSuccess")}</p>

                    </form>
                </div>
            </div>
    </>

  )
}
