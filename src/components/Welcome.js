import React, { useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'

const Welcome = () => {
    let navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('token'))
        {
           
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line 
    },[navigate])

    const handleclick=()=>
    {
      localStorage.removeItem('token');
      navigate('/login')
    }
    
  return (
    <div>
      Welcome
      {!localStorage.getItem('token')?<form className='d-flex'>
      <Link className="btn btn-primary mx-1"  to="/login">Login</Link>
      <Link className="btn btn-primary mx-1"  to="/signup">Signup</Link>
      </form >:<>
      <i className="fa-solid fa-user"  style={{color: "#1160e8",}} />
      <button className="btn btn-primary mx-4 " onClick={handleclick}>Signout</button>
      </>
    }
    </div>
    
  )
}

export default Welcome
