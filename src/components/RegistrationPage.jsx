import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Send, 
  ArrowLeft,
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
    
    let additionalCharges = 0;
    if (formData.stayPreference === 'yes') additionalCharges += 500;
    if (formData.foodPreference === 'yes') additionalCharges += 300;
    
    const message = additionalCharges > 0 
      ? `Registration submitted successfully! Additional charges: ₹${additionalCharges}. We will contact you for payment.`
      : 'Registration submitted successfully!';
    
    alert(message);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBack = () => {
    window.history.back();
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
            {/* Event Details Card */}
            <div className="info-card">
              <div className="card-header">
                <h3 className="card-title">Event Details</h3>
              </div>
              <div className="event-details">
                <div className="event-item">
                  <Calendar className="event-icon" size={20} />
                  <div className="event-info">
                    <span className="event-label">Date</span>
                    <span className="event-value">Jan 9-10, 2026</span>
                  </div>
                </div>
                <div className="event-item">
                  <MapPin className="event-icon" size={20} />
                  <div className="event-info">
                    <span className="event-label">Venue</span>
                    <span className="event-value">MBCET, Trivandrum</span>
                  </div>
                </div>
                <div className="event-item">
                  <CreditCard className="event-icon" size={20} />
                  <div className="event-info">
                    <span className="event-label">Registration</span>
                    <span className="event-value">Free for ISTE Members</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Structure Card */}
            <div className="info-card">
              <div className="card-header">
                <h3 className="card-title">Fee Structure</h3>
              </div>
              <div className="pricing-list">
                <div className="pricing-item">
                  <span className="pricing-label">Base Registration</span>
                  <span className="pricing-free">Free</span>
                </div>
                <div className="pricing-item">
                  <span className="pricing-label">Accommodation</span>
                  <span className="pricing-value">₹500</span>
                </div>
                <div className="pricing-item">
                  <span className="pricing-label">Food Facility</span>
                  <span className="pricing-value">₹300</span>
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