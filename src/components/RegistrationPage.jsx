// import React, { useState, useEffect } from 'react';
// import { 
//   User, Mail, Phone, Building2, Send, Calendar,
//   MapPin, GraduationCap, CreditCard, BedDouble, 
//   CheckCircle2, Loader2, AlertCircle, Clock, Download, ExternalLink, School,
//   Users
// } from 'lucide-react';
// import './RegistrationPage.css';

// const RegistrationPage = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showPayment, setShowPayment] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formError, setFormError] = useState('');
//   const [stayAvailability, setStayAvailability] = useState({ available: true, remaining: 250 });
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     institution: '',
//     college: '',
//     department: '',
//     otherDepartment: '',
//     year: '',
//     isIsteMember: '',
//     isteRegistrationNumber: '',
//     stayPreference: '',
//     stayDates: [],
//     ambassadorCode: '', // NEW FIELD
//     acknowledgement: false
//   });

//   const API_BASE_URL = 'https://iste-backend-fcd3.onrender.com/api';

//   // Fetch stay availability on component mount
//   useEffect(() => {
//     fetchStayAvailability();
//   }, []);

//   const fetchStayAvailability = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/stay-availability`);
//       if (response.ok) {
//         const data = await response.json();
//         setStayAvailability(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching stay availability:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError('');

//     // Validate all required fields
//     const requiredFields = [
//       'fullName', 'email', 'phone', 'institution', 'college', 
//       'department', 'year', 'isIsteMember', 'stayPreference'
//     ];
    
//     const missingFields = requiredFields.filter(field => !formData[field]);
    
//     if (missingFields.length > 0) {
//       setFormError(`Please fill all required fields`);
//       return;
//     }

//     // Validate institution
//     if (!formData.institution) {
//       setFormError('Please select institution type');
//       return;
//     }

//     // Validate department - if "Other" is selected, check otherDepartment
//     if (formData.department === 'Other' && !formData.otherDepartment.trim()) {
//       setFormError('Please specify your department name when selecting "Other"');
//       return;
//     }

//     // Validate stayDates only if With Stay is selected
//     if (formData.stayPreference === 'With Stay') {
//       if (!formData.stayDates || formData.stayDates.length === 0) {
//         setFormError('Please select stay dates');
//         return;
//       }
      
//       // Check if stay is still available
//       if (!stayAvailability.available) {
//         setFormError('Stay accommodation is no longer available');
//         return;
//       }
//     }

//     // Validate email format only (no duplication check here)
//     if (formData.email) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email.toLowerCase().trim())) {
//         setFormError('Please enter a valid email address');
//         return;
//       }
//     }

//     setShowPayment(true);
//   };

//   const handleChange = async (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === 'checkbox' ? checked : value;
    
//     setFormData(prev => {
//       const updated = { ...prev, [name]: newValue };
      
//       // Reset stayDates when stayPreference changes
//       if (name === 'stayPreference') {
//         if (value === 'Without Stay') {
//           updated.stayDates = [];
//         } else if (value === 'With Stay' && (!prev.stayDates || prev.stayDates.length === 0)) {
//           updated.stayDates = [];
//         }
//       }
      
//       // Reset otherDepartment when department changes from "Other"
//       if (name === 'department' && value !== 'Other') {
//         updated.otherDepartment = '';
//       }
      
//       return updated;
//     });
    
//     setFormError('');
//   };

//   const calculateTotalAmount = () => {
//     // Determine base fee based on institution and ISTE membership
//     let baseFee;
//     if (formData.institution === 'Polytechnic') {
//       baseFee = formData.isIsteMember === 'Yes' ? 250 : 300; // UPDATED PRICING
//     } else {
//       // Engineering students
//       baseFee = formData.isIsteMember === 'Yes' ? 450 : 500;
//     }
    
//     let total = baseFee;
    
//     if (formData.stayPreference === 'With Stay' && formData.stayDates.length > 0) {
//       total += (217 * formData.stayDates.length); // ₹217 per day
//     }
    
//     return total;
//   };

//   const calculateBaseFee = () => {
//     if (formData.institution === 'Polytechnic') {
//       return formData.isIsteMember === 'Yes' ? 250 : 300; // UPDATED PRICING
//     }
//     // Engineering students
//     return formData.isIsteMember === 'Yes' ? 450 : 500;
//   };

//   const handleDateSelect = (date) => {
//     if (formData.stayPreference !== 'With Stay') return;
    
//     setFormData(prev => {
//       const dates = [...prev.stayDates];
      
//       // Create a standardized date string to avoid timezone issues
//       const standardizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
//       const dateString = standardizedDate.toISOString();
      
//       if (dates.includes(dateString)) {
//         // Remove date if already selected
//         return {
//           ...prev,
//           stayDates: dates.filter(d => d !== dateString)
//         };
//       } else {
//         // Add date if not already selected and within limit
//         if (dates.length < 3) { // Max 3 days (29, 30, 31)
//           return {
//             ...prev,
//             stayDates: [...dates, dateString]
//           };
//         }
//         return prev;
//       }
//     });
//   };

//   // Event dates - UPDATED TO 2026
//   const eventDates = [
//     new Date(2026, 0, 29), // January 29, 2026
//     new Date(2026, 0, 30), // January 30, 2026
//     new Date(2026, 0, 31)  // January 31, 2026
//   ];

//   const nextStep = () => {
//     if (currentStep === 1) {
//       if (!formData.fullName.trim()) {
//         setFormError('Please enter your full name');
//         return;
//       }
//       if (!formData.email.trim()) {
//         setFormError('Please enter your email address');
//         return;
//       }
//       if (!formData.phone.trim()) {
//         setFormError('Please enter your phone number');
//         return;
//       }
//     }
    
//     if (currentStep === 2) {
//       if (!formData.institution) {
//         setFormError('Please select institution type');
//         return;
//       }
//       if (!formData.college.trim()) {
//         setFormError('Please enter college name');
//         return;
//       }
//       if (!formData.department) {
//         setFormError('Please select department');
//         return;
//       }
//       if (formData.department === 'Other' && !formData.otherDepartment.trim()) {
//         setFormError('Please specify your department name');
//         return;
//       }
//       if (!formData.year) {
//         setFormError('Please select academic year');
//         return;
//       }
//       if (!formData.isIsteMember) {
//         setFormError('Please select ISTE membership status');
//         return;
//       }
//       if (formData.isIsteMember === 'Yes' && !formData.isteRegistrationNumber.trim()) {
//         setFormError('Please enter ISTE registration number');
//         return;
//       }
//     }
    
//     if (currentStep === 3) {
//       if (!formData.stayPreference) {
//         setFormError('Please select accommodation preference');
//         return;
//       }
//       if (formData.stayPreference === 'With Stay') {
//         if (!formData.stayDates || formData.stayDates.length === 0) {
//           setFormError('Please select stay dates');
//           return;
//         }
//       }
//     }
    
//     if (currentStep < 3) setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   if (showPayment) {
//     return <PaymentPage 
//       formData={formData} 
//       totalAmount={calculateTotalAmount()} 
//       setIsSubmitting={setIsSubmitting}
//       setFormError={setFormError}
//       apiBaseUrl={API_BASE_URL}
//       stayAvailability={stayAvailability}
//     />;
//   }

//   return (
//     <div className="registration-container">
//       <div className="bg-shapes">
//         <div className="shape shape-1"></div>
//         <div className="shape shape-2"></div>
//         <div className="shape shape-3"></div>
//       </div>

//       <div className="registration-content">
//         <div className="registration-header">
//           <h1 className="main-heading">
//             Register for <span className="gradient-text">NEXORA</span>
//           </h1>
//           <p className="header-description">
//             Join Kerala's premier technical convention. Limited seats available.
//           </p>
//           <div className="registration-note">
//             <AlertCircle size={16} />
//             <span>Each email can only be used for one registration</span>
//           </div>
//         </div>

//         {formError && (
//           <div className="error-alert">
//             <AlertCircle size={20} />
//             <span>{formError}</span>
//           </div>
//         )}

//         <div className="registration-layout">
//           <div className="form-section">
//             <div className="form-card">
//               <div className="progress-steps">
//                 {[1, 2, 3].map((step) => (
//                   <React.Fragment key={step}>
//                     <div className="step-container">
//                       <div className={`step-indicator ${currentStep >= step ? 'active' : 'inactive'}`}>
//                         {currentStep > step ? <CheckCircle2 size={20} /> : step}
//                       </div>
//                       <span className={`step-label ${currentStep >= step ? 'text-white' : 'text-gray-500'}`}>
//                         {step === 1 && 'Personal'}
//                         {step === 2 && 'Academic'}
//                         {step === 3 && 'Services'}
//                       </span>
//                     </div>
//                     {step < 3 && (
//                       <div className={`step-connector ${currentStep > step ? 'active' : 'inactive'}`}></div>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </div>

//               <form onSubmit={handleSubmit}>
//                 {currentStep === 1 && (
//                   <div className="form-step">
//                     <h3 className="step-title">Personal Information</h3>
                    
//                     <div className="input-group">
//                       <User className="input-icon" size={20} />
//                       <input
//                         type="text"
//                         name="fullName"
//                         placeholder="Full Name *"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         required
//                         className="modern-input"
//                         minLength={3}
//                       />
//                     </div>

//                     <div className="input-row">
//                       <div className="input-group">
//                         <Mail className="input-icon" size={20} />
//                         <input
//                           type="email"
//                           name="email"
//                           placeholder="Email Address *"
//                           value={formData.email}
//                           onChange={handleChange}
//                           required
//                           className="modern-input"
//                         />
//                       </div>

//                       <div className="input-group">
//                         <Phone className="input-icon" size={20} />
//                         <input
//                           type="tel"
//                           name="phone"
//                           placeholder="Phone Number *"
//                           value={formData.phone}
//                           onChange={handleChange}
//                           required
//                           className="modern-input"
//                           pattern="[0-9]{10}"
//                           title="Please enter a valid 10-digit phone number"
//                         />
//                       </div>
//                     </div>

//                     <div className="button-group justify-end">
//                       <button
//                         type="button"
//                         onClick={nextStep}
//                         className="btn-primary"
//                         disabled={!formData.fullName || !formData.email || !formData.phone}
//                       >
//                         Continue
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {currentStep === 2 && (
//                   <div className="form-step">
//                     <h3 className="step-title">Academic Information</h3>
                    
//                     <div className="input-group">
//                       <School className="input-icon" size={20} />
//                       <select
//                         name="institution"
//                         value={formData.institution}
//                         onChange={handleChange}
//                         required
//                         className="modern-input"
//                       >
//                         <option value="">Select Institution Type *</option>
//                         <option value="Engineering">Engineering College (₹500 base fee, ₹450 for ISTE members)</option>
//                         <option value="Polytechnic">Polytechnic College (₹300 base fee, ₹250 for ISTE members)</option> {/* UPDATED */}
//                       </select>
//                     </div>

//                     <div className="input-group">
//                       <Building2 className="input-icon" size={20} />
//                       <input
//                         type="text"
//                         name="college"
//                         placeholder="College/University Name *"
//                         value={formData.college}
//                         onChange={handleChange}
//                         required
//                         className="modern-input"
//                       />
//                     </div>

//                     <div className="input-row">
//                       <div className="input-group">
//                         <GraduationCap className="input-icon" size={20} />
//                         <select
//                           name="department"
//                           value={formData.department}
//                           onChange={handleChange}
//                           required
//                           className="modern-input"
//                         >
//                           <option value="">Select Department *</option>
//                           <option value="Computer Science">Computer Science & Engineering</option>
//                           <option value="Electronics">Electronics & Communication</option>
//                           <option value="Mechanical">Mechanical Engineering</option>
//                           <option value="Civil">Civil Engineering</option>
//                           <option value="Electrical">Electrical Engineering</option>
//                           <option value="Other">Other Department</option>
//                         </select>
//                       </div>

//                       <div className="input-group">
//                         <Calendar className="input-icon" size={20} />
//                         <select
//                           name="year"
//                           value={formData.year}
//                           onChange={handleChange}
//                           required
//                           className="modern-input"
//                         >
//                           <option value="">Academic Year *</option>
//                           <option value="First">First Year</option>
//                           <option value="Second">Second Year</option>
//                           <option value="Third">Third Year</option>
//                           <option value="Fourth">Fourth Year</option>
//                           <option value="Final">Final Year</option>
//                         </select>
//                       </div>
//                     </div>

//                     {formData.department === 'Other' && (
//                       <div className="input-group">
//                         <GraduationCap className="input-icon" size={20} />
//                         <input
//                           type="text"
//                           name="otherDepartment"
//                           placeholder="Please specify your department name *"
//                           value={formData.otherDepartment}
//                           onChange={handleChange}
//                           required={formData.department === 'Other'}
//                           className="modern-input"
//                         />
//                       </div>
//                     )}

//                     <div className="input-group">
//                       <CreditCard className="input-icon" size={20} />
//                       <select
//                         name="isIsteMember"
//                         value={formData.isIsteMember}
//                         onChange={handleChange}
//                         required
//                         className="modern-input"
//                       >
//                         <option value="">Are you an ISTE member? *</option>
//                         <option value="Yes">Yes, I am an ISTE member</option>
//                         <option value="No">No, I am not an ISTE member</option>
//                       </select>
//                     </div>

//                     {formData.isIsteMember === 'Yes' && (
//                       <div className="input-group">
//                         <CreditCard className="input-icon" size={20} />
//                         <input
//                           type="text"
//                           name="isteRegistrationNumber"
//                           placeholder="ISTE Registration Number *"
//                           value={formData.isteRegistrationNumber}
//                           onChange={handleChange}
//                           required={formData.isIsteMember === 'Yes'}
//                           className="modern-input"
//                         />
//                       </div>
//                     )}

//                     <div className="button-group">
//                       <button
//                         type="button"
//                         onClick={prevStep}
//                         className="btn-secondary"
//                       >
//                         Back
//                       </button>
//                       <button
//                         type="button"
//                         onClick={nextStep}
//                         className="btn-primary"
//                         disabled={
//                           !formData.institution || 
//                           !formData.college || 
//                           !formData.department || 
//                           (formData.department === 'Other' && !formData.otherDepartment.trim()) ||
//                           !formData.year || 
//                           !formData.isIsteMember
//                         }
//                       >
//                         Continue
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {currentStep === 3 && (
//                   <div className="form-step">
//                     <h3 className="step-title">Additional Services</h3>
                    
//                     <div className="input-group">
//                       <BedDouble className="input-icon" size={20} />
//                       <select
//                         name="stayPreference"
//                         value={formData.stayPreference}
//                         onChange={handleChange}
//                         required
//                         className="modern-input"
//                         disabled={!stayAvailability.available && stayAvailability.remaining === 0}
//                       >
//                         <option value="">Do you require accommodation? *</option>
//                         <option value="With Stay" disabled={!stayAvailability.available}>
//                           {stayAvailability.available 
//                             ? `Yes, I need accommodation (₹217/day) - ${stayAvailability.remaining} spots left`
//                             : 'Accommodation full - No spots available'}
//                         </option>
//                         <option value="Without Stay">No, I don't need accommodation</option>
//                       </select>
//                     </div>

//                     {formData.stayPreference === 'With Stay' && stayAvailability.available && (
//                       <div className="calendar-container">
//                         <div className="calendar-header">
//                           <h4>Select Stay Dates (January 2026)</h4>
//                           <div className="calendar-info">
//                             <span className="selected-dates-count">
//                               Selected: {formData.stayDates.length} day{formData.stayDates.length !== 1 ? 's' : ''}
//                             </span>
//                             <span className="date-price">₹217 per day</span>
//                           </div>
//                         </div>
                        
//                         <div className="calendar-grid">
//                           {['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'].map(day => (
//                             <div key={day} className="calendar-day-header">{day}</div>
//                           ))}
                          
//                           {/* Generate calendar for January 2026 */}
//                           {Array.from({ length: 31 }, (_, i) => {
//                             const date = new Date(2026, 0, i + 1); // January 2026
//                             const dateString = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
//                             const isEventDate = eventDates.some(eventDate => 
//                               eventDate.getDate() === date.getDate() && 
//                               eventDate.getMonth() === date.getMonth() &&
//                               eventDate.getFullYear() === date.getFullYear()
//                             );
//                             const isSelected = formData.stayDates.includes(dateString);
//                             const isSelectable = isEventDate;
                            
//                             return (
//                               <div 
//                                 key={i}
//                                 className={`calendar-day 
//                                   ${isSelectable ? 'selectable' : 'non-event'} 
//                                   ${isSelected ? 'selected' : ''}
//                                   ${!isEventDate ? 'disabled' : ''}`}
//                                 onClick={() => isSelectable && handleDateSelect(date)}
//                               >
//                                 <span className="day-number">{i + 1}</span>
//                                 {isEventDate && <span className="event-indicator">Event Day</span>}
//                                 {isSelected && <div className="selected-indicator">✓</div>}
//                               </div>
//                             );
//                           })}
//                         </div>
                        
//                         <div className="calendar-legends">
//                           <div className="legend-item">
//                             <div className="legend-color event-day"></div>
//                             <span>Event Day (29, 30, 31 Jan 2026)</span>
//                           </div>
//                           <div className="legend-item">
//                             <div className="legend-color selected-day"></div>
//                             <span>Selected for stay</span>
//                           </div>
//                         </div>
                        
//                         {formData.stayDates.length > 0 && (
//                           <div className="selected-dates-summary">
//                             <h5>Your Stay Dates:</h5>
//                             <div className="dates-list">
//                               {formData.stayDates.map(dateStr => {
//                                 const date = new Date(dateStr);
//                                 return (
//                                   <div key={dateStr} className="date-chip">
//                                     {date.toLocaleDateString('en-IN', { 
//                                       weekday: 'short', 
//                                       day: 'numeric', 
//                                       month: 'short',
//                                       year: 'numeric'
//                                     })}
//                                     <button
//                                       type="button"
//                                       className="remove-date"
//                                       onClick={() => handleDateSelect(date)}
//                                     >
//                                       ×
//                                     </button>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                             <div className="stay-total">
//                               <span>Accommodation Cost:</span>
//                               <span className="stay-amount">
//                                 ₹{formData.stayDates.length} × 217 = ₹{217 * formData.stayDates.length}
//                               </span>
//                             </div>
//                           </div>
//                         )}
                        
//                         <div className="stay-availability-info">
//                           <AlertCircle size={16} />
//                           <span>
//                             Only {stayAvailability.remaining} stay spots remaining. 
//                             First come, first served basis.
//                           </span>
//                         </div>
//                       </div>
//                     )}

//                     {/* NEW AMBASSADOR CODE FIELD */}
//                     <div className="input-group">
//                       <Users className="input-icon" size={20} />
//                       <input
//                         type="text"
//                         name="ambassadorCode"
//                         placeholder="Campus Ambassador Code (Optional)"
//                         value={formData.ambassadorCode}
//                         onChange={handleChange}
//                         className="modern-input"
//                       />
//                       <div className="optional-note">
//                         <span className="optional-text">Optional - Enter if you have a campus ambassador referral code</span>
//                       </div>
//                     </div>

//                     <div className="charges-summary">
//                       <div className="charges-content">
//                         <h4>Payment Summary</h4>
//                         <div className="charges-breakdown">
//                           <div className="charge-item">
//                             <span>
//                               Registration Fee ({formData.institution}):
//                               {formData.isIsteMember === 'Yes' && ' (ISTE Member Discount Applied)'}
//                             </span>
//                             <span>
//                               ₹{calculateBaseFee()}
//                             </span>
//                           </div>
//                           {formData.stayPreference === 'With Stay' && formData.stayDates.length > 0 && (
//                             <div className="charge-item">
//                               <span>Accommodation ({formData.stayDates.length} day{formData.stayDates.length > 1 ? 's' : ''}):</span>
//                               <span>₹{217 * formData.stayDates.length}</span>
//                             </div>
//                           )}
//                           <div className="charge-total">
//                             <span>Total Amount:</span>
//                             <span className="total-amount">₹{calculateTotalAmount()}</span>
//                           </div>
//                         </div>
//                         {formData.isIsteMember === 'Yes' && (
//                           <small className="charges-note discount-note">
//                             You're getting a discount for being an ISTE member!
//                           </small>
//                         )}
//                         <small className="charges-note">Payment details will be shown on next page</small>
//                       </div>
//                     </div>

//                     <label className="checkbox-group">
//                       <input
//                         type="checkbox"
//                         name="acknowledgement"
//                         checked={formData.acknowledgement}
//                         onChange={handleChange}
//                         required
//                         className="checkbox-input"
//                       />
//                       <span className="checkmark"></span>
//                       <span className="checkbox-text">
//                         I confirm that all information provided is accurate and agree to pay ₹{calculateTotalAmount()} for registration.
//                       </span>
//                     </label>

//                     <div className="button-group">
//                       <button
//                         type="button"
//                         onClick={prevStep}
//                         className="btn-secondary"
//                       >
//                         Back
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={
//                           !formData.acknowledgement || 
//                           isSubmitting || 
//                           !formData.stayPreference || 
//                           (formData.stayPreference === 'With Stay' && formData.stayDates.length === 0)
//                         }
//                         className="submit-btn"
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <Loader2 className="animate-spin" size={18} />
//                             Processing...
//                           </>
//                         ) : (
//                           <>
//                             Proceed to Payment
//                             <Send size={18} />
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>

//           <div className="info-section">
//             <div className="info-card">
//               <div className="card-header">
//                 <h3 className="card-title">Venue Location</h3>
//               </div>
              
//               <div className="map-container">
//                 <div className="map-overlay"></div>
//                 <div className="map-marker" onClick={() => window.open('https://maps.app.goo.gl/p8PJqvzm5Ug9T4LNA', '_blank')} title="Click to open in Google Maps">
//                   <div className="marker-dot"></div>
//                 </div>
//               </div>
              
//               <div className="location-info">
//                 <p className="location-text">
//                   Mar Baselios College of Engineering and Technology
//                 </p>
//               </div>
//             </div>

//             <div className="info-card pricing-card">
//               <div className="card-header">
//                 <h3 className="card-title">Registration Fee</h3>
//               </div>
//               <div className="pricing-details">
//                 <div className="price-item">
//                   <span className="price-label">Engineering College (Non-ISTE)</span>
//                   <span className="price-value">₹500</span>
//                 </div>
//                 <div className="price-item">
//                   <span className="price-label">Engineering College (ISTE Member)</span>
//                   <span className="price-value">₹450</span>
//                 </div>
//                 <div className="price-item">
//                   <span className="price-label">Polytechnic College (Non-ISTE)</span>
//                   <span className="price-value">₹300</span> {/* UPDATED */}
//                 </div>
//                 <div className="price-item">
//                   <span className="price-label">Polytechnic College (ISTE Member)</span>
//                   <span className="price-value">₹250</span> {/* UPDATED */}
//                 </div>
//                 <div className="price-item">
//                   <span className="price-label">Accommodation (per day)</span>
//                   <span className="price-value">₹217</span>
//                 </div>
//                 <div className="stay-availability-badge">
//                   <BedDouble size={14} />
//                   <span>Stay spots left: {stayAvailability.remaining}</span>
//                 </div>
//                 <div className="ambassador-note">
//                   <AlertCircle size={14} />
//                   <span>Campus Ambassador codes are optional</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PaymentPage = ({ formData, totalAmount, setIsSubmitting, setFormError, apiBaseUrl, stayAvailability }) => {
//   const [transactionId, setTransactionId] = useState('');
//   const [paymentCompleted, setPaymentCompleted] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentError, setPaymentError] = useState('');
//   const [registrationId, setRegistrationId] = useState('');
//   const [isButtonPressed, setIsButtonPressed] = useState(false);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, []);

//   // Add effect to clear button pressed state
//   useEffect(() => {
//     if (isButtonPressed) {
//       const timer = setTimeout(() => setIsButtonPressed(false), 300);
//       return () => clearTimeout(timer);
//     }
//   }, [isButtonPressed]);

//   // Function to create ripple effect
//   const createRipple = (event) => {
//     const button = event.currentTarget;
//     const circle = document.createElement("span");
//     const diameter = Math.max(button.clientWidth, button.clientHeight);
//     const radius = diameter / 2;

//     circle.style.width = circle.style.height = `${diameter}px`;
//     circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
//     circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
//     circle.classList.add("btn-ripple");

//     const ripple = button.getElementsByClassName("btn-ripple")[0];

//     if (ripple) {
//       ripple.remove();
//     }

//     button.appendChild(circle);
//   };

//   const handlePaymentSubmit = async (e) => {
//     e.preventDefault();
    
//     // Add button press animation
//     setIsButtonPressed(true);
//     createRipple(e);
    
//     if (formData.stayPreference === 'With Stay') {
//       if (!formData.stayDates || formData.stayDates.length === 0) {
//         setPaymentError('Please select stay dates');
//         setIsButtonPressed(false);
//         return;
//       }
      
//       // Check stay capacity again
//       if (!stayAvailability.available) {
//         setPaymentError('Stay accommodation is no longer available');
//         setIsButtonPressed(false);
//         return;
//       }
//     }

//     if (!transactionId.trim()) {
//       setPaymentError('Please enter your transaction ID');
//       setIsButtonPressed(false);
//       return;
//     }

//     if (transactionId.length < 3) {
//       setPaymentError('Transaction ID must be at least 3 characters');
//       setIsButtonPressed(false);
//       return;
//     }

//     if (!formData.institution) {
//       setPaymentError('Institution type is required');
//       setIsButtonPressed(false);
//       return;
//     }

//     if (formData.department === 'Other' && !formData.otherDepartment.trim()) {
//       setPaymentError('Please specify your department name');
//       setIsButtonPressed(false);
//       return;
//     }

//     setIsProcessing(true);
//     setPaymentError('');

//     try {
//       // EMAIL DUPLICATION CHECK HAPPENS HERE AT REGISTRATION TIME
//       // First check if email already exists
//       const emailCheckResponse = await fetch(`${apiBaseUrl}/check-email`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: formData.email.toLowerCase().trim() }),
//       });
      
//       const emailCheckResult = await emailCheckResponse.json();
      
//       if (emailCheckResult.exists) {
//         setPaymentError('This email is already registered. Please go back and use a different email address.');
//         setIsProcessing(false);
//         setIsButtonPressed(false);
//         return;
//       }

//       // Calculate base fee for backend
//       const calculateBaseFee = () => {
//         if (formData.institution === 'Polytechnic') {
//           return formData.isIsteMember === 'Yes' ? 250 : 300; // UPDATED PRICING
//         }
//         // Engineering students
//         return formData.isIsteMember === 'Yes' ? 450 : 500;
//       };

//       // Prepare registration data with properly formatted dates
//       const registrationData = {
//         fullName: formData.fullName.trim(),
//         email: formData.email.toLowerCase().trim(),
//         phone: formData.phone.trim(),
//         institution: formData.institution.trim(),
//         college: formData.college.trim(),
//         department: formData.department,
//         otherDepartment: formData.department === 'Other' ? formData.otherDepartment.trim() : '',
//         year: formData.year,
//         isIsteMember: formData.isIsteMember,
//         isteRegistrationNumber: formData.isteRegistrationNumber ? formData.isteRegistrationNumber.trim() : '',
//         stayPreference: formData.stayPreference,
//         stayDates: formData.stayPreference === 'With Stay' ? 
//           formData.stayDates.map(dateStr => {
//             // Ensure consistent date format - use ISO string
//             const date = new Date(dateStr);
//             // Set to UTC midnight to avoid timezone issues
//             const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
//             return utcDate.toISOString();
//           }) : [],
//         stayDays: formData.stayPreference === 'With Stay' ? formData.stayDates.length : 0,
//         ambassadorCode: formData.ambassadorCode ? formData.ambassadorCode.trim() : '', // NEW FIELD
//         baseFee: calculateBaseFee(),
//         totalAmount: totalAmount,
//         transactionId: transactionId.trim()
//       };

//       console.log('📅 Sending stay dates:', registrationData.stayDates);
//       console.log('📋 Registration data being sent:', registrationData);

//       const response = await fetch(`${apiBaseUrl}/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(registrationData),
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         setPaymentCompleted(true);
//         setRegistrationId(result.data.registrationId || result.data.id);
//       } else {
//         const errorMessage = result.message || 'Registration failed. Please try again.';
//         setPaymentError(errorMessage);
        
//         console.error('Registration failed:', result);
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       setPaymentError('Network error. Please check your internet connection and try again.');
//     } finally {
//       setIsProcessing(false);
//       setIsButtonPressed(false);
//     }
//   };

//   const generateReceipt = () => {
//     // Create a new window for printing
//     const receiptWindow = window.open('', '_blank');
    
//     const receiptContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>NEXORA Registration Receipt</title>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
//           * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//           }
          
//           body {
//             font-family: 'Inter', sans-serif;
//             background: white;
//             color: #333;
//             padding: 30px;
//             max-width: 800px;
//             margin: 0 auto;
//           }
          
//           .receipt-container {
//             background: white;
//             border: 2px solid #e5e7eb;
//             border-radius: 12px;
//             padding: 40px;
//             box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           }
          
//           .header {
//             text-align: center;
//             margin-bottom: 40px;
//             padding-bottom: 20px;
//             border-bottom: 2px solid #4A90E2;
//           }
          
//           .event-title {
//             font-size: 32px;
//             font-weight: 800;
//             color: #1a1a1a;
//             margin-bottom: 8px;
//             background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//             background-clip: text;
//           }
          
//           .event-subtitle {
//             font-size: 18px;
//             color: #666;
//             margin-bottom: 16px;
//           }
          
//           .status-badge {
//             display: inline-block;
//             background: #fbbf24;
//             color: #78350f;
//             padding: 8px 20px;
//             border-radius: 20px;
//             font-weight: 600;
//             font-size: 14px;
//             margin-bottom: 10px;
//           }
          
//           .receipt-id {
//             font-size: 14px;
//             color: #666;
//             font-weight: 500;
//           }
          
//           .receipt-id strong {
//             color: #4A90E2;
//           }
          
//           .details-section {
//             margin-bottom: 40px;
//           }
          
//           .section-title {
//             font-size: 20px;
//             font-weight: 700;
//             color: #1a1a1a;
//             margin-bottom: 20px;
//             padding-bottom: 10px;
//             border-bottom: 1px solid #e5e7eb;
//           }
          
//           .details-grid {
//             display: grid;
//             grid-template-columns: repeat(2, 1fr);
//             gap: 20px;
//             margin-bottom: 20px;
//           }
          
//           .detail-item {
//             display: flex;
//             flex-direction: column;
//             gap: 4px;
//           }
          
//           .detail-label {
//             font-size: 14px;
//             color: #666;
//             font-weight: 500;
//           }
          
//           .detail-value {
//             font-size: 16px;
//             color: #1a1a1a;
//             font-weight: 600;
//           }
          
//           .amount-section {
//             background: #f8fafc;
//             border-radius: 12px;
//             padding: 30px;
//             margin: 30px 0;
//             border: 1px solid #e5e7eb;
//           }
          
//           .amount-row {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             padding: 12px 0;
//             border-bottom: 1px solid #e5e7eb;
//           }
          
//           .amount-row:last-child {
//             border-bottom: none;
//           }
          
//           .amount-label {
//             font-size: 16px;
//             color: #4b5563;
//           }
          
//           .amount-value {
//             font-size: 16px;
//             color: #1a1a1a;
//             font-weight: 500;
//           }
          
//           .total-row {
//             padding-top: 15px;
//             margin-top: 15px;
//             border-top: 2px solid #4A90E2;
//           }
          
//           .total-label {
//             font-size: 20px;
//             font-weight: 700;
//             color: #1a1a1a;
//           }
          
//           .total-value {
//             font-size: 24px;
//             font-weight: 800;
//             color: #4A90E2;
//           }
          
//           .footer {
//             margin-top: 40px;
//             padding-top: 20px;
//             border-top: 1px solid #e5e7eb;
//             text-align: center;
//           }
          
//           .footer-note {
//             font-size: 14px;
//             color: #666;
//             margin-bottom: 10px;
//             line-height: 1.6;
//           }
          
//           .contact-info {
//             font-size: 14px;
//             color: #4b5563;
//             margin-top: 20px;
//           }
          
//           .watermark {
//             opacity: 0.1;
//             position: fixed;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%) rotate(-45deg);
//             font-size: 120px;
//             font-weight: 900;
//             color: #4A90E2;
//             pointer-events: none;
//             z-index: -1;
//             white-space: nowrap;
//           }
          
//           @media print {
//             body {
//               padding: 0;
//             }
            
//             .receipt-container {
//               border: none;
//               box-shadow: none;
//               padding: 20px;
//             }
            
//             .watermark {
//               opacity: 0.05;
//             }
            
//             @page {
//               margin: 20mm;
//               size: A4;
//             }
//           }
          
//           @media (max-width: 768px) {
//             body {
//               padding: 15px;
//             }
            
//             .receipt-container {
//               padding: 20px;
//             }
            
//             .event-title {
//               font-size: 24px;
//             }
            
//             .details-grid {
//               grid-template-columns: 1fr;
//             }
            
//             .watermark {
//               font-size: 80px;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="watermark">NEXORA 2026</div>
//         <div class="receipt-container">
//           <div class="header">
//             <h1 class="event-title">NEXORA 2026</h1>
//             <p class="event-subtitle">ISTE INDUSTRY 5.0 - Registration Receipt</p>
//             <p class="receipt-id">
//               <strong>Transaction ID:</strong> ${transactionId} | 
//               <strong>Reference:</strong> ${registrationId || 'Pending...'}
//             </p>
//           </div>
          
//           <div class="details-section">
//             <h2 class="section-title">Registration Details</h2>
//             <div class="details-grid">
//               <div class="detail-item">
//                 <span class="detail-label">Full Name</span>
//                 <span class="detail-value">${formData.fullName}</span>
//               </div>
//               <div class="detail-item">
//                 <span class="detail-label">Email Address</span>
//                 <span class="detail-value">${formData.email}</span>
//               </div>
//               <div class="detail-item">
//                 <span class="detail-label">Phone Number</span>
//                 <span class="detail-value">${formData.phone}</span>
//               </div>
//               <div class="detail-item">
//                 <span class="detail-label">Institution Type</span>
//                 <span class="detail-value">${formData.institution}</span>
//               </div>
//               <div class="detail-item">
//                 <span class="detail-label">College</span>
//                 <span class="detail-value">${formData.college}</span>
//               </div>
//               <div class="detail-item">
//                 <span class="detail-label">Department</span>
//                 <span class="detail-value">
//                   ${formData.department === 'Other' ? formData.otherDepartment : formData.department}
//                 </span>
//               </div>
//               <div class="detail-item">
//                 <span class="detail-label">Academic Year</span>
//                 <span class="detail-value">${formData.year}</span>
//               </div>
//               <div class="detail-item">
//                 <span class="detail-label">ISTE Member</span>
//                 <span class="detail-value">${formData.isIsteMember}</span>
//               </div>
//               ${formData.isteRegistrationNumber ? `
//               <div class="detail-item">
//                 <span class="detail-label">ISTE Reg. Number</span>
//                 <span class="detail-value">${formData.isteRegistrationNumber}</span>
//               </div>
//               ` : ''}
//               <div class="detail-item">
//                 <span class="detail-label">Accommodation</span>
//                 <span class="detail-value">
//                   ${formData.stayPreference === 'With Stay' 
//                     ? `Yes (${formData.stayDates.length} day${formData.stayDates.length > 1 ? 's' : ''})` 
//                     : 'No'}
//                 </span>
//               </div>
//               ${formData.stayDates && formData.stayDates.length > 0 ? `
//               <div class="detail-item" style="grid-column: 1 / -1;">
//                 <span class="detail-label">Stay Dates</span>
//                 <span class="detail-value">
//                   ${formData.stayDates.map(dateStr => {
//                     const date = new Date(dateStr);
//                     return date.toLocaleDateString('en-IN', { 
//                       weekday: 'short', 
//                       day: 'numeric', 
//                       month: 'short',
//                       year: 'numeric'
//                     });
//                   }).join(', ')}
//                 </span>
//               </div>
//               ` : ''}
//               ${formData.ambassadorCode ? `
//               <div class="detail-item">
//                 <span class="detail-label">Ambassador Code</span>
//                 <span class="detail-value">${formData.ambassadorCode}</span>
//               </div>
//               ` : ''}
//             </div>
//           </div>
          
//           <div class="amount-section">
//             <h2 class="section-title">Payment Summary</h2>
//             <div class="amount-row">
//               <span class="amount-label">Registration Fee (${formData.institution})</span>
//               <span class="amount-value">
//                 ₹${formData.institution === 'Polytechnic' 
//                   ? (formData.isIsteMember === 'Yes' ? '250' : '300') // UPDATED
//                   : (formData.isIsteMember === 'Yes' ? '450' : '500')}
//               </span>
//             </div>
//             ${formData.stayPreference === 'With Stay' && formData.stayDates.length > 0 ? `
//             <div class="amount-row">
//               <span class="amount-label">Accommodation (${formData.stayDates.length} day${formData.stayDates.length > 1 ? 's' : ''})</span>
//               <span class="amount-value">₹${217 * formData.stayDates.length}</span>
//             </div>
//             ` : ''}
//             <div class="amount-row total-row">
//               <span class="total-label">Total Amount</span>
//               <span class="total-value">₹${totalAmount}</span>
//             </div>
//           </div>
          
//           <div class="footer">
//             <p class="footer-note">
//               This receipt confirms your registration submission for NEXORA 2026 - ISTE INDUSTRY 5.0.<br>
//               Your registration status is currently <strong>PENDING ADMIN APPROVAL</strong>.<br>
//               You will receive a confirmation email once your registration is approved.
//             </p>
//             <div class="contact-info">
//               <strong>Venue:</strong> Mar Baselios College of Engineering and Technology, Thiruvananthapuram<br>
//               <strong>Dates:</strong> January 29-31, 2026 | <strong>Contact:</strong> info@nexora2026.com
//             </div>
//           </div>
//         </div>
        
//         <script>
//           // Auto print when page loads
//           window.onload = function() {
//             setTimeout(function() {
//               window.print();
//             }, 1000);
//           };
//         </script>
//       </body>
//       </html>
//     `;
    
//     receiptWindow.document.write(receiptContent);
//     receiptWindow.document.close();
//   };

//   if (paymentCompleted) {
//     return (
//       <div className="registration-container">
//         <div className="bg-shapes">
//           <div className="shape shape-1"></div>
//           <div className="shape shape-2"></div>
//           <div className="shape shape-3"></div>
//         </div>

//         <div className="registration-content">
//           <div className="success-container">
//             <div className="success-card">
//               <div className="success-icon-container">
//                 <div className="success-icon-pending">
//                   <Clock size={60} />
//                 </div>
//               </div>
//               <h1 className="success-title">Registration Submitted!</h1>
//               <p className="success-message">
//                 Hi <strong>{formData.fullName}</strong>, your registration for ISTE INDUSTRY 5.0 has been submitted successfully!
//               </p>
              
//               <div className="status-container">
//                 <div className="status-card pending">
//                   <div className="status-icon">
//                     <Clock size={24} />
//                   </div>
//                   <div className="status-content">
//                     <h3>Status: Pending Approval</h3>
//                     <p>Your registration is pending admin review. We'll notify you via email once approved.</p>
//                     <small>Approval usually takes 24-48 hours</small>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="success-details">
//                 <h3>Registration Details</h3>
//                 <div className="details-grid">
//                   <div className="detail-item">
//                     <span className="detail-label">Transaction ID:</span>
//                     <span className="detail-value">{transactionId}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Amount Paid:</span>
//                     <span className="detail-value">₹{totalAmount}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Registration ID:</span>
//                     <span className="detail-value">{registrationId || 'Pending...'}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Email:</span>
//                     <span className="detail-value">{formData.email}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Phone:</span>
//                     <span className="detail-value">{formData.phone}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Institution:</span>
//                     <span className="detail-value">{formData.institution}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">College:</span>
//                     <span className="detail-value">{formData.college}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Department:</span>
//                     <span className="detail-value">
//                       {formData.department === 'Other' ? formData.otherDepartment : formData.department}
//                     </span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Year:</span>
//                     <span className="detail-value">{formData.year}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">ISTE Member:</span>
//                     <span className="detail-value">{formData.isIsteMember}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Accommodation:</span>
//                     <span className="detail-value">
//                       {formData.stayPreference === 'With Stay' 
//                         ? `Yes (${formData.stayDates.length} day${formData.stayDates.length > 1 ? 's' : ''})` 
//                         : 'No'}
//                     </span>
//                   </div>
//                   {formData.stayDates && formData.stayDates.length > 0 && (
//                     <div className="detail-item full-width">
//                       <span className="detail-label">Stay Dates:</span>
//                       <span className="detail-value">
//                         {formData.stayDates.map(dateStr => {
//                           const date = new Date(dateStr);
//                           return date.toLocaleDateString('en-IN', { 
//                             weekday: 'short', 
//                             day: 'numeric', 
//                             month: 'short',
//                             year: 'numeric'
//                           });
//                         }).join(', ')}
//                       </span>
//                     </div>
//                   )}
//                   {formData.ambassadorCode && (
//                     <div className="detail-item">
//                       <span className="detail-label">Ambassador Code:</span>
//                       <span className="detail-value">{formData.ambassadorCode}</span>
//                     </div>
//                   )}
//                   <div className="detail-item">
//                     <span className="detail-label">Base Fee:</span>
//                     <span className="detail-value">
//                       ₹{formData.institution === 'Polytechnic' 
//                         ? (formData.isIsteMember === 'Yes' ? 250 : 300) 
//                         : (formData.isIsteMember === 'Yes' ? 450 : 500)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="success-actions">
//                 <button 
//                   className="success-btn primary"
//                   onClick={() => window.location.reload()}
//                 >
//                   Register Another Participant
//                 </button>
//                 <button 
//                   className="success-btn secondary"
//                   onClick={generateReceipt}
//                 >
//                   <Download size={18} />
//                   Save Receipt
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="registration-container">
//       <div className="bg-shapes">
//         <div className="shape shape-1"></div>
//         <div className="shape shape-2"></div>
//         <div className="shape shape-3"></div>
//       </div>

//       <div className="registration-content">
//         <div className="registration-header">
//           <h1 className="main-heading">
//             Complete Your <span className="gradient-text">Payment</span>
//           </h1>
//           <p className="header-description">
//             Hi {formData.fullName}, please complete the payment to submit your registration
//           </p>
//           <div className="registration-note">
//             <AlertCircle size={16} />
//             <span>Note: Registration requires admin approval after payment</span>
//           </div>
//         </div>

//         {paymentError && (
//           <div className="error-alert">
//             <AlertCircle size={20} />
//             <span>{paymentError}</span>
//           </div>
//         )}

//         <div className="payment-layout">
//           <div className="form-section">
//             <div className="form-card">
//               <div className="payment-header">
//                 <h2 className="form-title">Payment Details</h2>
//                 <p className="form-subtitle">Total Amount: <span className="payment-amount">₹{totalAmount}</span></p>
//               </div>

//               <div className="payment-content">
//                 <div className="qr-section">
//                   <h3 className="qr-title">Scan QR Code to Pay</h3>
//                   <div className="qr-container">
//                     <div className="qr-code-placeholder">
//                       <div className="qr-image-container">
//                         <img 
//                           src="/iste-qr.jpg" 
//                           alt="UPI Payment QR Code"
//                           className="qr-image"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyRjJGMkYiIHJ4PSIxMCIvPjxwYXRoIGQ9Ik01MCA1MEgxNTBWMTUwSDUwVjUwWiIgZmlsbD0iIzQ5NDk0OSIvPjxwYXRoIGQ9Ik03MCA5MEg5MFYxMTBINzBWOTBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==';
//                           }}
//                         />
//                         <div className="qr-amount-overlay">₹{totalAmount}</div>
//                       </div>
//                     </div>
//                     <p className="qr-instruction">
//                       Scan this QR code with any UPI app to complete your payment
//                     </p>
//                   </div>
//                 </div>

//                 <form onSubmit={handlePaymentSubmit} className="transaction-form">
//                   <div className="input-group">
//                     <CreditCard className="input-icon" size={20} />
//                     <input
//                       type="text"
//                       placeholder="Enter Transaction ID (from your payment app) *"
//                       value={transactionId}
//                       onChange={(e) => {
//                         setTransactionId(e.target.value);
//                         setPaymentError('');
//                       }}
//                       required
//                       className="modern-input"
//                       minLength={3}
//                       maxLength={50}
//                     />
//                   </div>
                  
//                   <div className="payment-instructions">
//                     <h4>Payment Instructions:</h4>
//                     <ul>
//                       <li>Scan the QR code with your UPI app</li>
//                       <li>Complete the payment of <strong>₹{totalAmount}</strong></li>
//                       <li>Copy the transaction ID from your payment app</li>
//                       <li>Paste the transaction ID in the field above</li>
//                       <li>Click "Submit Registration" to complete</li>
//                     </ul>
//                   </div>

//                   <button 
//                     type="submit" 
//                     className={`submit-btn payment-btn ${isButtonPressed ? 'pressed' : ''}`}
//                     disabled={isProcessing}
//                     onClick={(e) => {
//                       if (!isProcessing) {
//                         createRipple(e);
//                       }
//                     }}
//                   >
//                     {isProcessing ? (
//                       <>
//                         <Loader2 className="animate-spin" size={18} />
//                         Submitting Registration...
//                       </>
//                     ) : (
//                       <>
//                         Submit Registration
//                         <Send size={18} />
//                       </>
//                     )}
//                   </button>
                  
//                   <button 
//                     type="button" 
//                     className="btn-secondary back-btn"
//                     onClick={() => window.history.back()}
//                   >
//                     Go Back to Form
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>

//           <div className="info-section">
//             <div className="info-card">
//               <div className="card-header">
//                 <h3 className="card-title">Registration Summary</h3>
//               </div>
//               <div className="registration-summary">
//                 <div className="summary-item">
//                   <span className="summary-label">Name:</span>
//                   <span className="summary-value">{formData.fullName}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span className="summary-label">Email:</span>
//                   <span className="summary-value">{formData.email}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span className="summary-label">Phone:</span>
//                   <span className="summary-value">{formData.phone}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span className="summary-label">Institution:</span>
//                   <span className="summary-value">{formData.institution}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span className="summary-label">College:</span>
//                   <span className="summary-value">{formData.college}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span className="summary-label">Department:</span>
//                   <span className="summary-value">
//                     {formData.department === 'Other' ? formData.otherDepartment : formData.department}
//                   </span>
//                 </div>
//                 <div className="summary-item">
//                   <span className="summary-label">Year:</span>
//                   <span className="summary-value">{formData.year}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span className="summary-label">ISTE Member:</span>
//                   <span className="summary-value">{formData.isIsteMember}</span>
//                 </div>
//                 {formData.isteRegistrationNumber && (
//                   <div className="summary-item">
//                     <span className="summary-label">ISTE Reg. No:</span>
//                     <span className="summary-value">{formData.isteRegistrationNumber}</span>
//                   </div>
//                 )}
//                 <div className="summary-item">
//                   <span className="summary-label">Accommodation:</span>
//                   <span className="summary-value">
//                     {formData.stayPreference === 'With Stay' 
//                       ? `${formData.stayDates.length} day${formData.stayDates.length > 1 ? 's' : ''}` 
//                       : 'No'}
//                   </span>
//                 </div>
//                 {formData.stayDates && formData.stayDates.length > 0 && (
//                   <div className="summary-item full-width">
//                     <span className="summary-label">Stay Dates:</span>
//                     <span className="summary-value">
//                       {formData.stayDates.map(dateStr => {
//                         const date = new Date(dateStr);
//                         return date.toLocaleDateString('en-IN', { 
//                           weekday: 'short', 
//                           day: 'numeric', 
//                           month: 'short',
//                           year: 'numeric'
//                         });
//                       }).join(', ')}
//                     </span>
//                   </div>
//                 )}
//                 {formData.ambassadorCode && (
//                   <div className="summary-item">
//                     <span className="summary-label">Ambassador Code:</span>
//                     <span className="summary-value">{formData.ambassadorCode}</span>
//                   </div>
//                 )}
//                 <div className="summary-item">
//                   <span className="summary-label">Base Fee:</span>
//                   <span className="summary-value">
//                     ₹${formData.institution === 'Polytechnic' 
//                       ? (formData.isIsteMember === 'Yes' ? 250 : 300) // UPDATED
//                       : (formData.isIsteMember === 'Yes' ? 450 : 500)}
//                   </span>
//                 </div>
//                 {formData.stayPreference === 'With Stay' && formData.stayDates.length > 0 && (
//                   <div className="summary-item">
//                     <span className="summary-label">Accommodation Fee:</span>
//                     <span className="summary-value">₹${217 * formData.stayDates.length}</span>
//                   </div>
//                 )}
//                 <div className="summary-total">
//                   <span className="total-label">Total Amount:</span>
//                   <span className="total-value">₹{totalAmount}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPage;
import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, Building2, Send, Calendar,
  MapPin, GraduationCap, CreditCard, BedDouble, 
  CheckCircle2, Loader2, AlertCircle, Clock, Download, ExternalLink, School,
  Users
} from 'lucide-react';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [stayAvailability, setStayAvailability] = useState({ available: true, remaining: 250 });
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
    stayDates: [],
    ambassadorCode: '',
    acknowledgement: false
  });

  const API_BASE_URL = 'https://iste-backend-fcd3.onrender.com/api';

  // Fetch stay availability on component mount
  useEffect(() => {
    fetchStayAvailability();
  }, []);

  const fetchStayAvailability = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stay-availability`);
      if (!response.ok) {
        console.error('Stay availability fetch failed:', response.status);
        return;
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        setStayAvailability(data.data);
      } else if (data.available !== undefined) {
        // Handle alternative response format
        setStayAvailability({
          available: data.available,
          remaining: data.remaining || 0,
          totalCapacity: data.totalCapacity || 250,
          used: data.used || 0,
          pricePerDay: data.pricePerDay || 217
        });
      } else {
        console.error('Invalid stay availability response:', data);
      }
    } catch (error) {
      console.error('Error fetching stay availability:', error);
      // Set default values
      setStayAvailability({
        available: true,
        remaining: 250,
        totalCapacity: 250,
        used: 0,
        pricePerDay: 217
      });
    }
  };

  const checkAndReserveStay = async () => {
    if (formData.stayPreference === 'With Stay' && formData.stayDates.length > 0) {
      try {
        const response = await fetch(`${API_BASE_URL}/reserve-stay`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            stayDays: formData.stayDates.length,
            action: 'reserve'
          }),
        });
        
        // First check if response is ok
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', errorText);
          setFormError('Error checking stay availability. Please try again.');
          return false;
        }
        
        const result = await response.json();
        
        // Handle both response formats
        const isAvailable = result.data 
          ? (result.success && result.data.available)
          : (result.available === true);
        
        if (!isAvailable) {
          setFormError('Stay accommodation is no longer available. Please try without stay.');
          return false;
        }
        
        return true;
        
      } catch (error) {
        console.error('Error reserving stay:', error);
        setFormError('Error checking stay availability. Please try again.');
        return false;
      }
    }
    return true;
  };

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

    // Validate stayDates only if With Stay is selected
    if (formData.stayPreference === 'With Stay') {
      if (!formData.stayDates || formData.stayDates.length === 0) {
        setFormError('Please select stay dates');
        return;
      }
    }

    // Validate email format only (no duplication check here)
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.toLowerCase().trim())) {
        setFormError('Please enter a valid email address');
        return;
      }
    }

    // Check and reserve stay spots
    const stayAvailable = await checkAndReserveStay();
    if (!stayAvailable) {
      return;
    }

    setShowPayment(true);
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => {
      const updated = { ...prev, [name]: newValue };
      
      // Reset stayDates when stayPreference changes
      if (name === 'stayPreference') {
        if (value === 'Without Stay') {
          updated.stayDates = [];
        } else if (value === 'With Stay' && (!prev.stayDates || prev.stayDates.length === 0)) {
          updated.stayDates = [];
        }
      }
      
      // Reset otherDepartment when department changes from "Other"
      if (name === 'department' && value !== 'Other') {
        updated.otherDepartment = '';
      }
      
      return updated;
    });
    
    setFormError('');
  };

  const calculateTotalAmount = () => {
    // Determine base fee based on institution and ISTE membership
    let baseFee;
    if (formData.institution === 'Polytechnic') {
      baseFee = formData.isIsteMember === 'Yes' ? 250 : 300;
    } else {
      // Engineering students
      baseFee = formData.isIsteMember === 'Yes' ? 450 : 500;
    }
    
    let total = baseFee;
    
    if (formData.stayPreference === 'With Stay' && formData.stayDates.length > 0) {
      total += (217 * formData.stayDates.length);
    }
    
    return total;
  };

  const calculateBaseFee = () => {
    if (formData.institution === 'Polytechnic') {
      return formData.isIsteMember === 'Yes' ? 250 : 300;
    }
    // Engineering students
    return formData.isIsteMember === 'Yes' ? 450 : 500;
  };

  const handleDateSelect = (date) => {
    if (formData.stayPreference !== 'With Stay') return;
    
    setFormData(prev => {
      const dates = [...prev.stayDates];
      
      // Create a standardized date string to avoid timezone issues
      const standardizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dateString = standardizedDate.toISOString();
      
      if (dates.includes(dateString)) {
        // Remove date if already selected
        return {
          ...prev,
          stayDates: dates.filter(d => d !== dateString)
        };
      } else {
        // Add date if not already selected and within limit
        if (dates.length < 3) {
          return {
            ...prev,
            stayDates: [...dates, dateString]
          };
        }
        return prev;
      }
    });
  };

  // Event dates - UPDATED TO 2026
  const eventDates = [
    new Date(2026, 0, 29),
    new Date(2026, 0, 30),
    new Date(2026, 0, 31)
  ];

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
    
    if (currentStep === 3) {
      if (!formData.stayPreference) {
        setFormError('Please select accommodation preference');
        return;
      }
      if (formData.stayPreference === 'With Stay') {
        if (!formData.stayDates || formData.stayDates.length === 0) {
          setFormError('Please select stay dates');
          return;
        }
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
      stayAvailability={stayAvailability}
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
            <span>Stay spots decrease immediately upon registration (before admin approval)</span>
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
                        <option value="Engineering">Engineering College (₹500 base fee, ₹450 for ISTE members)</option>
                        <option value="Polytechnic">Polytechnic College (₹300 base fee, ₹250 for ISTE members)</option>
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
                        disabled={!stayAvailability.available && stayAvailability.remaining === 0}
                      >
                        <option value="">Do you require accommodation? *</option>
                        <option value="With Stay" disabled={!stayAvailability.available}>
                          {stayAvailability.available 
                            ? `Yes, I need accommodation (₹217/day) - ${stayAvailability.remaining} spots left`
                            : 'Accommodation full - No spots available'}
                        </option>
                        <option value="Without Stay">No, I don't need accommodation</option>
                      </select>
                    </div>

                    {formData.stayPreference === 'With Stay' && stayAvailability.available && (
                      <div className="calendar-container">
                        <div className="calendar-header">
                          <h4>Select Stay Dates (January 2026)</h4>
                          <div className="calendar-info">
                            <span className="selected-dates-count">
                              Selected: {formData.stayDates.length} day{formData.stayDates.length !== 1 ? 's' : ''}
                            </span>
                            <span className="date-price">₹217 per day</span>
                          </div>
                        </div>
                        
                        <div className="calendar-grid">
                          {['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'].map(day => (
                            <div key={day} className="calendar-day-header">{day}</div>
                          ))}
                          
                          {/* Generate calendar for January 2026 */}
                          {Array.from({ length: 31 }, (_, i) => {
                            const date = new Date(2026, 0, i + 1);
                            const dateString = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
                            const isEventDate = eventDates.some(eventDate => 
                              eventDate.getDate() === date.getDate() && 
                              eventDate.getMonth() === date.getMonth() &&
                              eventDate.getFullYear() === date.getFullYear()
                            );
                            const isSelected = formData.stayDates.includes(dateString);
                            const isSelectable = isEventDate;
                            
                            return (
                              <div 
                                key={i}
                                className={`calendar-day 
                                  ${isSelectable ? 'selectable' : 'non-event'} 
                                  ${isSelected ? 'selected' : ''}
                                  ${!isEventDate ? 'disabled' : ''}`}
                                onClick={() => isSelectable && handleDateSelect(date)}
                              >
                                <span className="day-number">{i + 1}</span>
                                {isEventDate && <span className="event-indicator">Event Day</span>}
                                {isSelected && <div className="selected-indicator">✓</div>}
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="calendar-legends">
                          <div className="legend-item">
                            <div className="legend-color event-day"></div>
                            <span>Event Day (29, 30, 31 Jan 2026)</span>
                          </div>
                          <div className="legend-item">
                            <div className="legend-color selected-day"></div>
                            <span>Selected for stay</span>
                          </div>
                        </div>
                        
                        {formData.stayDates.length > 0 && (
                          <div className="selected-dates-summary">
                            <h5>Your Stay Dates:</h5>
                            <div className="dates-list">
                              {formData.stayDates.map(dateStr => {
                                const date = new Date(dateStr);
                                return (
                                  <div key={dateStr} className="date-chip">
                                    {date.toLocaleDateString('en-IN', { 
                                      weekday: 'short', 
                                      day: 'numeric', 
                                      month: 'short',
                                      year: 'numeric'
                                    })}
                                    <button
                                      type="button"
                                      className="remove-date"
                                      onClick={() => handleDateSelect(date)}
                                    >
                                      ×
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="stay-total">
                              <span>Accommodation Cost:</span>
                              <span className="stay-amount">
                                ₹{formData.stayDates.length} × 217 = ₹{217 * formData.stayDates.length}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div className="stay-availability-info">
                          <AlertCircle size={16} />
                          <span>
                            Only {stayAvailability.remaining} stay spots remaining. 
                            First come, first served basis.
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="input-group">
                      <Users className="input-icon" size={20} />
                      <input
                        type="text"
                        name="ambassadorCode"
                        placeholder="Campus Ambassador Code (Optional)"
                        value={formData.ambassadorCode}
                        onChange={handleChange}
                        className="modern-input"
                      />
                      <div className="optional-note">
                        <span className="optional-text">Optional - Enter if you have a campus ambassador referral code</span>
                      </div>
                    </div>

                    <div className="charges-summary">
                      <div className="charges-content">
                        <h4>Payment Summary</h4>
                        <div className="charges-breakdown">
                          <div className="charge-item">
                            <span>
                              Registration Fee ({formData.institution}):
                              {formData.isIsteMember === 'Yes' && ' (ISTE Member Discount Applied)'}
                            </span>
                            <span>
                              ₹{calculateBaseFee()}
                            </span>
                          </div>
                          {formData.stayPreference === 'With Stay' && formData.stayDates.length > 0 && (
                            <div className="charge-item">
                              <span>Accommodation ({formData.stayDates.length} day{formData.stayDates.length > 1 ? 's' : ''}):</span>
                              <span>₹{217 * formData.stayDates.length}</span>
                            </div>
                          )}
                          <div className="charge-total">
                            <span>Total Amount:</span>
                            <span className="total-amount">₹{calculateTotalAmount()}</span>
                          </div>
                        </div>
                        {formData.isIsteMember === 'Yes' && (
                          <small className="charges-note discount-note">
                            You're getting a discount for being an ISTE member!
                          </small>
                        )}
                        <small className="charges-note">
                          Note: Stay spots are reserved immediately upon registration. 
                          If admin rejects your registration, spots will be released.
                        </small>
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
                          (formData.stayPreference === 'With Stay' && formData.stayDates.length === 0)
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
                  <span className="price-label">Engineering College (Non-ISTE)</span>
                  <span className="price-value">₹500</span>
                </div>
                <div className="price-item">
                  <span className="price-label">Engineering College (ISTE Member)</span>
                  <span className="price-value">₹450</span>
                </div>
                <div className="price-item">
                  <span className="price-label">Polytechnic College (Non-ISTE)</span>
                  <span className="price-value">₹300</span>
                </div>
                <div className="price-item">
                  <span className="price-label">Polytechnic College (ISTE Member)</span>
                  <span className="price-value">₹250</span>
                </div>
                <div className="price-item">
                  <span className="price-label">Accommodation (per day)</span>
                  <span className="price-value">₹217</span>
                </div>
                <div className="stay-availability-badge">
                  <BedDouble size={14} />
                  <span>Stay spots left: {stayAvailability.remaining}</span>
                </div>
                <div className="ambassador-note">
                  <AlertCircle size={14} />
                  <span>Campus Ambassador codes are optional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentPage = ({ formData, totalAmount, setIsSubmitting, setFormError, apiBaseUrl, stayAvailability }) => {
  const [transactionId, setTransactionId] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isButtonPressed) {
      const timer = setTimeout(() => setIsButtonPressed(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isButtonPressed]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("btn-ripple");

    const ripple = button.getElementsByClassName("btn-ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    setIsButtonPressed(true);
    createRipple(e);
    
    if (formData.stayPreference === 'With Stay') {
      if (!formData.stayDates || formData.stayDates.length === 0) {
        setPaymentError('Please select stay dates');
        setIsButtonPressed(false);
        return;
      }
      
      // Double-check stay availability
      try {
        const stayCheckResponse = await fetch(`${apiBaseUrl}/reserve-stay`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            stayDays: formData.stayDates.length,
            action: 'reserve'
          }),
        });
        
        if (!stayCheckResponse.ok) {
          const errorText = await stayCheckResponse.text();
          console.error('Stay check error:', errorText);
          setPaymentError('Error checking stay availability. Please try again.');
          setIsButtonPressed(false);
          return;
        }
        
        const stayCheckResult = await stayCheckResponse.json();
        
        // Handle both response formats
        const isAvailable = stayCheckResult.data 
          ? (stayCheckResult.success && stayCheckResult.data.available)
          : (stayCheckResult.available === true);
        
        if (!isAvailable) {
          setPaymentError('Stay accommodation is no longer available. Please go back and select "Without Stay".');
          setIsButtonPressed(false);
          return;
        }
      } catch (error) {
        console.error('Error checking stay availability:', error);
        setPaymentError('Error checking stay availability. Please try again.');
        setIsButtonPressed(false);
        return;
      }
    }

    if (!transactionId.trim()) {
      setPaymentError('Please enter your transaction ID');
      setIsButtonPressed(false);
      return;
    }

    if (transactionId.length < 3) {
      setPaymentError('Transaction ID must be at least 3 characters');
      setIsButtonPressed(false);
      return;
    }

    if (!formData.institution) {
      setPaymentError('Institution type is required');
      setIsButtonPressed(false);
      return;
    }

    if (formData.department === 'Other' && !formData.otherDepartment.trim()) {
      setPaymentError('Please specify your department name');
      setIsButtonPressed(false);
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      // EMAIL DUPLICATION CHECK
      const emailCheckResponse = await fetch(`${apiBaseUrl}/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email.toLowerCase().trim() }),
      });
      
      const emailCheckResult = await emailCheckResponse.json();
      
      if (emailCheckResult.exists) {
        setPaymentError('This email is already registered. Please go back and use a different email address.');
        setIsProcessing(false);
        setIsButtonPressed(false);
        return;
      }

      // Calculate base fee for backend
      const calculateBaseFee = () => {
        if (formData.institution === 'Polytechnic') {
          return formData.isIsteMember === 'Yes' ? 250 : 300;
        }
        return formData.isIsteMember === 'Yes' ? 450 : 500;
      };

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
        stayDates: formData.stayPreference === 'With Stay' ? 
          formData.stayDates.map(dateStr => {
            const date = new Date(dateStr);
            const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            return utcDate.toISOString();
          }) : [],
        ambassadorCode: formData.ambassadorCode ? formData.ambassadorCode.trim() : '',
        baseFee: calculateBaseFee(),
        totalAmount: totalAmount,
        transactionId: transactionId.trim()
      };

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
      setIsButtonPressed(false);
    }
  };

  const generateReceipt = () => {
    const receiptWindow = window.open('', '_blank');
    
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>NEXORA Registration Receipt</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', sans-serif;
            background: white;
            color: #333;
            padding: 30px;
            max-width: 800px;
            margin: 0 auto;
          }
          
          .receipt-container {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #4A90E2;
          }
          
          .event-title {
            font-size: 32px;
            font-weight: 800;
            color: #1a1a1a;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .event-subtitle {
            font-size: 18px;
            color: #666;
            margin-bottom: 16px;
          }
          
          .status-badge {
            display: inline-block;
            background: #fbbf24;
            color: #78350f;
            padding: 8px 20px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 10px;
          }
          
          .receipt-id {
            font-size: 14px;
            color: #666;
            font-weight: 500;
          }
          
          .receipt-id strong {
            color: #4A90E2;
          }
          
          .details-section {
            margin-bottom: 40px;
          }
          
          .section-title {
            font-size: 20px;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .details-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 20px;
          }
          
          .detail-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          
          .detail-label {
            font-size: 14px;
            color: #666;
            font-weight: 500;
          }
          
          .detail-value {
            font-size: 16px;
            color: #1a1a1a;
            font-weight: 600;
          }
          
          .amount-section {
            background: #f8fafc;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            border: 1px solid #e5e7eb;
          }
          
          .amount-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .amount-row:last-child {
            border-bottom: none;
          }
          
          .amount-label {
            font-size: 16px;
            color: #4b5563;
          }
          
          .amount-value {
            font-size: 16px;
            color: #1a1a1a;
            font-weight: 500;
          }
          
          .total-row {
            padding-top: 15px;
            margin-top: 15px;
            border-top: 2px solid #4A90E2;
          }
          
          .total-label {
            font-size: 20px;
            font-weight: 700;
            color: #1a1a1a;
          }
          
          .total-value {
            font-size: 24px;
            font-weight: 800;
            color: #4A90E2;
          }
          
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
          }
          
          .footer-note {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
            line-height: 1.6;
          }
          
          .contact-info {
            font-size: 14px;
            color: #4b5563;
            margin-top: 20px;
          }
          
          .watermark {
            opacity: 0.1;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 120px;
            font-weight: 900;
            color: #4A90E2;
            pointer-events: none;
            z-index: -1;
            white-space: nowrap;
          }
          
          @media print {
            body {
              padding: 0;
            }
            
            .receipt-container {
              border: none;
              box-shadow: none;
              padding: 20px;
            }
            
            .watermark {
              opacity: 0.05;
            }
            
            @page {
              margin: 20mm;
              size: A4;
            }
          }
          
          @media (max-width: 768px) {
            body {
              padding: 15px;
            }
            
            .receipt-container {
              padding: 20px;
            }
            
            .event-title {
              font-size: 24px;
            }
            
            .details-grid {
              grid-template-columns: 1fr;
            }
            
            .watermark {
              font-size: 80px;
            }
          }
        </style>
      </head>
      <body>
        <div class="watermark">NEXORA 2026</div>
        <div class="receipt-container">
          <div class="header">
            <h1 class="event-title">NEXORA 2026</h1>
            <p class="event-subtitle">ISTE INDUSTRY 5.0 - Registration Receipt</p>
            <p class="receipt-id">
              <strong>Transaction ID:</strong> ${transactionId} | 
              <strong>Reference:</strong> ${registrationId || 'Pending...'}
            </p>
          </div>
          
          <div class="details-section">
            <h2 class="section-title">Registration Details</h2>
            <div class="details-grid">
              <div class="detail-item">
                <span class="detail-label">Full Name</span>
                <span class="detail-value">${formData.fullName}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Email Address</span>
                <span class="detail-value">${formData.email}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Phone Number</span>
                <span class="detail-value">${formData.phone}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Institution Type</span>
                <span class="detail-value">${formData.institution}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">College</span>
                <span class="detail-value">${formData.college}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Department</span>
                <span class="detail-value">
                  ${formData.department === 'Other' ? formData.otherDepartment : formData.department}
                </span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Academic Year</span>
                <span class="detail-value">${formData.year}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">ISTE Member</span>
                <span class="detail-value">${formData.isIsteMember}</span>
              </div>
              ${formData.isteRegistrationNumber ? `
              <div class="detail-item">
                <span class="detail-label">ISTE Reg. Number</span>
                <span class="detail-value">${formData.isteRegistrationNumber}</span>
              </div>
              ` : ''}
              <div class="detail-item">
                <span class="detail-label">Accommodation</span>
                <span class="detail-value">
                  ${formData.stayPreference === 'With Stay' 
                    ? `Yes (${formData.stayDates.length} day${formData.stayDates.length > 1 ? 's' : ''})` 
                    : 'No'}
                </span>
              </div>
              ${formData.stayDates && formData.stayDates.length > 0 ? `
              <div class="detail-item" style="grid-column: 1 / -1;">
                <span class="detail-label">Stay Dates:</span>
                <span class="detail-value">
                  ${formData.stayDates.map(dateStr => {
                    const date = new Date(dateStr);
                    return date.toLocaleDateString('en-IN', { 
                      weekday: 'short', 
                      day: 'numeric', 
                      month: 'short',
                      year: 'numeric'
                    });
                  }).join(', ')}
                </span>
              </div>
              ` : ''}
              ${formData.ambassadorCode ? `
              <div class="detail-item">
                <span class="detail-label">Ambassador Code</span>
                <span class="detail-value">${formData.ambassadorCode}</span>
              </div>
              ` : ''}
            </div>
          </div>
          
          <div class="amount-section">
            <h2 class="section-title">Payment Summary</h2>
            <div class="amount-row">
              <span class="amount-label">Registration Fee (${formData.institution})</span>
              <span class="amount-value">
                ₹${formData.institution === 'Polytechnic' 
                  ? (formData.isIsteMember === 'Yes' ? '250' : '300')
                  : (formData.isIsteMember === 'Yes' ? '450' : '500')}
              </span>
            </div>
            ${formData.stayPreference === 'With Stay' && formData.stayDates.length > 0 ? `
            <div class="amount-row">
              <span class="amount-label">Accommodation (${formData.stayDates.length} day${formData.stayDates.length > 1 ? 's' : ''})</span>
              <span class="amount-value">₹${217 * formData.stayDates.length}</span>
            </div>
            ` : ''}
            <div class="amount-row total-row">
              <span class="total-label">Total Amount</span>
              <span class="total-value">₹${totalAmount}</span>
            </div>
          </div>
          
          <div class="footer">
            <p class="footer-note">
              This receipt confirms your registration submission for NEXORA 2026 - ISTE INDUSTRY 5.0.<br>
              Your registration status is currently <strong>PENDING ADMIN APPROVAL</strong>.<br>
              <strong>Note:</strong> Stay spots are reserved immediately upon registration. 
              If admin rejects your registration, spots will be released automatically.<br>
              You will receive a confirmation email once your registration is approved.
            </p>
            <div class="contact-info">
              <strong>Venue:</strong> Mar Baselios College of Engineering and Technology, Thiruvananthapuram<br>
              <strong>Dates:</strong> January 29-31, 2026 | <strong>Contact:</strong> info@nexora2026.com
            </div>
          </div>
        </div>
        
        <script>
          // Auto print when page loads
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 1000);
          };
        </script>
      </body>
      </html>
    `;
    
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
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
                        ? `Yes (${formData.stayDates.length} day${formData.stayDates.length > 1 ? 's' : ''})` 
                        : 'No'}
                    </span>
                  </div>
                  {formData.stayDates && formData.stayDates.length > 0 && (
                    <div className="detail-item full-width">
                      <span className="detail-label">Stay Dates:</span>
                      <span className="detail-value">
                        {formData.stayDates.map(dateStr => {
                          const date = new Date(dateStr);
                          return date.toLocaleDateString('en-IN', { 
                            weekday: 'short', 
                            day: 'numeric', 
                            month: 'short',
                            year: 'numeric'
                          });
                        }).join(', ')}
                      </span>
                    </div>
                  )}
                  {formData.ambassadorCode && (
                    <div className="detail-item">
                      <span className="detail-label">Ambassador Code:</span>
                      <span className="detail-value">{formData.ambassadorCode}</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <span className="detail-label">Base Fee:</span>
                    <span className="detail-value">
                      ₹${formData.institution === 'Polytechnic' 
                        ? (formData.isIsteMember === 'Yes' ? 250 : 300) 
                        : (formData.isIsteMember === 'Yes' ? 450 : 500)}
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
                  onClick={generateReceipt}
                >
                  <Download size={18} />
                  Save Receipt
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
            <span>Note: Stay spots decrease immediately. If rejected by admin, spots will be released.</span>
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
                      <li><strong>Note:</strong> Stay spots are reserved immediately</li>
                    </ul>
                  </div>

                  <button 
                    type="submit" 
                    className={`submit-btn payment-btn ${isButtonPressed ? 'pressed' : ''}`}
                    disabled={isProcessing}
                    onClick={(e) => {
                      if (!isProcessing) {
                        createRipple(e);
                      }
                    }}
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
                      ? `${formData.stayDates.length} day${formData.stayDates.length > 1 ? 's' : ''}` 
                      : 'No'}
                  </span>
                </div>
                {formData.stayDates && formData.stayDates.length > 0 && (
                  <div className="summary-item full-width">
                    <span className="summary-label">Stay Dates:</span>
                    <span className="summary-value">
                      {formData.stayDates.map(dateStr => {
                        const date = new Date(dateStr);
                        return date.toLocaleDateString('en-IN', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short',
                          year: 'numeric'
                        });
                      }).join(', ')}
                    </span>
                  </div>
                )}
                {formData.ambassadorCode && (
                  <div className="summary-item">
                    <span className="summary-label">Ambassador Code:</span>
                    <span className="summary-value">{formData.ambassadorCode}</span>
                  </div>
                )}
                <div className="summary-item">
                  <span className="summary-label">Base Fee:</span>
                  <span className="summary-value">
                    ₹${formData.institution === 'Polytechnic' 
                      ? (formData.isIsteMember === 'Yes' ? 250 : 300)
                      : (formData.isIsteMember === 'Yes' ? 450 : 500)}
                  </span>
                </div>
                {formData.stayPreference === 'With Stay' && formData.stayDates.length > 0 && (
                  <div className="summary-item">
                    <span className="summary-label">Accommodation Fee:</span>
                    <span className="summary-value">₹${217 * formData.stayDates.length}</span>
                  </div>
                )}
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