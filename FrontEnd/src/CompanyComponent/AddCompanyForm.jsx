import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddCompanyForm = () => {
  let navigate = useNavigate();

  const [addCompanyRequest, setAddCompanyRequest] = useState({});
  const [error, setError] = useState(""); // State for validation error

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    // Update input value
    setAddCompanyRequest({
      ...addCompanyRequest,
      [name]: value,
    });

    // Validate the first letter of the company name in real-time
    if (name === "name" && value && value[0] !== value[0].toUpperCase()) {
      setError("The first letter of the company name must be capitalized.");
    } else {
      setError(""); // Clear error if input is valid or empty
    }
  };

  const addCompany = (e) => {
    e.preventDefault();

    // Additional validation before submission
    if (addCompanyRequest.name && addCompanyRequest.name[0] !== addCompanyRequest.name[0].toUpperCase()) {
      setError("The first letter of the company name must be capitalized.");
      return;
    }

    fetch("http://localhost:8080/api/company/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addCompanyRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
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
              navigate("/home");
            }, 2000); // Redirect after 2 seconds
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
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="form-card"
        style={{
          width: "25rem",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
          padding: "20px",
          borderRadius: "1em",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="container-fluid">
          <div
            className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
            style={{
              borderRadius: "1em",
              height: "38px",
              color: "white",
            }}
          >
            <h4 className="card-title">Add Company</h4>
          </div>
          <div className="card-body mt-3">
            <form className="text-color">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleUserInput}
                  value={addCompanyRequest.name || ""}
                />
                {error && (
                  <div className="text-danger mt-2">{error}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Description</b>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={handleUserInput}
                  value={addCompanyRequest.description || ""}
                />
              </div>
              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  className="btn"
                  style={{
                    backgroundColor: "#28a745", // Success green color
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    fontSize: "16px",
                  }}
                  onClick={addCompany}
                >
                  <b>Add Company</b>
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyForm;



// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const AddCompanyForm = () => {
//   let navigate = useNavigate();

//   const [addCompanyRequest, setAddCompanyRequest] = useState({});
//   const [error, setError] = useState(""); // State for validation error

//   const handleUserInput = (e) => {
//     const { name, value } = e.target;

//     // Update input value
//     setAddCompanyRequest({
//       ...addCompanyRequest,
//       [name]: value,
//     });

//     // Validate the first letter of the company name in real-time
//     if (name === "name" && value && value[0] !== value[0].toUpperCase()) {
//       setError("The first letter of the company name must be capitalized.");
//     } else {
//       setError(""); // Clear error if input is valid or empty
//     }
//   };

//   const addCompany = (e) => {
//     e.preventDefault();

//     // Additional validation before submission
//     if (addCompanyRequest.name && addCompanyRequest.name[0] !== addCompanyRequest.name[0].toUpperCase()) {
//       setError("The first letter of the company name must be capitalized.");
//       return;
//     }

//     fetch("http://localhost:8080/api/company/add", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(addCompanyRequest),
//     })
//       .then((result) => {
//         console.log("result", result);
//         result.json().then((res) => {
//           if (res.success) {
//             toast.success(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });

//             setTimeout(() => {
//               navigate("/home");
//             }, 2000); // Redirect after 2 seconds
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
//   };

//   return (
//     <div>
//       <div className="mt-2 d-flex aligns-items-center justify-content-center">
//         <div className="form-card" style={{ width: "25rem" }}>
//           <div className="container-fluid">
//             <div
//               className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
//               style={{
//                 borderRadius: "1em",
//                 height: "38px",
//               }}
//             >
//               <h4 className="card-title">Add Company</h4>
//             </div>
//             <div className="card-body mt-3">
//               <form className="text-color">
//                 <div className="mb-3">
//                   <label htmlFor="name" className="form-label">
//                     <b>Name</b>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     name="name"
//                     onChange={handleUserInput}
//                     value={addCompanyRequest.name || ""}
//                   />
//                   {error && (
//                     <div className="text-danger mt-2">{error}</div>
//                   )}
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="description" className="form-label">
//                     <b>Description</b>
//                   </label>
//                   <textarea
//                     className="form-control"
//                     id="description"
//                     name="description"
//                     onChange={handleUserInput}
//                     value={addCompanyRequest.description || ""}
//                   />
//                 </div>
//                 <div className="d-flex aligns-items-center justify-content-center mb-2">
//                   <button
//                     type="submit"
//                     className="btn"
//                     style={{
//                       backgroundColor: "#28a745", // Success green color
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "5px",
//                       padding: "10px 20px",
//                       fontSize: "16px",
//                     }}
//                     onClick={addCompany}
//                   >
//                     <b>Add Company</b>
//                   </button>
//                 </div>
//               </form>
//               <ToastContainer />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCompanyForm;
