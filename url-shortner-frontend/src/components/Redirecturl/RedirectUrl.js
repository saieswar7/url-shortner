// RedirectComponent.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RedirectUrl() {
  const { code } = useParams();
  const [message,setMessage] = useState("Redirecting...")
  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/redirect_to_original_url?code=${code}`);
        const data = response.data
        if(data.originalUrl===null){
            setMessage("URL that you are trying to access is not present please convert again")
        }
        else if (data.originalUrl) {
          window.location.href = data.originalUrl;
        } else {
          console.error('URL not found');
        }
      } catch (error) {
        console.error('Error fetching original URL:', error);
      }
    };
    fetchOriginalUrl()
  }, [code]);

  return <p style={{textAlign:'center'}}>{message}</p>;
}

export default RedirectUrl;
