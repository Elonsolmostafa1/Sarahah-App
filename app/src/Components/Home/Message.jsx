import axios from 'axios';
import React from 'react'
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2'
import i18n from '../../i18n';

export default function Message(props) {
    const {t} = useTranslation();
    const {message,date,id,getUserMessages} = props
    const messageDate = new Date(date);
    const formattedDate = `${messageDate.toLocaleDateString()} ${messageDate.toLocaleTimeString()}`;

    async function deleteMessage() {
      
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success bg-main mx-3',
          cancelButton: 'btn btn-secondary mx-3'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: `${t("deleteTitle")}`,
        text: `${t("deleteText")}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `${t("confirmButtonText")}`,
        cancelButtonText: `${t("cancelButtonText")}`,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {


          (async()=>{
            let {data} = await axios.delete(`http://localhost:5000/message/${id}`, {
              headers: {
                token: localStorage.getItem('userToken')
              },
            });
            if(data.message==="success")
            {
              getUserMessages()
            }
          })()

          swalWithBootstrapButtons.fire(
            `${t("deleted")}`,
            `${t("messageDeleted")}`,
            `${t("success")}`
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            `${t("Cancelled")}`,
            `${t("messageSafe")}`,
            `${t("error")}`
          )
        }
      })



      
    }


  return (
    <div className='bg-white position-relative p-4 mb-4 my-2 border-main shadow-sm'>
      <p className='fs-5 fw-semibold'>{message}</p>
      <p className='text-secondary'>{formattedDate}</p>
      <i onClick={deleteMessage} className={i18n.language === 'en' ? 'fa-solid fa-xmark position-absolute end-0 top-0 p-3 mouse-pointer' : 'fa-solid fa-xmark position-absolute start-0 top-0 p-3 mouse-pointer'} ></i>
    </div>
  )
}
