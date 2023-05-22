import axios from 'axios';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

export default function UpdatePassword() {


    const {t} = useTranslation();
    const [changePasswordBody, setChangePasswordBody] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });


      function getPasswordData(e) {
        let userData = { ...changePasswordBody };
        userData[e.target.name] = e.target.value;
        setChangePasswordBody(userData);
      }


      function emptyPasswordInputs()
      {
        setChangePasswordBody({oldPassword: "",newPassword: "",confirmPassword: ""})
      }

      async function changePasswordData(e) {
        e.preventDefault();
        try 
        {
            let { data } = await axios.put("http://localhost:5000/user/changePassword",changePasswordBody,{
            headers: {
              token: localStorage.getItem('userToken')
                },
            });
    
            if (data.message === "success") {
                document.getElementById('error1').classList.replace("d-block","d-none")
                document.getElementById('sent1').classList.replace("d-none","d-block")
                emptyPasswordInputs()
            }
        } 
        catch (error) 
        {
            console.log(error)
            document.getElementById('error1').classList.replace("d-none","d-block")
            document.getElementById('sent1').classList.replace("d-block","d-none")
        }
      }

  return (
    <>
    
    <div className='pt-md-0 pt-5'>
                <div className='w-100 mt-2 d-flex justify-content-center align-items-center'>
                    <form onSubmit={changePasswordData}  className='w-100  w-input px-5'>
                        <p className='fs-4 fw-bold'>{t("changePassword")}</p>
                        <hr className='w-input px-5 mx-auto mb-3' />
                        <input onChange={getPasswordData} value={changePasswordBody.oldPassword} type="password" className='form-control w-100 mx-auto my-3' name='oldPassword' placeholder={t("enterOldPassword")} />
                        <input onChange={getPasswordData} value={changePasswordBody.newPassword} type="password" className='form-control w-100 mx-auto my-3' name='newPassword' placeholder={t("enterNewPassword")} />
                        <input onChange={getPasswordData} value={changePasswordBody.confirmPassword} type="password" className='form-control w-100 mx-auto my-3' name='confirmPassword' placeholder={t("passwordConfirm")} />
                        <button className='text-center bg-main w-100 rounded-5 py-2 sign'>{t("changePassword")}</button>
                        <p id='error1' className='text-center text-danger d-none text-center pt-2'>{t("passFail")}</p>
                        <p id='sent1' className='text-center text-main d-none text-center pt-2'>{t("passSuccess")}</p>


                    </form>
                </div>
            </div>
    </>
  )
}
