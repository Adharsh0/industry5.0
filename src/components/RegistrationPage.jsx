import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Send, 
  Calendar,
  MapPin,
  GraduationCap,
  CreditCard,
  Utensils,
  BedDouble,
  CheckCircle2
} from 'lucide-react';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '',
    isIsteMember: '',
    isteRegistrationNumber: '',
    stayPreference: '',
    foodPreference: '',
    acknowledgement: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    setShowPayment(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleLocationClick = () => {
    window.open('https://maps.app.goo.gl/p8PJqvzm5Ug9T4LNA', '_blank');
  };

  const calculateAdditionalCharges = () => {
    let charges = 0;
    if (formData.stayPreference === 'yes') charges += 500;
    if (formData.foodPreference === 'yes') charges += 300;
    return charges;
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // If payment page should be shown, render PaymentPage
  if (showPayment) {
    return <PaymentPage formData={formData} additionalCharges={calculateAdditionalCharges()} />;
  }

  return (
    <div className="registration-container">
      {/* Background Shapes */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="registration-content">
        {/* Header */}
        <div className="registration-header">
          <h1 className="main-heading">
            Register for <span className="gradient-text">Industry 5.0</span>
          </h1>
          <p className="header-description">
            Join Kerala's premier technical convention. Limited seats available.
          </p>
        </div>

        <div className="registration-layout">
          {/* Main Form */}
          <div className="form-section">
            <div className="form-card">
              {/* Progress Steps */}
              <div className="progress-steps">
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    <div className="step-container">
                      <div className={`step-indicator ${currentStep >= step ? 'active' : 'inactive'}`}>
                        {currentStep > step ? <CheckCircle2 size={20} /> : step}
                      </div>
                      <span className={`step-label ${currentStep >= step ? 'text-white' : 'text-gray-500'}`}>
                        {step === 1 && 'Personal'}
                        {step === 2 && 'Academic'}
                        {step === 3 && 'Services'}
                      </span>
                    </div>
                    {step < 3 && (
                      <div className={`step-connector ${currentStep > step ? 'active' : 'inactive'}`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="form-step">
                    <h3 className="step-title">Personal Information</h3>
                    
                    <div className="input-group">
                      <User className="input-icon" size={20} />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="modern-input"
                      />
                    </div>

                    <div className="input-row">
                      <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="modern-input"
                        />
                      </div>

                      <div className="input-group">
                        <Phone className="input-icon" size={20} />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="modern-input"
                        />
                      </div>
                    </div>

                    <div className="button-group justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn-primary"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Academic Information */}
                {currentStep === 2 && (
                  <div className="form-step">
                    <h3 className="step-title">Academic Information</h3>
                    
                    <div className="input-group">
                      <Building2 className="input-icon" size={20} />
                      <input
                        type="text"
                        name="college"
                        placeholder="College/University"
                        value={formData.college}
                        onChange={handleChange}
                        required
                        className="modern-input"
                      />
                    </div>

                    <div className="input-row">
                      <div className="input-group">
                        <GraduationCap className="input-icon" size={20} />
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          required
                          className="modern-input"
                        >
                          <option value="">Select Department</option>
                          <option value="Computer Science">Computer Science & Engineering</option>
                          <option value="Electronics">Electronics & Communication</option>
                          <option value="Mechanical">Mechanical Engineering</option>
                          <option value="Civil">Civil Engineering</option>
                          <option value="Electrical">Electrical Engineering</option>
                          <option value="Other">Other Department</option>
                        </select>
                      </div>

                      <div className="input-group">
                        <Calendar className="input-icon" size={20} />
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          required
                          className="modern-input"
                        >
                          <option value="">Academic Year</option>
                          <option value="1st Year">First Year</option>
                          <option value="2nd Year">Second Year</option>
                          <option value="3rd Year">Third Year</option>
                          <option value="4th Year">Fourth Year</option>
                          <option value="Post Graduate">Post Graduate</option>
                        </select>
                      </div>
                    </div>

                    <div className="input-group">
                      <CreditCard className="input-icon" size={20} />
                      <select
                        name="isIsteMember"
                        value={formData.isIsteMember}
                        onChange={handleChange}
                        required
                        className="modern-input"
                      >
                        <option value="">Are you an ISTE member?</option>
                        <option value="yes">Yes, I am an ISTE member</option>
                        <option value="no">No, I am not an ISTE member</option>
                      </select>
                    </div>

                    {formData.isIsteMember === 'yes' && (
                      <div className="input-group">
                        <CreditCard className="input-icon" size={20} />
                        <input
                          type="text"
                          name="isteRegistrationNumber"
                          placeholder="ISTE Registration Number"
                          value={formData.isteRegistrationNumber}
                          onChange={handleChange}
                          required={formData.isIsteMember === 'yes'}
                          className="modern-input"
                        />
                      </div>
                    )}

                    <div className="button-group">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="btn-secondary"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn-primary"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Services & Submission */}
                {currentStep === 3 && (
                  <div className="form-step">
                    <h3 className="step-title">Additional Services</h3>
                    
                    <div className="input-group">
                      <BedDouble className="input-icon" size={20} />
                      <select
                        name="stayPreference"
                        value={formData.stayPreference}
                        onChange={handleChange}
                        required
                        className="modern-input"
                      >
                        <option value="">Do you require accommodation?</option>
                        <option value="yes">Yes, I need accommodation (₹500)</option>
                        <option value="no">No, I don't need accommodation</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <Utensils className="input-icon" size={20} />
                      <select
                        name="foodPreference"
                        value={formData.foodPreference}
                        onChange={handleChange}
                        required
                        className="modern-input"
                      >
                        <option value="">Do you require food facility?</option>
                        <option value="yes">Yes, I need food facility (₹300)</option>
                        <option value="no">No, I don't need food facility</option>
                      </select>
                    </div>

                    {calculateAdditionalCharges() > 0 && (
                      <div className="charges-summary">
                        <div className="charges-content">
                          <h4>Additional Charges</h4>
                          <p>Total: <span className="charges-amount">₹{calculateAdditionalCharges()}</span></p>
                          <small>Payable during event registration</small>
                        </div>
                      </div>
                    )}

                    <label className="checkbox-group">
                      <input
                        type="checkbox"
                        name="acknowledgement"
                        checked={formData.acknowledgement}
                        onChange={handleChange}
                        required
                        className="checkbox-input"
                      />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">
                        I confirm that all information provided is accurate and agree to the terms.
                      </span>
                    </label>

                    <div className="button-group">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="btn-secondary"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!formData.acknowledgement}
                        className="submit-btn"
                      >
                        Complete Registration
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="info-section">
            {/* Venue Map Card */}
            <div className="info-card">
              <div className="card-header">
                <h3 className="card-title">Venue Location</h3>
              </div>
              
              <div className="map-container">
                <div className="map-overlay"></div>
                <div className="map-marker" onClick={handleLocationClick} title="Click to open in Google Maps">
                  <div className="marker-dot"></div>
                </div>
              </div>
              
              <div className="location-info">
                <p className="location-text">
                  Mar Baselios College of Engineering and Technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Page Component
const PaymentPage = ({ formData, additionalCharges }) => {
  const [transactionId, setTransactionId] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (transactionId.trim()) {
      setPaymentCompleted(true);
      console.log('Payment completed with transaction ID:', transactionId);
    }
  };

  // Scroll to top when payment is completed
  useEffect(() => {
    if (paymentCompleted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [paymentCompleted]);

  // Also scroll to top when component mounts for payment page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (paymentCompleted) {
    return (
      <div className="registration-container">
        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="registration-content">
          <div className="success-container">
            <div className="success-card">
              <CheckCircle2 size={80} className="success-icon" />
              <h1 className="success-title">Payment Successful!</h1>
              <p className="success-message">
                Hi <strong>{formData.fullName}</strong>, your registration for ISTE INDUSTRY 5.0 has been completed successfully.
              </p>
              <div className="success-details">
                <p><strong>Transaction ID:</strong> {transactionId}</p>
                <p><strong>Amount Paid:</strong> ₹{additionalCharges}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>College:</strong> {formData.college}</p>
              </div>
              <button 
                className="success-btn"
                onClick={() => window.location.reload()}
              >
                Register Another Participant
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="registration-content">
        <div className="registration-header">
          <h1 className="main-heading">
            Complete Your <span className="gradient-text">Payment</span>
          </h1>
          <p className="header-description">
            Hi {formData.fullName}, please complete the payment to confirm your registration
          </p>
        </div>

        <div className="payment-layout">
          <div className="form-section">
            <div className="form-card">
              <div className="payment-header">
                <h2 className="form-title">Payment Details</h2>
                <p className="form-subtitle">Total Amount: <span className="payment-amount">₹{additionalCharges}</span></p>
              </div>

              <div className="payment-content">
              <div className="qr-section">
  <h3 className="qr-title">Scan QR Code to Pay</h3>
  <div className="qr-container">
    <div className="qr-code-placeholder">
      <div className="qr-image-container">
        <img 
          src="iste-qr.jpg" 
          alt="UPI Payment QR Code"
          className="qr-image"
        />
        <div className="qr-amount-overlay">₹{additionalCharges}</div>
      </div>
    </div>
    <p className="qr-instruction">
      Scan this QR code with any UPI app to complete your payment
    </p>
  </div>
</div>

                <form onSubmit={handlePaymentSubmit} className="transaction-form">
                  <div className="input-group">
                    <CreditCard className="input-icon" size={20} />
                    <input
                      type="text"
                      placeholder="Enter Transaction ID"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      required
                      className="modern-input"
                    />
                  </div>
                  
                  <div className="payment-instructions">
                    <h4>Payment Instructions:</h4>
                    <ul>
                      <li>Scan the QR code with your UPI app</li>
                      <li>Complete the payment of ₹{additionalCharges}</li>
                      <li>Enter the transaction ID from your payment app</li>
                      <li>Click "Confirm Payment" to complete registration</li>
                    </ul>
                  </div>

                  <button type="submit" className="submit-btn payment-btn">
                    Confirm Payment
                    <CheckCircle2 size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="info-section">
            <div className="info-card">
              <div className="card-header">
                <h3 className="card-title">Registration Summary</h3>
              </div>
              <div className="registration-summary">
                <div className="summary-item">
                  <span className="summary-label">Name:</span>
                  <span className="summary-value">{formData.fullName}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Email:</span>
                  <span className="summary-value">{formData.email}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Phone:</span>
                  <span className="summary-value">{formData.phone}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">College:</span>
                  <span className="summary-value">{formData.college}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Department:</span>
                  <span className="summary-value">{formData.department}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Year:</span>
                  <span className="summary-value">{formData.year}</span>
                </div>
                {formData.stayPreference === 'yes' && (
                  <div className="summary-item">
                    <span className="summary-label">Accommodation:</span>
                    <span className="summary-value">₹500</span>
                  </div>
                )}
                {formData.foodPreference === 'yes' && (
                  <div className="summary-item">
                    <span className="summary-label">Food Facility:</span>
                    <span className="summary-value">₹300</span>
                  </div>
                )}
                <div className="summary-total">
                  <span className="total-label">Total Amount:</span>
                  <span className="total-value">₹{additionalCharges}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;