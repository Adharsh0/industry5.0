import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, Building2, Send, Calendar,
  MapPin, GraduationCap, CreditCard, BedDouble, 
  CheckCircle2, Loader2, AlertCircle, Clock, Download, ExternalLink, School
} from 'lucide-react';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    college: '',
    department: '',
    otherDepartment: '',
    year: '',
    isIsteMember: '',
    isteRegistrationNumber: '',
    stayPreference: '',
    stayDays: 0,
    acknowledgement: false
  });

  const API_BASE_URL = 'https://iste-backend-fcd3.onrender.com/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validate all required fields
    const requiredFields = [
      'fullName', 'email', 'phone', 'institution', 'college', 
      'department', 'year', 'isIsteMember', 'stayPreference'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setFormError(`Please fill all required fields`);
      return;
    }

    // Validate institution
    if (!formData.institution) {
      setFormError('Please select institution type');
      return;
    }

    // Validate department - if "Other" is selected, check otherDepartment
    if (formData.department === 'Other' && !formData.otherDepartment.trim()) {
      setFormError('Please specify your department name when selecting "Other"');
      return;
    }

    // Validate stayDays only if With Stay is selected
    if (formData.stayPreference === 'With Stay' && (!formData.stayDays || formData.stayDays < 1)) {
      setFormError('Please enter number of stay days (minimum 1)');
      return;
    }

    // Validate email format only (no duplication check here)
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.toLowerCase().trim())) {
        setFormError('Please enter a valid email address');
        return;
      }
    }

    setShowPayment(true);
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => {
      const updated = { ...prev, [name]: newValue };
      
      // Reset stayDays when stayPreference changes
      if (name === 'stayPreference') {
        if (value === 'Without Stay') {
          updated.stayDays = 0;
        } else if (value === 'With Stay' && prev.stayDays === 0) {
          updated.stayDays = 1;
        }
      }
      
      // Reset otherDepartment when department changes from "Other"
      if (name === 'department' && value !== 'Other') {
        updated.otherDepartment = '';
      }
      
      // Validate stayDays input (only for With Stay)
      if (name === 'stayDays' && formData.stayPreference === 'With Stay') {
        const numValue = parseInt(value) || 0;
        if (numValue < 1) {
          updated.stayDays = 1;
        } else if (numValue > 10) {
          updated.stayDays = 10;
        } else {
          updated.stayDays = numValue;
        }
      }
      
      return updated;
    });
    
    setFormError('');
  };

  const calculateTotalAmount = () => {
    let total = formData.institution === 'Polytechnic' ? 350 : 500;
    
    if (formData.stayPreference === 'With Stay' && formData.stayDays > 0) {
      total += (150 * formData.stayDays);
    }
    
    return total;
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        setFormError('Please enter your full name');
        return;
      }
      if (!formData.email.trim()) {
        setFormError('Please enter your email address');
        return;
      }
      if (!formData.phone.trim()) {
        setFormError('Please enter your phone number');
        return;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.institution) {
        setFormError('Please select institution type');
        return;
      }
      if (!formData.college.trim()) {
        setFormError('Please enter college name');
        return;
      }
      if (!formData.department) {
        setFormError('Please select department');
        return;
      }
      if (formData.department === 'Other' && !formData.otherDepartment.trim()) {
        setFormError('Please specify your department name');
        return;
      }
      if (!formData.year) {
        setFormError('Please select academic year');
        return;
      }
      if (!formData.isIsteMember) {
        setFormError('Please select ISTE membership status');
        return;
      }
      if (formData.isIsteMember === 'Yes' && !formData.isteRegistrationNumber.trim()) {
        setFormError('Please enter ISTE registration number');
        return;
      }
    }
    
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (showPayment) {
    return <PaymentPage 
      formData={formData} 
      totalAmount={calculateTotalAmount()} 
      setIsSubmitting={setIsSubmitting}
      setFormError={setFormError}
      apiBaseUrl={API_BASE_URL}
    />;
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
            Register for <span className="gradient-text">NEXORA</span>
          </h1>
          <p className="header-description">
            Join Kerala's premier technical convention. Limited seats available.
          </p>
          <div className="registration-note">
            <AlertCircle size={16} />
            <span>Each email can only be used for one registration</span>
          </div>
        </div>

        {formError && (
          <div className="error-alert">
            <AlertCircle size={20} />
            <span>{formError}</span>
          </div>
        )}

        <div className="registration-layout">
          <div className="form-section">
            <div className="form-card">
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
                {currentStep === 1 && (
                  <div className="form-step">
                    <h3 className="step-title">Personal Information</h3>
                    
                    <div className="input-group">
                      <User className="input-icon" size={20} />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="modern-input"
                        minLength={3}
                      />
                    </div>

                    <div className="input-row">
                      <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address *"
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
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="modern-input"
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit phone number"
                        />
                      </div>
                    </div>

                    <div className="button-group justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn-primary"
                        disabled={!formData.fullName || !formData.email || !formData.phone}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="form-step">
                    <h3 className="step-title">Academic Information</h3>
                    
                    <div className="input-group">
                      <School className="input-icon" size={20} />
                      <select
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        required
                        className="modern-input"
                      >
                        <option value="">Select Institution Type *</option>
                        <option value="Engineering">Engineering College (₹500 base fee)</option>
                        <option value="Polytechnic">Polytechnic College (₹350 base fee)</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <Building2 className="input-icon" size={20} />
                      <input
                        type="text"
                        name="college"
                        placeholder="College/University Name *"
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
                          <option value="">Select Department *</option>
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
                          <option value="">Academic Year *</option>
                          <option value="First">First Year</option>
                          <option value="Second">Second Year</option>
                          <option value="Third">Third Year</option>
                          <option value="Fourth">Fourth Year</option>
                          <option value="Final">Final Year</option>
                        </select>
                      </div>
                    </div>

                    {formData.department === 'Other' && (
                      <div className="input-group">
                        <GraduationCap className="input-icon" size={20} />
                        <input
                          type="text"
                          name="otherDepartment"
                          placeholder="Please specify your department name *"
                          value={formData.otherDepartment}
                          onChange={handleChange}
                          required={formData.department === 'Other'}
                          className="modern-input"
                        />
                      </div>
                    )}

                    <div className="input-group">
                      <CreditCard className="input-icon" size={20} />
                      <select
                        name="isIsteMember"
                        value={formData.isIsteMember}
                        onChange={handleChange}
                        required
                        className="modern-input"
                      >
                        <option value="">Are you an ISTE member? *</option>
                        <option value="Yes">Yes, I am an ISTE member</option>
                        <option value="No">No, I am not an ISTE member</option>
                      </select>
                    </div>

                    {formData.isIsteMember === 'Yes' && (
                      <div className="input-group">
                        <CreditCard className="input-icon" size={20} />
                        <input
                          type="text"
                          name="isteRegistrationNumber"
                          placeholder="ISTE Registration Number *"
                          value={formData.isteRegistrationNumber}
                          onChange={handleChange}
                          required={formData.isIsteMember === 'Yes'}
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
                        disabled={
                          !formData.institution || 
                          !formData.college || 
                          !formData.department || 
                          (formData.department === 'Other' && !formData.otherDepartment.trim()) ||
                          !formData.year || 
                          !formData.isIsteMember
                        }
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

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
                        <option value="">Do you require accommodation? *</option>
                        <option value="With Stay">Yes, I need accommodation (₹150/day)</option>
                        <option value="Without Stay">No, I don't need accommodation</option>
                      </select>
                    </div>

                    {formData.stayPreference === 'With Stay' && (
                      <div className="input-group">
                        <div className="stay-days-container">
                          <div className="stay-counter-wrapper">
                            <span className="counter-label">Number of Stay Days *</span>
                            <div className="counter-controls">
                              <button
                                type="button"
                                className="counter-btn"
                                onClick={() => {
                                  const newValue = Math.max(1, formData.stayDays - 1);
                                  setFormData(prev => ({ ...prev, stayDays: newValue }));
                                }}
                                disabled={formData.stayDays <= 1}
                                aria-label="Decrease days"
                              >
                                −
                              </button>
                              <span className="counter-value">{formData.stayDays}</span>
                              <button
                                type="button"
                                className="counter-btn"
                                onClick={() => {
                                  const newValue = Math.min(10, formData.stayDays + 1);
                                  setFormData(prev => ({ ...prev, stayDays: newValue }));
                                }}
                                disabled={formData.stayDays >= 10}
                                aria-label="Increase days"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <input
                            type="number"
                            name="stayDays"
                            value={formData.stayDays}
                            onChange={handleChange}
                            required={formData.stayPreference === 'With Stay'}
                            min="1"
                            max="10"
                            className="modern-input"
                            tabIndex={-1}
                          />
                          <div className="stay-days-hint">
                            <span>₹150 per day × {formData.stayDays} day(s)</span>
                            <span className="stay-calculation">= ₹{150 * formData.stayDays}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="charges-summary">
                      <div className="charges-content">
                        <h4>Payment Summary</h4>
                        <div className="charges-breakdown">
                          <div className="charge-item">
                            <span>Registration Fee ({formData.institution}):</span>
                            <span>₹{formData.institution === 'Polytechnic' ? 350 : 500}</span>
                          </div>
                          {formData.stayPreference === 'With Stay' && formData.stayDays > 0 && (
                            <div className="charge-item">
                              <span>Accommodation ({formData.stayDays} day{formData.stayDays > 1 ? 's' : ''}):</span>
                              <span>₹{150 * formData.stayDays}</span>
                            </div>
                          )}
                          <div className="charge-total">
                            <span>Total Amount:</span>
                            <span className="total-amount">₹{calculateTotalAmount()}</span>
                          </div>
                        </div>
                        <small className="charges-note">Payment details will be shown on next page</small>
                      </div>
                    </div>

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
                        I confirm that all information provided is accurate and agree to pay ₹{calculateTotalAmount()} for registration.
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
                        disabled={
                          !formData.acknowledgement || 
                          isSubmitting || 
                          !formData.stayPreference || 
                          (formData.stayPreference === 'With Stay' && (!formData.stayDays || formData.stayDays < 1))
                        }
                        className="submit-btn"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            Processing...
                          </>
                        ) : (
                          <>
                            Proceed to Payment
                            <Send size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="info-section">
            <div className="info-card">
              <div className="card-header">
                <h3 className="card-title">Venue Location</h3>
              </div>
              
              <div className="map-container">
                <div className="map-overlay"></div>
                <div className="map-marker" onClick={() => window.open('https://maps.app.goo.gl/p8PJqvzm5Ug9T4LNA', '_blank')} title="Click to open in Google Maps">
                  <div className="marker-dot"></div>
                </div>
              </div>
              
              <div className="location-info">
                <p className="location-text">
                  Mar Baselios College of Engineering and Technology
                </p>
              </div>
            </div>

            <div className="info-card pricing-card">
              <div className="card-header">
                <h3 className="card-title">Registration Fee</h3>
              </div>
              <div className="pricing-details">
                <div className="price-item">
                  <span className="price-label">Engineering College</span>
                  <span className="price-value">₹500</span>
                </div>
                <div className="price-item">
                  <span className="price-label">Polytechnic College</span>
                  <span className="price-value">₹350</span>
                </div>
                <div className="price-item">
                  <span className="price-label">Accommodation (per day)</span>
                  <span className="price-value">₹150</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentPage = ({ formData, totalAmount, setIsSubmitting, setFormError, apiBaseUrl }) => {
  const [transactionId, setTransactionId] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [registrationId, setRegistrationId] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.stayPreference === 'With Stay' && (!formData.stayDays || formData.stayDays < 1)) {
      setPaymentError('Please enter number of stay days (minimum 1)');
      return;
    }

    if (!transactionId.trim()) {
      setPaymentError('Please enter your transaction ID');
      return;
    }

    if (transactionId.length < 3) {
      setPaymentError('Transaction ID must be at least 3 characters');
      return;
    }

    if (!formData.institution) {
      setPaymentError('Institution type is required');
      return;
    }

    if (formData.department === 'Other' && !formData.otherDepartment.trim()) {
      setPaymentError('Please specify your department name');
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      // EMAIL DUPLICATION CHECK HAPPENS HERE AT REGISTRATION TIME
      // First check if email already exists
      const emailCheckResponse = await fetch(`${apiBaseUrl}/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email.toLowerCase().trim() }),
      });
      
      const emailCheckResult = await emailCheckResponse.json();
      
      if (emailCheckResult.exists) {
        setPaymentError('This email is already registered. Please go back and use a different email address.');
        setIsProcessing(false);
        return;
      }

      // Prepare registration data
      const registrationData = {
        fullName: formData.fullName.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone.trim(),
        institution: formData.institution.trim(),
        college: formData.college.trim(),
        department: formData.department,
        otherDepartment: formData.department === 'Other' ? formData.otherDepartment.trim() : '',
        year: formData.year,
        isIsteMember: formData.isIsteMember,
        isteRegistrationNumber: formData.isteRegistrationNumber ? formData.isteRegistrationNumber.trim() : '',
        stayPreference: formData.stayPreference,
        stayDays: formData.stayPreference === 'With Stay' ? Number(formData.stayDays) : 0,
        totalAmount: totalAmount,
        transactionId: transactionId.trim()
      };

      console.log('Registration data being sent:', registrationData);

      const response = await fetch(`${apiBaseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setPaymentCompleted(true);
        setRegistrationId(result.data.registrationId || result.data.id);
      } else {
        const errorMessage = result.message || 'Registration failed. Please try again.';
        setPaymentError(errorMessage);
        
        console.error('Registration failed:', result);
      }
    } catch (error) {
      console.error('Network error:', error);
      setPaymentError('Network error. Please check your internet connection and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

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
              <div className="success-icon-container">
                <div className="success-icon-pending">
                  <Clock size={60} />
                </div>
              </div>
              <h1 className="success-title">Registration Submitted!</h1>
              <p className="success-message">
                Hi <strong>{formData.fullName}</strong>, your registration for ISTE INDUSTRY 5.0 has been submitted successfully!
              </p>
              
              <div className="status-container">
                <div className="status-card pending">
                  <div className="status-icon">
                    <Clock size={24} />
                  </div>
                  <div className="status-content">
                    <h3>Status: Pending Approval</h3>
                    <p>Your registration is pending admin review. We'll notify you via email once approved.</p>
                    <small>Approval usually takes 24-48 hours</small>
                  </div>
                </div>
              </div>
              
              <div className="success-details">
                <h3>Registration Details</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Transaction ID:</span>
                    <span className="detail-value">{transactionId}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Amount Paid:</span>
                    <span className="detail-value">₹{totalAmount}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Registration ID:</span>
                    <span className="detail-value">{registrationId || 'Pending...'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{formData.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{formData.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Institution:</span>
                    <span className="detail-value">{formData.institution}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">College:</span>
                    <span className="detail-value">{formData.college}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Department:</span>
                    <span className="detail-value">
                      {formData.department === 'Other' ? formData.otherDepartment : formData.department}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Year:</span>
                    <span className="detail-value">{formData.year}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">ISTE Member:</span>
                    <span className="detail-value">{formData.isIsteMember}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Accommodation:</span>
                    <span className="detail-value">
                      {formData.stayPreference === 'With Stay' 
                        ? `Yes (${formData.stayDays} day${formData.stayDays > 1 ? 's' : ''})` 
                        : 'No'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="success-actions">
                <button 
                  className="success-btn primary"
                  onClick={() => window.location.reload()}
                >
                  Register Another Participant
                </button>
                <button 
                  className="success-btn secondary"
                  onClick={() => window.print()}
                >
                  <Download size={18} />
                  Save Receipt
                </button>
                <button 
                  className="success-btn outline"
                  onClick={() => {
                    if (transactionId) {
                      window.open(`${apiBaseUrl}/check-status/${transactionId}`, '_blank');
                    }
                  }}
                >
                  <ExternalLink size={18} />
                  Check Status
                </button>
              </div>
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
            Hi {formData.fullName}, please complete the payment to submit your registration
          </p>
          <div className="registration-note">
            <AlertCircle size={16} />
            <span>Note: Registration requires admin approval after payment</span>
          </div>
        </div>

        {paymentError && (
          <div className="error-alert">
            <AlertCircle size={20} />
            <span>{paymentError}</span>
          </div>
        )}

        <div className="payment-layout">
          <div className="form-section">
            <div className="form-card">
              <div className="payment-header">
                <h2 className="form-title">Payment Details</h2>
                <p className="form-subtitle">Total Amount: <span className="payment-amount">₹{totalAmount}</span></p>
              </div>

              <div className="payment-content">
                <div className="qr-section">
                  <h3 className="qr-title">Scan QR Code to Pay</h3>
                  <div className="qr-container">
                    <div className="qr-code-placeholder">
                      <div className="qr-image-container">
                        <img 
                          src="/iste-qr.jpg" 
                          alt="UPI Payment QR Code"
                          className="qr-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyRjJGMkYiIHJ4PSIxMCIvPjxwYXRoIGQ9Ik01MCA1MEgxNTBWMTUwSDUwVjUwWiIgZmlsbD0iIzQ5NDk0OSIvPjxwYXRoIGQ9Ik03MCA5MEg5MFYxMTBINzBWOTBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==';
                          }}
                        />
                        <div className="qr-amount-overlay">₹{totalAmount}</div>
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
                      placeholder="Enter Transaction ID (from your payment app) *"
                      value={transactionId}
                      onChange={(e) => {
                        setTransactionId(e.target.value);
                        setPaymentError('');
                      }}
                      required
                      className="modern-input"
                      minLength={3}
                      maxLength={50}
                    />
                  </div>
                  
                  <div className="payment-instructions">
                    <h4>Payment Instructions:</h4>
                    <ul>
                      <li>Scan the QR code with your UPI app</li>
                      <li>Complete the payment of <strong>₹{totalAmount}</strong></li>
                      <li>Copy the transaction ID from your payment app</li>
                      <li>Paste the transaction ID in the field above</li>
                      <li>Click "Submit Registration" to complete</li>
                    </ul>
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn payment-btn"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Submitting Registration...
                      </>
                    ) : (
                      <>
                        Submit Registration
                        <Send size={18} />
                      </>
                    )}
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn-secondary back-btn"
                    onClick={() => window.history.back()}
                  >
                    Go Back to Form
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
                  <span className="summary-label">Institution:</span>
                  <span className="summary-value">{formData.institution}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">College:</span>
                  <span className="summary-value">{formData.college}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Department:</span>
                  <span className="summary-value">
                    {formData.department === 'Other' ? formData.otherDepartment : formData.department}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Year:</span>
                  <span className="summary-value">{formData.year}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">ISTE Member:</span>
                  <span className="summary-value">{formData.isIsteMember}</span>
                </div>
                {formData.isteRegistrationNumber && (
                  <div className="summary-item">
                    <span className="summary-label">ISTE Reg. No:</span>
                    <span className="summary-value">{formData.isteRegistrationNumber}</span>
                  </div>
                )}
                <div className="summary-item">
                  <span className="summary-label">Accommodation:</span>
                  <span className="summary-value">
                    {formData.stayPreference === 'With Stay' 
                      ? `${formData.stayDays} day${formData.stayDays > 1 ? 's' : ''}` 
                      : 'No'}
                  </span>
                </div>
                <div className="summary-total">
                  <span className="total-label">Total Amount:</span>
                  <span className="total-value">₹{totalAmount}</span>
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