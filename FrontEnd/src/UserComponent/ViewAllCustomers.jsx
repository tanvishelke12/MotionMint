import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const ViewAllCustomers = () => {
  let navigate = useNavigate();

  const [allCustomer, setAllCustomer] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllCustomer(allUsers.users);
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/role-wise?role=Customer",
      {
        headers: {
          //   Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const viewProfile = (user) => {
    navigate("/user/profile/detail", { state: user });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>All Customers</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Address</th>
                  <th scope="col">Driving License</th>
                </tr>
              </thead>
              <tbody>
                {allCustomer.map((employer) => {
                  return (
                    <tr>
                      <td>
                        <b>{employer.firstName}</b>
                      </td>
                      <td>
                        <b>{employer.lastName}</b>
                      </td>
                      <td>
                        <b>{employer.emailId}</b>
                      </td>
                      <td>
                        <b>{employer.phoneNo}</b>
                      </td>
                      <td>
                        <b>
                          {employer.address.street +
                            ", " +
                            employer.address.city +
                            ", " +
                            employer.address.pincode}
                        </b>
                      </td>
                      <td>
                        <button
                          onClick={() => viewProfile(employer)}
                          className="btn btn-sm bg-color custom-bg-text"
                        >
                          <b>View</b>
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
    </div>
  );
};

export default ViewAllCustomers;
