import React,{useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'

export default function Signup() {

  const[cred,newcred]=useState({name:"",email:"",password:""})
  let navigate=useNavigate();

  const handlesubmit=async (e)=>
  {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name:cred.name,email:cred.email,password:cred.password})
        });
        newcred({name:"",email:"",password:""})
        const json=await response.json()
          if(json.authtoken)
          {
            //Save auth token and redirect
            localStorage.setItem('token',json.authtoken)
            navigate("/login")
          }
  }

  const handlechange=(e)=>
  {
      newcred({...cred,[e.target.name]:e.target.value})
  }

  return (
    <>
   <div className="vh-100" style={{"backgroundColor": "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{"borderRadius": "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4" onSubmit={handlesubmit}>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                
					  <input type="text" className="form-control" id='form3Example1c' name='name' autoComplete="on" aria-describedby="emailHelp" value={cred.name} onChange={handlechange} placeholder="Enter name"/>
                      
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                     
					  <input type="email" className="form-control" id='form3Example3c' name='email' autoComplete="on" aria-describedby="emailHelp" value={cred.email} onChange={handlechange} placeholder="Enter email"/>
                      
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                 
					  <input type="password" className="form-control" id='form3Example4c' name='password' autoComplete="on" value={cred.password} onChange={handlechange} placeholder="Password"/>
                      
                    </div>
                  </div>

            

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">SignUp</button>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <Link className='btn btn-primary' to="/login" > Login</Link>
                  </div>

                  

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}
