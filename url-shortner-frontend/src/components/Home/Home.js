import React, { useState,useRef } from 'react'
import Header from '../Header/Header'
import './Home.css'
import axios from "axios";
import copy from "copy-to-clipboard";
import { BsArrowRight, BsCopy } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QRCode from "react-qr-code";
function Home() {

  const [longurl,setLongUrl] = useState('')
  const [code,setCode] = useState('')

  const textRef = useRef(null);

  const handleCopyClick = () => {
      copy(code)
  };
  function isValidURL(str) {
    if(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(str)) {
        return true;
      } else {
        return false;
      }
    }
  const ConvertShortUrl = async ()=>{
    try{

      if(isValidURL(longurl)){
        const response = await axios.post(`http://127.0.0.1:5000/short_the_url`,{
          long_url:longurl
         });
        console.log(response.data);
        setCode("http://127.0.0.1:3000/"+response.data.code)
      }else{
        toast.error("Invalid url")
      }
      
    }catch(e){
      console.error(e);
    }
    
  }
  
  return (
    <div>
        <Header/>
        <div className='input-con'>
          <div>
            <input placeholder='Paste your URL' value={longurl} onChange={(e)=>{setLongUrl(e.target.value)}}/>
            <BsArrowRight 
            onClick={ConvertShortUrl}
            className='convert-icon'/>
          </div>

        </div>
        {code!=="" && 
        <div className='input-con'>
        <div>
          <div className='code-text' ref={textRef} >{code}</div>
          <BsCopy onClick={()=>{
            handleCopyClick();
            toast.success("Copied")
          }} className='convert-icon'/>
        </div>

      </div>}

      {code!=="" && 
      <div className='qr-code-con'>
        <h4>Scan QR to get the URL</h4>
        <QRCode 
          value={code}
        />
      </div>
      }
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"

    />
    </div>
  )
}

export default Home