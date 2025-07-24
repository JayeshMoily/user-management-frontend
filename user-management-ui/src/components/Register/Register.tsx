import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/apiService";
import { Link, Outlet } from 'react-router-dom';



const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const userRole = "nonadmin";
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

const handleRegister = async () => {
  console.log({ firstName, lastName, email, userRole, password });
    try {

      const res = await register({ firstName, lastName, email, userRole, password });
      console.log(res);
      if(res){
        // setFirstName('');
        // setLastName('');
        // setEmail('');
        // setFirstName('');
         navigate("/login");
      }
     
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#dedede" }}>
        <div className="container py-3">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="src\assets\register.jpg"
                      alt="login form"
                      className="img-fluid h-100"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-2 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-2 pb-1">
                        </div>
                        <div  className="form-outline mb-2">
                          <label className="form-label">First Name</label>
                          <input
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div  className="form-outline mb-2">
                          <label className="form-label">Last Name</label>
                          <input
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div  className="form-outline mb-2">
                          <label className="form-label">Email address</label>
                          <input
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div className="form-outline mb-2">
                          <label className="form-label">Password</label>
                          <input
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                            type="password"
                           
                            className="form-control form-control-lg"
                          />
                        </div>

                        {/* <div  className="form-outline mb-2">
                          <label className="form-label">Confirm Password</label>
                          <input
                            type="password"
                            
                            className="form-control form-control-lg"
                          />
                        </div> */}
                        <div className="pt-1 mb-2 ">
                          <button onClick={handleRegister} className="btn btn-primary btn-lg btn-block text-right"
                            type="button">
                            Register
                          </button>
                        </div>

                        <p className="mb-2 pb-lg-2">
                           have an account?
                            <Link className="nav-link text-primary" to="/">Login here</Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
