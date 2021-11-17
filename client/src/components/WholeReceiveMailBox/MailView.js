import './MailView.css'
import { GoKebabVertical } from "react-icons/go";
import { FaTimes } from "react-icons/fa"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { modalmailview } from '../../actions'
import axios from 'axios';

export default function MailView({ maildata, mailChange }) {
  const dispatch = useDispatch();
  const [isLoding, setIsLoding] = useState(true);

  console.log(maildata)

  const modaloff = () => {
    dispatch(modalmailview({ modalmail: false }))
    mailChange(0)
  }

  const [isOpen, setIsOpen] = useState(false)

  function SubModalOnOff() {
    setIsOpen(!isOpen)
  }

  // useEffect(() => {
  //   maildata
  // },[])

  return (
    <>
      <div className="mailview-container">
        <div className="mailview-grid">
          <div className="mailview-title"> {maildata.title} </div>
          <div className="mailview-receive-name"> 보낸사람 : {maildata.name} </div>
          <div> 보낸날짜 : {maildata.created_at.slice(0, 10)} / 도착날짜 : {maildata.reserved_at.slice(0, 10)} </div>
          <div className="modal-flex" style={{ border: "none" }}>
            <div className="modal-sort" >
              <GoKebabVertical onClick={SubModalOnOff} />

            </div>
            {isOpen === true
              ? <MailViewModal maildata={maildata} SubModalOnOff={SubModalOnOff} />
              : ""
            }
            <div className="mail-text" > {maildata.content} </div>
          </div>
          <button className="btn_close_m" onClick={() => (modaloff())}> 닫기 </button>
        </div>
      </div>
    </>
  )
}



function MailViewModal({ SubModalOnOff, maildata }) {
  const { id, receiverEmail } = maildata

  const mailremove = async () => {
    await axios.patch(`${process.env.REACT_APP_SERVER_API}/mail/receive`, {
      data: { id, receiverEmail }
    })
      .then((res) => {
        console.log(res)
      })
      .then(window.location.replace("/mailbox"))

  }

  const mailanswer = async () => {
    await axios.patch(`${process.env.REACT_APP_SERVER_API}/mail/receive`, {
      data: { id, receiverEmail }
    })
      .then((res) => {
        console.log(res)
      })
      .then(window.location = ("/mailform"))
  }


  return (
    <>
      <div className="mailViewModal-contanier">
        <div className="modal-show">
          <div className="btn-Modalclose" >
            <FaTimes onClick={SubModalOnOff} />
          </div>
          <div><button className="btn_close_s" onClick={mailanswer}>답장</button></div>
          <div><button className="btn_close_s" onClick={mailremove}>삭제</button></div>
        </div>
      </div>
    </>
  )
}

