import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
            console.log("Got the success response");

            if (res.jwtToken !== null) {
              if (res.user.role === "Admin") {
                sessionStorage.setItem(
                  "active-admin",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("admin-jwtToken", res.jwtToken);
              } else if (res.user.role === "Customer") {
                sessionStorage.setItem(
                  "active-customer",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("customer-jwtToken", res.jwtToken);
              }
            }

            if (res.jwtToken !== null) {
              toast.success(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                window.location.href = "/home";
              }, 1000); 
            } else {
              toast.error(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } else {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    e.preventDefault();
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "50px",
        height: "100vh",
        color: "black", 
      }}
    >
      <div
        className="d-flex aligns-items-center justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div
          className="form-card"
          style={{
            width: "25rem",
            backgroundColor: "rgba(0, 0, 0, 0.4)", 
            padding: "20px",
            borderRadius: "1em",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)", 
          }}
        >
          <div className="container-fluid">
            <div
              className="card-header d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "38px",
                backgroundColor: "rgba(0,0,0,0)",
                color: "white", 
              }}
            >
              <h4 className="card-title">User Login</h4>
            </div>
            <div className="card-body mt-3">
              <form className="text-color">
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    <b>User Role</b>
                  </label>
                  <select
                    onChange={handleUserInput}
                    className="form-control"
                    name="role"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      color: "white", 
                    }}
                  >
                    <option value="0" style={{ color: "black" }}>Select Role</option>
                    <option value="Admin" style={{ color: "black" }}>
                      Admin
                    </option>
                    <option value="Customer" style={{ color: "black" }}>
                      Customer
                    </option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="emailId" className="form-label">
                    <b>Email Id</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    value={loginRequest.emailId}
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      color: "white", 
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={loginRequest.password}
                    autoComplete="on"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      color: "white", 
                    }}
                  />
                </div>
                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn"
                    onClick={loginAction}
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      color: "black",
                      
                    }}
                  >
                    <b>Login</b>
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;




// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const UserLoginForm = () => {
//   let navigate = useNavigate();

//   const [loginRequest, setLoginRequest] = useState({
//     emailId: "",
//     password: "",
//     role: "",
//   });

//   const handleUserInput = (e) => {
//     setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
//   };

//   const loginAction = (e) => {
//     fetch("http://localhost:8080/api/user/login", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(loginRequest),
//     })
//       .then((result) => {
//         console.log("result", result);
//         result.json().then((res) => {
//           if (res.success) {
//             console.log("Got the success response");

//             if (res.jwtToken !== null) {
//               if (res.user.role === "Admin") {
//                 sessionStorage.setItem(
//                   "active-admin",
//                   JSON.stringify(res.user)
//                 );
//                 sessionStorage.setItem("admin-jwtToken", res.jwtToken);
//               } else if (res.user.role === "Customer") {
//                 sessionStorage.setItem(
//                   "active-customer",
//                   JSON.stringify(res.user)
//                 );
//                 sessionStorage.setItem("customer-jwtToken", res.jwtToken);
//               }
//             }

//             if (res.jwtToken !== null) {
//               toast.success(res.responseMessage, {
//                 position: "top-center",
//                 autoClose: 1000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//               });
//               setTimeout(() => {
//                 window.location.href = "/home";
//               }, 1000); // Redirect after 3 seconds
//             } else {
//               toast.error(res.responseMessage, {
//                 position: "top-center",
//                 autoClose: 1000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//               });
//             }
//           } else {
//             toast.error(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//           }
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("It seems server is down", {
//           position: "top-center",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       });
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <div className=" d-flex aligns-items-center justify-content-center" style={{marginTop:'100px'}}>
//         <div className="form-card" style={{ width: "25rem" }}>
//           <div className="container-fluid">
//             <div
//               className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
//               style={{
//                 borderRadius: "1em",
//                 height: "38px",
//               }}
//             >
//               <h4 className="card-title">User Login</h4>
//             </div>
//             <div className="card-body mt-3">
//               <form className="text-color">
//                 <div class="mb-3">
//                   <label for="role" class="form-label">
//                     <b>User Role</b>
//                   </label>
//                   <select
//                     onChange={handleUserInput}
//                     className="form-control"
//                     name="role"
//                   >
//                     <option value="0">Select Role</option>
//                     <option value="Admin"> Admin </option>
//                     <option value="Customer"> Customer </option>
//                   </select>
//                 </div>

//                 <div className="mb-3">
//                   <label for="emailId" class="form-label">
//                     <b>Email Id</b>
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="emailId"
//                     name="emailId"
//                     onChange={handleUserInput}
//                     value={loginRequest.emailId}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label for="password" className="form-label">
//                     <b>Password</b>
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     onChange={handleUserInput}
//                     value={loginRequest.password}
//                     autoComplete="on"
//                   />
//                 </div>
//                 <div className="d-flex aligns-items-center justify-content-center mb-2">
//                   <button
//                     type="submit"
//                     className="btn bg-color custom-bg-text"
//                     onClick={loginAction}
//                   >
//                     <b> Login</b>
//                   </button>
//                   <ToastContainer />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLoginForm;

