// import React from "react";

const Register = () => {
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
                      src="src\assets\login.jpg"
                      alt="login form"
                      className="img-fluid h-100"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-2 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-2 pb-1">
                          <i className="fas fa-cubes fa-2x me-2"></i>
                          
                        </div>

                        
                        <div  className="form-outline mb-2">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            id=""
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div  className="form-outline mb-2">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            id=""
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div  className="form-outline mb-2">
                          <label className="form-label">Email address</label>
                          <input
                            type="email"
                            id=""
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div className="form-outline mb-2">
                          <label className="form-label">Password</label>
                          <input
                            type="password"
                            id=""
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div  className="form-outline mb-2">
                          <label className="form-label">Confirm Password</label>
                          <input
                            type="password"
                            id=""
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div className="pt-1 mb-2 ">
                          <button
                           
                            className="btn btn-primary btn-lg btn-block text-right"
                            type="button"
                          >
                            Register
                          </button>
                        </div>

                        <p className="mb-2 pb-lg-2">
                           have an account?
                          <a href="#!">Login here</a>
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
