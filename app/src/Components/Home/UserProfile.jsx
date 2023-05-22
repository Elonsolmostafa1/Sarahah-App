import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import cover from '../../images/pic.jpg'
import { Link } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { UserContext } from '../../Context/UserContext';
import { useTranslation } from 'react-i18next';


    

export default function UserProfile() {


    const { t, i18n } = useTranslation();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [photo, setPhoto] = useState(null);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    let {getUserProfileData,profileData}=useContext(UserContext)

    const updateProfilePic = async (e) => {
        const formData = new FormData();
        formData.append('path', photo);
    
        try {
          const response = await axios.post('http://localhost:5000/user/profilePic', formData , {
              headers: {
                token: localStorage.getItem('userToken')
              },
            });
          if(response.data?.message === "success")
          {
            getUserProfileData();
          }
        } 
        catch (error) {
          console.log(error);
        }
      };


  

  useEffect(() => {
    getUserProfileData();
}, []);


  return (
    <>
    <Modal
        show={show1}
        onHide={handleClose1}
        animation={true}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("editProfilePic")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="py-3">
              
                <input
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="form-control w-100"
                  name="path"
                  placeholder=""
                  type="file"
                />
          
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            {t("Close")}
          </Button>
          <Button variant="success" className='text-white' onClick= {()=>{handleClose1();updateProfilePic();}}>
          {t("Save")}
          </Button>
        </Modal.Footer>
    </Modal>


    <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("share")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              
                <Link className='user-link' to={`/sent/${profileData?._id}`}>{"http://localhost:3000/sent/"+profileData?._id}</Link>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {t("Close")}
          </Button>
        </Modal.Footer>
    </Modal>
    <div className='px-3'>
                    <div className='bg-white shadow-sm pb-3 rounded-2 overflow-hidden'>
                        <div className='cover-height overflow-hidden'>
                            <img src={cover} className='w-100 ' alt="" />
                        </div>
                        <div className='translate-middle-y'>
                            <div onClick={handleShow1} className='bg-black img-thumbnail img-square rounded-circle overflow-hidden mx-auto mouse-pointer'>
                                <img className='w-100 mb-0 rounded-circle' src={`http://localhost:5000/${profileData.profilePic}`} alt="" />
                            </div>
                            <p className='text-center text-black pt-2 fs-6 fw-semibold'>{profileData?.name}</p>
                        </div>
                        <div>
                            <div className='text-center fw-semibold'><p onClick={handleShow} className='text-decoration-none text-main mouse-pointer'>{t("share")}</p></div>
                            <div className='text-center'>
                                <Link to="/update" className='text-decoration-none  text-main'>
                                <i className={i18n.language === 'en' ? 'fa-solid fa-gear me-2' : 'fa-solid fa-gear ms-2'} ></i>
                                <span>{t("setting")}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
    </>
  )
}
