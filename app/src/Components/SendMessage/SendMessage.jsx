import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SendMessage() {
  const { t } = useTranslation();
  let { id } = useParams();
  const [message, setMessage] = useState(null);
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  async function getUsereData() {
    try 
    {
      let { data } = await axios.get(`http://localhost:5000/user/${id}`);
      if (data.message === "success") setUserData(data.user);
    } 
    catch (error) 
    {
      navigate("/error");
    }
  }

  async function sendMessage(e) 
  {
    e.preventDefault();
    
    try 
    {
      let { data } = await axios.post("http://localhost:5000/message", {message, id});
      
      if (data.message === "success") {
        setMessage("");
        document.getElementById("error").classList.replace("d-block", "d-none");
        document.getElementById("sent").classList.replace("d-none", "d-block");
      }
    } catch (error) {
      document.getElementById("error").classList.replace("d-none", "d-block");
      document.getElementById("sent").classList.replace("d-block", "d-none");
    }
  }

  useEffect(() => {getUsereData();}, []);

  return (
    <>
      <div className="mt-5 px-4">
        <div className="w-input bg-white p-5 mx-auto rounded-2 shadow-sm">
          <div className="bg-black  img-thumbnail img-square rounded-circle overflow-hidden mx-auto">
            <img
              className="w-100 mb-0 rounded-circle"
              src={`http://localhost:5000/${userData?.profilePic}`}
              alt=""
            />
          </div>
          <p className="text-center text-black pt-2 fs-6 fw-semibold">
            {userData?.name}
          </p>
          <p className="text-center text-black pt-2 fs-6">
            {t("leaveMessage")}
          </p>
          <form onSubmit={sendMessage}>
            <textarea
              id="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="w-100 message-input mb-2"
              rows="6"
            ></textarea>
            <button className="bg-main w-100 rounded-5 py-2 sign">
              {t("send")}
            </button>
            <p id="error" className="text-danger d-none text-center pt-2">
              {t("messageFail")}
            </p>
            <p id="sent" className="text-main d-none text-center pt-2">
              {t("messageSuccess")}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
