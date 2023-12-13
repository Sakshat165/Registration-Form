import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'

const Welcome = () => {
  const[name,setName]=useState("")

  const fetchuser=async ()=>{
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
      });
      const json=await response.json();
      setName(json.name)
      
      
    }
    

    let navigate=useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('token'))
        {
          navigate('/login')
           
        }
        fetchuser();
        
        // eslint-disable-next-line 
    },[navigate])

    const handleclick=()=>
    {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      navigate('/login')
    }
    
  return (
    <div>
      Welcome {name}
     <>
      <button className="btn btn-danger mx-4 " onClick={handleclick}>Signout</button>
      </>
    
    </div>
    
  )
}

export default Welcome
