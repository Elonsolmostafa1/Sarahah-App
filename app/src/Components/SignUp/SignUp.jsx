import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
  const {t} = useTranslation();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
      });
    
      const [errList, setErrList] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("sucess");
    
    
      let navigate = useNavigate();
    
      function getUserData(e) {
        let userData = { ...user };
        userData[e.target.name] = e.target.value;
        setUser(userData);
      }
    
      async function sendRegisterDataToAPI() {
            
        setLoading(true);
        let { data } = await axios.post("http://localhost:5000/user/signup",user);
        setLoading(false);
    
        if (data.message === "success") {
          setError("sucess");
          navigate("/login");
        } else {
          setError(data.message);
        }
      }
    
      function validateRegisterationData() {
         const signUpSchema = Joi.object({
                  name:Joi.string().min(3).max(20).required(),
                  email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                  password:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
          })
        return signUpSchema.validate(user, { abortEarly: false });
      }
    
      function submitRegisterationForm(e) {
        e.preventDefault();
        let validation = validateRegisterationData();
        if (validation.error) {
          setLoading(false);
          setErrList(validation.error.details);
        } else {
          sendRegisterDataToAPI();
          console.log(user);
        }
      }
    



  return (
    <>
    
    <div >
        <div className='w-100 mt-5 d-flex justify-content-center align-items-center'>
            <form onSubmit={submitRegisterationForm} className='w-100 w-input px-5'>
                <p className='fs-4 fw-bold'>{t("Register")}</p>
                <hr className='w-input  mx-auto mb-5' />
                <input onChange={getUserData} type="text" className='form-control w-100 mx-auto my-3' name='name' placeholder={t("name")} />
                <input onChange={getUserData} type="email" className='form-control w-100 mx-auto my-3' name='email' placeholder={t("email")} />
                <input onChange={getUserData} type="password" className='form-control w-100 mx-auto my-3' name='password' placeholder={t("password")}/>
                <button onChange={getUserData} className='bg-main w-100 rounded-5 py-2 sign'>{t("SignUp")}</button>
                
                <p className='py-2 text-secondary text-center'>{t("Alreadyhaveanaccount?")} <Link className='text-decoration-none text-main' to="/login">{t("Loginnow")}</Link ></p>
            </form>
        </div>
    </div>
    {loading ? <Loading/> : null}
    </>

  )
}
