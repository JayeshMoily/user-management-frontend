import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/apiService";
import { Link, } from 'react-router-dom';
import { useAuth } from "../../auth/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      console.log(res);
      auth.login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: '#dedede' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" >
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="src\assets\login.jpeg"
                      alt="login form"
                      className="img-fluid h-100"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">

                      <form>

                        <div className="d-flex align-items-center mb-3 pb-1">
                          {/* <i className="fas fa-cubes fa-2x me-3"></i> */}
                          {/* <span className="h1 fw-bold mb-0">Logo</span> */}
                        </div>

                        <h5 className="fw-normal mb-3 pb-3">Login into your account</h5>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label className="form-label">Email address</label>
                          <input
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <label className="form-label">Password</label>
                          <input
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div className="pt-1 mb-4">
                          <button data-mdb-button-init  className="btn btn-primary btn-lg btn-block" type="button" onClick={handleLogin}>Login</button>
                        </div>
                        <p className="mb-5 pb-lg-2" >Don't have an account?
                          <Link className="nav-link text-primary" to="/register">Register here</Link>
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
}

export default Login;