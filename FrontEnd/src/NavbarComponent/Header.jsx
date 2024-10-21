import { Link } from "react-router-dom";
import RoleNav from "./RoleNav";
import logo from "../images/e_logo.png";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-bg text-color">
        <div className="container-fluid text-color">
          <img
            src={logo}
            height="50"
            width="auto"
            className="d-inline-block align-top"
            alt=""
          />
          <Link to="/" className="navbar-brand">
            <b className="header-logo-color ms-2" style={{ fontSize: '25px', fontFamily: 'sans-serif' }}>
              MotionMint
            </b>
          </Link>
          <Link to="/aboutus" className="navbar-brand">
            <i className="text-color">
              <b>AboutUs</b>
            </i>
          </Link>
          <Link to="/contactus" className="navbar-brand">
            <i className="text-color">
              <b>ContactUs</b>
            </i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <RoleNav />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
// import { Link } from "react-router-dom";
// import RoleNav from "./RoleNav";
// import logo from "../images/e_logo.png";
// import { useEffect, useState } from "react";

// const Header = () => {
//   const [animate, setAnimate] = useState(false);

//   useEffect(() => {
//     // Start the animation when the component mounts
//     setAnimate(true);

//     // Reset animation state after the animation completes
//     const timer = setTimeout(() => {
//       setAnimate(false);
//     }, 5000); // Duration should match the animation duration

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg custom-bg text-color">
//         <div className="container-fluid text-color">
//           <div
//             style={{
//               width: "100%",
//               overflow: "hidden",
//               position: "relative",
//               height: "50px", // Adjust to match the height of your logo
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 position: "absolute",
//                 height: "100%",
//                 whiteSpace: "nowrap",
//                 animation: animate ? "marquee 5s linear" : "none",
//                 // Ensure it scrolls only once
//                 animationFillMode: "forwards",
//               }}
//             >
//               <img
//                 src={logo}
//                 height="50"
//                 width="auto"
//                 className="d-inline-block align-top"
//                 alt="Logo"
//                 style={{
//                   height: "100%",
//                 }}
//               />
//             </div>
//             <style>
//               {`
//                 @keyframes marquee {
//                   from {
//                     transform: translateX(-100%);
//                   }
//                   to {
//                     transform: translateX(100%);
//                   }
//                 }
//               `}
//             </style>
//           </div>

//           <Link to="/" className="navbar-brand">
//             <b className="header-logo-color ms-2" style={{ fontSize: '25px', fontFamily: 'sans-serif', paddingLeft:"-100px" }}>
//               MotionMint
//             </b>
//           </Link>
//           <Link to="/aboutus" className="navbar-brand">
//             <i className="text-color">
//               <b>AboutUs</b>
//             </i>
//           </Link>
//           <Link to="/contactus" className="navbar-brand">
//             <i className="text-color">
//               <b>ContactUs</b>
//             </i>
//           </Link>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <RoleNav />
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Header;
