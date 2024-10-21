import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ViewVariants = () => {
  const [variants, setVariants] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  const retrieveAllVariant = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/variant/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllVariant = async () => {
      const res = await retrieveAllVariant();
      if (res) {
        setVariants(res.variants);
      }
    };
    getAllVariant();
  }, []);

  const deleteVariant = (variantId) => {
    fetch("http://localhost:8080/api/variant/delete?variantId=" + variantId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + admin_jwtToken,
      },
    })
      .then((result) => {
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
              window.location.reload(true);
            }, 1000); // Redirect after 1 second
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
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 1 second
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
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 1 second
      });
  };

  const updateVariant = (variant) => {
    navigate("/admin/variant/update", { state: variant });
  };

  const viewVehicles = (variant) => {
    navigate("/admin/vehicle/details", { state: variant });
  };

  return (
    <div
      style={{
        backgroundColor: "#000000", // Black background for the entire page
        minHeight: "100vh",
        padding: "1em",
      }}
    >
      <div
        className="card form-card ms-2 me-2 mb-5"
        style={{
          height: "45rem",
          backgroundImage: "url('https://images.unsplash.com/photo-1530675706010-bc677ce30ab6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "1em",
          color: "#ffffff", // Ensure text is readable
          opacity: "0.8", // Slightly transparent card
        }}
      >
        <div
          className="card-header"
          style={{
            borderRadius: "1em 1em 0 0",
            height: "50px",
            backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent background for header
            color: "Black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>All Variants</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
            backgroundColor: "rgba(0, 0, 0, 0)", // Semi-transparent background for body
            borderRadius: "0 0 1em 1em",
            padding: "1em",
          }}
        >
          <div className="table-responsive">
            <table
              className="table text-center"
              style={{
                backgroundColor: "rgba(255, 0, 0, 0.8)", // Slightly transparent table background
                color: "#333", // Dark text color for readability
              }}
            >
              <thead
                className="table-bordered"
                style={{
                  backgroundColor: "#333", 
                  color: "#fff",
                }}
              >
                <tr>
                  <th scope="col">Variant</th>
                  <th scope="col">Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Description</th>
                  <th scope="col">Fuel Type</th>
                  <th scope="col">Seat Capacity</th>
                  <th scope="col">Model</th>
                  <th scope="col">Year</th>
                  <th scope="col">Is AC</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((variant) => {
                  return (
                    <tr key={variant.id}>
                      <td>
                        <img
                          src={"http://localhost:8080/api/variant/" + variant.image}
                          alt="car_pic"
                          style={{
                            maxWidth: "90px",
                            borderRadius: "0.5em", 
                          }}
                        />
                      </td>
                      <td>
                        <b>{variant.name}</b>
                      </td>
                      <td>
                        <b>{variant.company.name}</b>
                      </td>
                      <td>
                        <b>{variant.description}</b>
                      </td>
                      <td>
                        <b>{variant.fuelType}</b>
                      </td>
                      <td>
                        <b>{variant.seatingCapacity}</b>
                      </td>
                      <td>
                        <b>{variant.modelNumber}</b>
                      </td>
                      <td>
                        <b>{variant.year}</b>
                      </td>
                      <td>
                        <b>{variant.ac === true ? "Yes" : "No"}</b>
                      </td>
                      <td>
                        <b>{variant.pricePerDay}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => updateVariant(variant)}
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#333",
                            color: "#fff",
                            borderRadius: "0.5em",
                            marginRight: "5px",
                            transition: "background-color 0.3s ease",
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#444"}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#333"}
                        >
                          <b>Update</b>
                        </button>
                        <button
                          onClick={() => deleteVariant(variant.id)}
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#d9534f",
                            color: "#fff",
                            borderRadius: "0.5em",
                            marginRight: "5px",
                            transition: "background-color 0.3s ease",
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#c9302c"}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#d9534f"}
                        >
                          <b>Delete</b>
                        </button>
                        <button
                          onClick={() => viewVehicles(variant)}
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#5bc0de",
                            color: "#fff",
                            borderRadius: "0.5em",
                            transition: "background-color 0.3s ease",
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#31b0d5"}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#5bc0de"}
                        >
                          <b>View Vehicles</b>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewVariants;




// import { useState, useEffect } from "react";
// import axios from "axios";
// import React from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const ViewVariants = () => {
//   const [variants, setVariants] = useState([]);
//   const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

//   let navigate = useNavigate();

//   const retrieveAllVariant = async () => {
//     const response = await axios.get(
//       "http://localhost:8080/api/variant/fetch/all"
//     );
//     return response.data;
//   };

//   useEffect(() => {
//     const getAllVariant = async () => {
//       const res = await retrieveAllVariant();
//       if (res) {
//         setVariants(res.variants);
//       }
//     };
//     getAllVariant();
//   }, []);

//   const deleteVariant = (variantId) => {
//     fetch("http://localhost:8080/api/variant/delete?variantId=" + variantId, {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         // Authorization: "Bearer " + admin_jwtToken,
//       },
//     })
//       .then((result) => {
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
//               window.location.reload(true);
//             }, 1000); // Redirect after 1 second
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
//             setTimeout(() => {
//               window.location.reload(true);
//             }, 1000); // Redirect after 1 second
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
//         setTimeout(() => {
//           window.location.reload(true);
//         }, 1000); // Redirect after 1 second
//       });
//   };

//   const updateVariant = (variant) => {
//     navigate("/admin/variant/update", { state: variant });
//   };

//   const viewVehicles = (variant) => {
//     navigate("/admin/vehicle/details", { state: variant });
//   };

//   return (
//     <div className="mt-3">
//       <div
//         className="card form-card ms-2 me-2 mb-5"
//         style={{
//           height: "45rem",
//           backgroundImage: "url('https://images.unsplash.com/photo-1530675706010-bc677ce30ab6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           borderRadius: "1em",
//           color: "#ffffff", // Ensure text is readable
//         }}
//       >
//         <div
//           className="card-header"
//           style={{
//             borderRadius: "1em 1em 0 0",
//             height: "50px",
//             backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background for header
//             color: "#ffffff",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <h2>All Variants</h2>
//         </div>
//         <div
//           className="card-body"
//           style={{
//             overflowY: "auto",
//             backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background for body
//             borderRadius: "0 0 1em 1em",
//             padding: "1em",
//           }}
//         >
//           <div className="table-responsive">
//             <table
//               className="table text-center"
//               style={{
//                 backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly transparent table background
//                 color: "#333", // Dark text color for readability
//               }}
//             >
//               <thead
//                 className="table-bordered"
//                 style={{
//                   backgroundColor: "#333", // Dark background for header
//                   color: "#fff",
//                 }}
//               >
//                 <tr>
//                   <th scope="col">Variant</th>
//                   <th scope="col">Name</th>
//                   <th scope="col">Company</th>
//                   <th scope="col">Description</th>
//                   <th scope="col">Fuel Type</th>
//                   <th scope="col">Seat Capacity</th>
//                   <th scope="col">Model</th>
//                   <th scope="col">Year</th>
//                   <th scope="col">Is AC</th>
//                   <th scope="col">Price</th>
//                   <th scope="col">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {variants.map((variant) => {
//                   return (
//                     <tr key={variant.id}>
//                       <td>
//                         <img
//                           src={"http://localhost:8080/api/variant/" + variant.image}
//                           alt="car_pic"
//                           style={{
//                             maxWidth: "90px",
//                             borderRadius: "0.5em", // Rounded corners for images
//                           }}
//                         />
//                       </td>
//                       <td>
//                         <b>{variant.name}</b>
//                       </td>
//                       <td>
//                         <b>{variant.company.name}</b>
//                       </td>
//                       <td>
//                         <b>{variant.description}</b>
//                       </td>
//                       <td>
//                         <b>{variant.fuelType}</b>
//                       </td>
//                       <td>
//                         <b>{variant.seatingCapacity}</b>
//                       </td>
//                       <td>
//                         <b>{variant.modelNumber}</b>
//                       </td>
//                       <td>
//                         <b>{variant.year}</b>
//                       </td>
//                       <td>
//                         <b>{variant.ac === true ? "Yes" : "No"}</b>
//                       </td>
//                       <td>
//                         <b>{variant.pricePerDay}</b>
//                       </td>
//                       <td>
//                         <button
//                           onClick={() => updateVariant(variant)}
//                           className="btn btn-sm"
//                           style={{
//                             backgroundColor: "#333",
//                             color: "#fff",
//                             borderRadius: "0.5em",
//                             marginRight: "5px",
//                           }}
//                         >
//                           <b>Update</b>
//                         </button>
//                         <button
//                           onClick={() => deleteVariant(variant.id)}
//                           className="btn btn-sm"
//                           style={{
//                             backgroundColor: "#d9534f",
//                             color: "#fff",
//                             borderRadius: "0.5em",
//                             marginRight: "5px",
//                           }}
//                         >
//                           <b>Delete</b>
//                         </button>
//                         <button
//                           onClick={() => viewVehicles(variant)}
//                           className="btn btn-sm"
//                           style={{
//                             backgroundColor: "#5bc0de",
//                             color: "#fff",
//                             borderRadius: "0.5em",
//                           }}
//                         >
//                           <b>View Vehicles</b>
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ViewVariants;




// import { useState, useEffect } from "react";
// import axios from "axios";
// import React from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const ViewVariants = () => {
//   const [variants, setVariants] = useState([]);
//   const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

//   let navigate = useNavigate();

//   const retrieveAllVariant = async () => {
//     const response = await axios.get(
//       "http://localhost:8080/api/variant/fetch/all"
//     );
//     return response.data;
//   };

//   useEffect(() => {
//     const getAllVariant = async () => {
//       const res = await retrieveAllVariant();
//       if (res) {
//         setVariants(res.variants);
//       }
//     };
//     getAllVariant();
//   }, []);

//   const deleteVariant = (variantId, e) => {
//     fetch("http://localhost:8080/api/variant/delete?variantId=" + variantId, {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         //     Authorization: "Bearer " + admin_jwtToken,
//       },
//     })
//       .then((result) => {
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
//               window.location.reload(true);
//             }, 1000); // Redirect after 3 seconds
//           } else if (!res.success) {
//             toast.error(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//             setTimeout(() => {
//               window.location.reload(true);
//             }, 1000); // Redirect after 3 seconds
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
//         setTimeout(() => {
//           window.location.reload(true);
//         }, 1000); // Redirect after 3 seconds
//       });
//   };

//   const updateVariant = (variant) => {
//     navigate("/admin/variant/update", { state: variant });
//   };

//   const viewVehicles = (variant) => {
//     navigate("/admin/vehicle/details", { state: variant });
//   };

//   return (
//     <div className="mt-3">
//       <div
//         className="card form-card ms-2 me-2 mb-5 custom-bg"
//         style={{
//           height: "45rem",
//         }}
//       >
//         <div
//           className="card-header custom-bg-text text-center bg-color"
//           style={{
//             borderRadius: "1em",
//             height: "50px",
//           }}
//         >
//           <h2>All Variants</h2>
//         </div>
//         <div
//           className="card-body"
//           style={{
//             overflowY: "auto",
//           }}
//         >
//           <div className="table-responsive">
//             <table className="table text-color text-center">
//               <thead className="table-bordered border-color bg-color custom-bg-text">
//                 <tr>
//                   <th scope="col">Variant</th>
//                   <th scope="col">Name</th>
//                   <th scope="col">Company</th>
//                   <th scope="col">Description</th>
//                   <th scope="col">Fuel Type</th>
//                   <th scope="col">Seat Capacity</th>
//                   <th scope="col">Model</th>
//                   <th scope="col">Year</th>
//                   <th scope="col">Is AC</th>
//                   <th scope="col">Price</th>
//                   <th scope="col">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="header-logo-color">
//                 {variants.map((variant) => {
//                   return (
//                     <tr>
//                       <td>
//                         <img
//                           src={
//                             "http://localhost:8080/api/variant/" + variant.image
//                           }
//                           class="img-fluid"
//                           alt="car_pic"
//                           style={{
//                             maxWidth: "90px",
//                           }}
//                         />
//                       </td>
//                       <td>
//                         <b>{variant.name}</b>
//                       </td>
//                       <td>
//                         <b>{variant.company.name}</b>
//                       </td>
//                       <td>
//                         <b>{variant.description}</b>
//                       </td>
//                       <td>
//                         <b>{variant.fuelType}</b>
//                       </td>
//                       <td>
//                         <b>{variant.seatingCapacity}</b>
//                       </td>
//                       <td>
//                         <b>{variant.modelNumber}</b>
//                       </td>
//                       <td>
//                         <b>{variant.year}</b>
//                       </td>
//                       <td>
//                         <b>{variant.ac === true ? "Yes" : "No"}</b>
//                       </td>
//                       <td>
//                         <b>{variant.pricePerDay}</b>
//                       </td>
//                       <td>
//                         <button
//                           onClick={() => updateVariant(variant)}
//                           className="btn btn-sm bg-color custom-bg-text"
//                         >
//                           <b> Update</b>
//                         </button>
//                         <button
//                           onClick={() => deleteVariant(variant.id)}
//                           className="btn btn-sm bg-color custom-bg-text mt-2"
//                         >
//                           <b>Delete</b>
//                         </button>

//                         <button
//                           onClick={() => viewVehicles(variant)}
//                           className="btn btn-sm bg-color custom-bg-text mt-2"
//                         >
//                           <b>View Vehicles</b>
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewVariants;
