import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, Building2, Send, Calendar,
  MapPin, GraduationCap, CreditCard, BedDouble, 
  CheckCircle2, Loader2, AlertCircle, Clock, Download, ExternalLink
} from 'lucide-react';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [formError, setFormError] = useState('');
  const [emailError, setEmailError] = useState('');
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
    acknowledgement: false
  });

  // Direct API URL - Change this when deploying to production
  const API_BASE_URL = 'https://iste-backend-fcd3.onrender.com/api';

  // Function to check if email already exists
  const checkEmailExists = async (email) => {
    if (!email || email.length < 5) {
      console.log('Email too short, skipping check');
      return false;
    }
    
    try {
      console.log(`Checking email: ${email}`);
      const cleanEmail = email.toLowerCase().trim();
      
      const response = await fetch(`${API_BASE_URL}/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: cleanEmail }),
      });
      
      console.log('Response status:', response.status);
      
      const result = await response.json();
      console.log('Check email response:', result);
      
      if (!response.ok) {
        console.error('API error:', result.message);
        return false; // Don't block on API errors
      }
      
      return result.exists || false;
    } catch (error) {
      console.error('Network error checking email:', error);
      return false; // Don't block on network error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setEmailError('');

    // Validate email doesn't already exist
    if (formData.email) {
      setIsCheckingEmail(true);
      const emailExists = await checkEmailExists(formData.email);
      setIsCheckingEmail(false);

      if (emailExists) {
        setEmailError('This email is already registered. Please use a different email address.');
        return;
      }
    }

    setShowPayment(true);
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setFormError('');
    
    // Clear email error when user starts typing
    if (name === 'email') {
      setEmailError('');
    }
  };

  // Validate email when user leaves the field (on blur)
  const handleEmailBlur = async () => {
    const email = formData.email;
    if (!email || email.length < 5) return;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsCheckingEmail(true);
    console.log('Starting email check...');
    
    try {
      const emailExists = await checkEmailExists(email);
      console.log('Email exists result:', emailExists);
      
      if (emailExists) {
        setEmailError('This email is already registered. Please use a different email address.');
      } else {
        // Clear any previous error if email is available
        setEmailError('');
      }
    } catch (error) {
      console.error('Error in email validation:', error);
      // Don't show error for network issues, just let user proceed
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const calculateTotalAmount = () => {
    let total = 500; // Base registration fee
    if (formData.stayPreference === 'With Stay') total += 150;
    return total;
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // If payment page should be shown, render PaymentPage
  if (showPayment) {
    return <PaymentPage 
      formData={formData} 
      totalAmount={calculateTotalAmount()} 
      setIsSubmitting={setIsSubmitting}
      setFormError={setFormError}
      apiBaseUrl={API_BASE_URL}
      emailError={emailError}
      setEmailError={setEmailError}
    />;
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
                        minLength={3}
                      />
                    </div>

                    <div className="input-row">
                      <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <div className="email-input-container">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleEmailBlur}
                            required
                            className={`modern-input ${emailError ? 'error' : ''}`}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          />
                          {isCheckingEmail && (
                            <div className="email-checking">
                              <Loader2 className="animate-spin" size={16} />
                              <span>Checking availability...</span>
                            </div>
                          )}
                        </div>
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
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit phone number"
                        />
                      </div>
                    </div>

                    {emailError && (
                      <div className="email-error-alert">
                        <AlertCircle size={16} />
                        <span>{emailError}</span>
                      </div>
                    )}

                    <div className="button-group justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn-primary"
                        disabled={!!emailError || isCheckingEmail}
                      >
                        {isCheckingEmail ? 'Checking...' : 'Continue'}
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
                          <option value="First">First Year</option>
                          <option value="Second">Second Year</option>
                          <option value="Third">Third Year</option>
                          <option value="Fourth">Fourth Year</option>
                          <option value="Final">Final Year</option>
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
                          placeholder="ISTE Registration Number"
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
                        disabled={!!emailError}
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
                        <option value="With Stay">Yes, I need accommodation (₹150)</option>
                        <option value="Without Stay">No, I don't need accommodation</option>
                      </select>
                    </div>

                    <div className="charges-summary">
                      <div className="charges-content">
                        <h4>Payment Summary</h4>
                        <div className="charges-breakdown">
                          <div className="charge-item">
                            <span>Registration Fee:</span>
                            <span>₹500</span>
                          </div>
                          {formData.stayPreference === 'With Stay' && (
                            <div className="charge-item">
                              <span>Accommodation:</span>
                              <span>₹150</span>
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

                    {emailError && (
                      <div className="email-error-alert">
                        <AlertCircle size={16} />
                        <span>{emailError}</span>
                        <p className="email-error-hint">
                          Please go back to Step 1 and enter a different email address
                        </p>
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
                        disabled={!!emailError}
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
                        disabled={!formData.acknowledgement || isSubmitting || !!emailError}
                        className="submit-btn"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            Processing...
                          </>
                        ) : emailError ? (
                          'Email Already Registered'
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

          {/* Sidebar Info */}
          <div className="info-section">
            {/* Venue Map Card */}
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

            {/* Pricing Info Card */}
            <div className="info-card pricing-card">
              <div className="card-header">
                <h3 className="card-title">Registration Fee</h3>
              </div>
              <div className="pricing-details">
                <div className="price-item">
                  <span className="price-label">Normal Registration</span>
                  <span className="price-value">₹500</span>
                </div>
                <div className="price-item">
                  <span className="price-label">Accommodation (Optional)</span>
                  <span className="price-value">₹150</span>
                </div>
                <div className="price-total">
                  <span className="total-label">Total (with accommodation)</span>
                  <span className="total-value">₹650</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Page Component - Add duplicate check here too
const PaymentPage = ({ formData, totalAmount, setIsSubmitting, setFormError, apiBaseUrl, emailError, setEmailError }) => {
  const [transactionId, setTransactionId] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  // Check email again on payment page load
  useEffect(() => {
    const checkEmailOnLoad = async () => {
      if (!formData.email) return;
      
      setIsCheckingEmail(true);
      try {
        const cleanEmail = formData.email.toLowerCase().trim();
        console.log('Payment page: Checking email on load:', cleanEmail);
        
        const response = await fetch(`${apiBaseUrl}/check-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail }),
        });
        
        const result = await response.json();
        console.log('Payment page email check result:', result);
        
        if (result.exists) {
          setPaymentError('This email is already registered. Please go back and use a different email.');
        }
      } catch (error) {
        console.error('Error checking email in payment page:', error);
      } finally {
        setIsCheckingEmail(false);
      }
    };

    checkEmailOnLoad();
  }, [formData.email, apiBaseUrl]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    // Check email again before submitting
    setIsCheckingEmail(true);
    try {
      const cleanEmail = formData.email.toLowerCase().trim();
      console.log('Final email check before submission:', cleanEmail);
      
      const emailCheckResponse = await fetch(`${apiBaseUrl}/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });
      
      const emailCheckResult = await emailCheckResponse.json();
      console.log('Final email check result:', emailCheckResult);
      
      if (emailCheckResult.exists) {
        setPaymentError('This email is already registered. Please go back and use a different email.');
        setIsCheckingEmail(false);
        return;
      }
    } catch (error) {
      console.error('Error in final email check:', error);
      // Continue with submission if check fails (fail-safe)
    }
    setIsCheckingEmail(false);

    if (!transactionId.trim()) {
      setPaymentError('Please enter your transaction ID');
      return;
    }

    if (transactionId.length < 3) {
      setPaymentError('Transaction ID must be at least 3 characters');
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      const registrationData = {
        fullName: formData.fullName,
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone,
        college: formData.college,
        department: formData.department,
        year: formData.year,
        isIsteMember: formData.isIsteMember,
        isteRegistrationNumber: formData.isteRegistrationNumber || '',
        stayPreference: formData.stayPreference,
        totalAmount: totalAmount,
        transactionId: transactionId.trim()
      };

      console.log('Submitting registration:', registrationData);

      const response = await fetch(`${apiBaseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();
      console.log('Registration response:', result);

      if (response.ok && result.success) {
        setPaymentCompleted(true);
        setRegistrationId(result.data.registrationId || result.data.id);
        
      } else {
        // Check if error is due to duplicate email
        if (result.message?.toLowerCase().includes('already exists') || 
            result.message?.toLowerCase().includes('duplicate') ||
            result.message?.toLowerCase().includes('already registered')) {
          setPaymentError('This email is already registered. Please use a different email.');
        } else {
          const errorMessage = result.message || 'Registration failed. Please try again.';
          setPaymentError(errorMessage);
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      setPaymentError('Network error. Please check your internet connection and try again.');
    } finally {
      setIsProcessing(false);
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
                    <span className="detail-label">College:</span>
                    <span className="detail-value">{formData.college}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Department:</span>
                    <span className="detail-value">{formData.department}</span>
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
                    <span className="detail-value">{formData.stayPreference === 'With Stay' ? 'Yes (₹150)' : 'No'}</span>
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
              
              <div className="success-instructions">
                <h4>What happens next?</h4>
                <ol>
                  <li><strong>Admin Review:</strong> Our team will verify your payment and details</li>
                  <li><strong>Approval:</strong> You'll receive an email confirmation once approved</li>
                  <li><strong>Event Access:</strong> Approved registrations get access to all event activities</li>
                  <li><strong>Check Status:</strong> Use your Transaction ID to check approval status anytime</li>
                </ol>
                
                <div className="contact-info">
                  <p><strong>Need help?</strong> Contact: istembcet@example.com | Phone: +91 9876543210</p>
                </div>
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

        {(paymentError || emailError) && (
          <div className="error-alert">
            <AlertCircle size={20} />
            <span>{paymentError || emailError}</span>
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
                      placeholder="Enter Transaction ID (from your payment app)"
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
                      <li>Scan the QR code with your UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                      <li>Complete the payment of <strong>₹{totalAmount}</strong></li>
                      <li>Copy the transaction ID from your payment app</li>
                      <li>Paste the transaction ID in the field above</li>
                      <li>Click "Submit Registration" to complete your submission</li>
                    </ul>
                    <div className="payment-tip">
                      <strong>Important:</strong> Your registration will be <strong>pending admin approval</strong> after submission. You'll be notified via email once approved.
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn payment-btn"
                    disabled={isProcessing || isCheckingEmail || !!paymentError || !!emailError}
                  >
                    {isProcessing || isCheckingEmail ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        {isCheckingEmail ? 'Checking email...' : 'Submitting Registration...'}
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
                    {formData.stayPreference === 'With Stay' ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="summary-total">
                  <span className="total-label">Total Amount:</span>
                  <span className="total-value">₹{totalAmount}</span>
                </div>
              </div>
            </div>
            
            <div className="info-card status-card">
              <div className="card-header">
                <h3 className="card-title">Registration Process</h3>
              </div>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Complete Payment</h4>
                    <p>Scan QR and pay ₹{totalAmount}</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Submit Registration</h4>
                    <p>Enter transaction ID and submit</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Admin Review</h4>
                    <p>Status: <span className="status-text pending">Pending Approval</span></p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Get Confirmation</h4>
                    <p>Receive approval email within 24-48 hours</p>
                  </div>
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