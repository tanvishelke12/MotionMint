import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import seat from "../images/seat.png";
import rupee from "../images/rupee.png";
import company from "../images/company.png";
import fuelType from "../images/fuel.png";
import model from "../images/model.png";
import year from "../images/year.png";
import ac from "../images/ac.png";
import rent from "../images/rent.png";

const ViewVariantDetail = () => {
  const { variantId } = useParams();

  const [variant, setVariant] = useState({
    company: {
      name: "",
    },
  });

  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    startDate: "",
    endDate: "",
  });

  // Update state on input change
  const handleBookingInput = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  // Retrieve variant details
  const retrieveVariant = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/variant/fetch?variantId=" + variantId
    );
    return response.data;
  };

  useEffect(() => {
    const getVariant = async () => {
      const res = await retrieveVariant();
      if (res) {
        setVariant(res.variants[0]);
      }
    };
    getVariant();
  }, []);

  // Format date from epoch
  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    return date.toLocaleString(); 
  };

  // Calculate minimum end date
  const getMinEndDate = () => {
    const startDate = new Date(booking.startDate);
    if (startDate.toString() === "Invalid Date") return ""; // Invalid start date
    startDate.setDate(startDate.getDate() + 1);
    return startDate.toISOString().split("T")[0];
  };

  // Book car with validation
  const bookCar = (e) => {
    e.preventDefault();

    if (customer === null) {
      alert("Please Login to Book Your Car!!!");
      return;
    }

    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    const today = new Date();

    // Validation
    if (startDate < today) {
      toast.error("The start date cannot be in the past!", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    if (endDate <= startDate) {
      toast.error("The end date must be after the start date!", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    booking.customerId = customer.id;
    booking.vehicleId = variantId;

    fetch("http://localhost:8080/api/booking/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
            });
            setTimeout(() => {
              navigate("/home");
            }, 2000);
          } else {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };

  return (
    <div className="mb-3">
      <div className="col ml-5 mt-3 ms-5 me-5">
        <div className="card form-card custom-bg h-100">
          <div className="card-body">
            <div className="row">
              {/* Left side - Variant */}
              <div className="col-md-4">
                <img
                  src={"http://localhost:8080/api/variant/" + variant.image}
                  className="card-img-top rounded img-fluid"
                  alt="Company Logo"
                  style={{ maxWidth: "500px" }}
                />
              </div>
              {/* Right side - Variant Details */}
              <div className="col-md-8">
                <h1 className="header-logo-color">{variant.name}</h1>
                <p className="text-color">{variant.description}</p>

                <h4 className="card-title d-flex justify-content-between header-logo-color mt-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={fuelType}
                      height="30"
                      width="auto"
                      className="d-inline-block align-top me-1"
                      alt=""
                    />
                    <span className="text-color">{variant.fuelType}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src={seat}
                      height="30"
                      width="auto"
                      className="d-inline-block align-top me-1"
                      alt=""
                    />
                    <span className="text-color">{variant.seatingCapacity}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src={company}
                      height="30"
                      width="auto"
                      className="d-inline-block align-top me-1"
                      alt=""
                    />
                    <span className="text-color">{variant.company.name}</span>
                  </div>
                </h4>

                <h4 className="card-title d-flex justify-content-between header-logo-color mt-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={model}
                      height="30"
                      width="auto"
                      className="d-inline-block align-top me-1"
                      alt=""
                    />
                    <span className="text-color">{variant.modelNumber}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src={year}
                      height="30"
                      width="auto"
                      className="d-inline-block align-top me-1"
                      alt=""
                    />
                    <span className="text-color">{variant.year}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src={ac}
                      height="30"
                      width="auto"
                      className="d-inline-block align-top me-1"
                      alt=""
                    />
                    <span className="text-color ms-2">{variant.ac === true ? "Yes" : "No"}</span>
                  </div>
                </h4>

                <h4 className="card-title d-flex justify-content-between header-logo-color mt-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={rent}
                      height="35"
                      width="auto"
                      className="d-inline-block align-top me-1"
                      alt=""
                    />
                    <img
                      src={rupee}
                      height="30"
                      width="auto"
                      className="d-inline-block align-top me-1"
                      alt=""
                    />
                    <span className="text-color">{variant.pricePerDay}</span>
                  </div>
                </h4>

                <div className="d-flex justify-content-left mt-5">
                  <form className="row g-3" onSubmit={bookCar}>
                    <div className="col-auto">
                      <label htmlFor="from" className="text-color">
                        <h5>From</h5>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        name="startDate"
                        onChange={handleBookingInput}
                        value={booking.startDate}
                        min={new Date().toISOString().split("T")[0]} // Prevent past dates
                        required
                      />
                    </div>
                    <div className="col-auto">
                      <label htmlFor="checkout" className="text-color">
                        <h5>To</h5>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="endDate"
                        name="endDate"
                        onChange={handleBookingInput}
                        value={booking.endDate}
                        min={getMinEndDate()} // Prevent selecting invalid "To" dates
                        required
                      />
                    </div>

                    <div className="col-auto mt-5">
                      <input
                        type="submit"
                        className="btn custom-bg bg-color mb-3"
                        value="Book Car"
                      />
                      <ToastContainer />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVariantDetail;