import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const ContactUs = () => {
  return (
    <div className="container mt-5">
      <h4 
        className="mb-3"
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '2em',
          color: '#333',
          transition: 'color 0.3s',
          fontWeight: 'bold',
        }}
        onMouseEnter={(e) => e.target.style.color = '#007bff'}
        onMouseLeave={(e) => e.target.style.color = '#333'}
      >
        Contact Us
      </h4>
      <p style={{ fontWeight: 'bold', lineHeight: '1.6', fontSize: '1.2em', fontFamily: 'Arial, sans-serif' }}>
        We're here to help! If you have any questions, concerns, or need assistance with your car rental, please don't hesitate to get in touch with us. 
        Our team is dedicated to providing you with the best possible service.
      </p>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card" style={{ transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faPhone} /> Customer Service <span className="badge bg-success">Available 24/7</span>
              </h5>
              <p className="card-text">
                Contact us via phone or email for prompt and friendly support.
              </p>
              <p className="card-text">
                Phone: 1-800-555-1234<br/>
                Email: support@motionmint.com
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{ transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Office Location <span className="badge bg-primary">Visit Us</span>
              </h5>
              <p className="card-text">
                Come visit us at our office for in-person assistance and to see our vehicle selection.
              </p>
              <p className="card-text">
                Address: near Kharghar Railway Station<br/>
                Address: Mumbai
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card" style={{ transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <div className="card-body">
              <h5 className="card-title">
                Social Media <span className="badge bg-info">Connect</span>
              </h5>
              <p className="card-text" style={{textAlign: 'center'}}>
                Follow us on social media to stay updated with our latest offers, news, and promotions.
              </p>
              <p className="card-text " style={{textAlign: 'center'}} >
                <a href="https://www.facebook.com/motionmint" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} size="2x" style={{ marginRight: '10px' }} />
                </a>
                 <a href="https://www.twitter.com/motionmint" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="2x" style={{ marginRight: '10px' }} />
                </a>
                <a href="https://www.instagram.com/motionmint" target="_blank" rel="noopener noreferrer">
                     <FontAwesomeIcon icon={faInstagram} size="2x" />
                 </a>
            </p>

            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{ transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <div className="card-body">
              <h5 className="card-title">
                FAQ <span className="badge bg-warning">Helpful</span>
              </h5>
              <p className="card-text">
                Check out our Frequently Asked Questions (FAQ) section for quick answers to common questions.
              </p>
              <p className="card-text">
                Visit our FAQ page: <a href="/faq" target="_blank" rel="noopener noreferrer">motionmint.com/faq</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontWeight: 'bold', lineHeight: '1.6', fontSize: '1.2em', fontFamily: 'Arial, sans-serif', marginTop: '20px', textAlign: 'center' }}>
        We appreciate your feedback and look forward to assisting you with your car rental needs. <br/>
        Thank you for choosing Motion Mint!
      </p>
    </div>
  );
};

export default ContactUs;
