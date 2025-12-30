import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Eye,
  Download,
  User,
  Mail,
  Phone,
  Building2,
  CreditCard,
  Calendar,
  Shield,
  RefreshCw,
  AlertCircle,
  LogIn,
  Lock,
  LogOut,
  GraduationCap,
  BedDouble,
  CalendarDays
} from 'lucide-react';
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    totalRevenue: 0,
    withAccommodation: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    engineering: 0,
    polytechnic: 0,
    stayCapacity: {
      total: 250,
      used: 0,
      remaining: 250
    }
  });

  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [authToken, setAuthToken] = useState('');

  // API Base URL
  const API_BASE_URL = 'https://iste-backend-fcd3.onrender.com/api';

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('adminToken');
      const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      
      if (storedToken && isLoggedIn) {
        // User is already logged in
        setAuthToken(storedToken);
        setIsAuthenticated(true);
        fetchRegistrations(storedToken);
      } else {
        // User needs to log in
        setIsAuthenticated(false);
        setLoading(false);
        
        // Clear any stale/invalid tokens
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminLoggedIn');
      }
    };

    checkAuth();
  }, []);

  // Admin login function
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setAuthToken(result.token);
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', result.token);
        localStorage.setItem('adminLoggedIn', 'true');
        console.log('✅ Admin login successful');
        fetchRegistrations(result.token);
      } else {
        setError(result.message || 'Login failed. Check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Admin logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthToken('');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminLoggedIn');
    setUsers([]);
    setFilteredUsers([]);
    setStats({
      total: 0,
      totalRevenue: 0,
      withAccommodation: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      engineering: 0,
      polytechnic: 0,
      stayCapacity: {
        total: 250,
        used: 0,
        remaining: 250
      }
    });
    setError('');
    setLoginData({ username: '', password: '' });
  };

  // Fetch all registrations with admin authentication
  const fetchRegistrations = async (token = authToken) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${API_BASE_URL}/admin/registrations`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 401) {
        // Token expired or invalid
        handleLogout();
        setError('Your session has expired. Please login again.');
        return;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('📊 API Response:', result);
      
      if (result.success) {
        // UPDATED MAPPING with new pricing for polytechnic
        const mappedUsers = result.data.map(user => {
          const institution = user.institution || 'Engineering';
          const stayPreference = user.stayPreference || 'Without Stay';
          const stayDates = user.stayDates || [];
          const stayDays = stayDates.length;
          
          // Calculate correct amounts based on UPDATED pricing
          let baseFee;
          if (institution === 'Polytechnic') {
            baseFee = user.isIsteMember === 'Yes' ? 250 : 300; // UPDATED PRICING
          } else {
            // Engineering students
            baseFee = user.isIsteMember === 'Yes' ? 450 : 500;
          }
          
          const stayFee = stayDays * 217; // ₹217 per day
          const totalAmount = baseFee + stayFee;
          
          return {
            id: user._id,
            fullName: user.fullName || '',
            email: user.email || '',
            phone: user.phone || '',
            institution: institution,
            college: user.college || '',
            department: user.department || '',
            year: user.year || '',
            isIsteMember: user.isIsteMember || 'No',
            isteRegistrationNumber: user.isteRegistrationNumber || '',
            stayPreference: stayPreference,
            stayDates: stayDates,
            stayDays: stayDays,
            baseFee: baseFee,
            stayFee: stayFee,
            transactionId: user.transactionId || '',
            amount: user.totalAmount || totalAmount,
            status: user.registrationStatus || 'pending',
            registrationStatus: user.registrationStatus || 'pending',
            paymentStatus: user.paymentStatus || 'pending',
            registrationDate: new Date(user.registrationDate || user.createdAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            paymentDate: new Date(user.registrationDate || user.createdAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            approvedBy: user.approvedBy || '',
            approvedAt: user.approvedAt ? new Date(user.approvedAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : '',
            rejectedAt: user.rejectedAt ? new Date(user.rejectedAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : '',
            rejectionReason: user.rejectionReason || ''
          };
        });
        
        console.log('✅ Mapped users (first 2):', mappedUsers.slice(0, 2));
        
        setUsers(mappedUsers);
        setFilteredUsers(mappedUsers);
        
        // Fetch statistics and stay availability
        fetchStats(token);
      } else {
        throw new Error(result.message || 'Failed to fetch registrations');
      }
    } catch (err) {
      console.error('❌ Error fetching registrations:', err);
      setError(err.message || 'Failed to load registrations. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics and stay availability
  const fetchStats = async (token = authToken) => {
    try {
      // Fetch regular stats
      const statsResponse = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Fetch stay availability
      const availabilityResponse = await fetch(`${API_BASE_URL}/stay-availability`);
      
      if (statsResponse.ok && availabilityResponse.ok) {
        const statsResult = await statsResponse.json();
        const availabilityResult = await availabilityResponse.json();
        
        if (statsResult.success) {
          const institutionStats = statsResult.data.institutionStats || [];
          const engineering = institutionStats.find(s => s._id === 'Engineering')?.count || 0;
          const polytechnic = institutionStats.find(s => s._id === 'Polytechnic')?.count || 0;
          
          const stayStats = statsResult.data.stayStats || {};
          
          setStats({
            total: statsResult.data.totalRegistrations || 0,
            totalRevenue: statsResult.data.totalRevenue || 0,
            withAccommodation: stayStats.used || 0,
            pending: statsResult.data.pendingRegistrations || 0,
            approved: statsResult.data.approvedRegistrations || 0,
            rejected: statsResult.data.rejectedRegistrations || 0,
            engineering: engineering,
            polytechnic: polytechnic,
            stayCapacity: {
              total: stayStats.capacity || 250,
              used: stayStats.used || 0,
              remaining: stayStats.remaining || 250
            }
          });
        }
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Handle approve registration
  const handleApprove = async (userId, userName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/registration/${userId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          approvedBy: 'Admin'
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Update local state
          const updatedUsers = users.map(user =>
            user.id === userId ? { 
              ...user, 
              status: 'approved',
              registrationStatus: 'approved',
              approvedBy: 'Admin',
              approvedAt: new Date().toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }),
              rejectedAt: '',
              rejectionReason: ''
            } : user
          );
          
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers.filter(user => 
            statusFilter === 'all' || user.status === statusFilter
          ));
          
          // Update stats
          fetchStats();
          
          // If modal is open, update selected user
          if (selectedUser && selectedUser.id === userId) {
            setSelectedUser({ 
              ...selectedUser, 
              status: 'approved',
              registrationStatus: 'approved',
              approvedBy: 'Admin',
              approvedAt: new Date().toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }),
              rejectedAt: '',
              rejectionReason: ''
            });
          }
          
          console.log(`✅ Approved registration for: ${userName}`);
        }
      } else {
        setError('Failed to approve registration');
      }
    } catch (err) {
      console.error('Error approving registration:', err);
      setError('Failed to approve registration');
    }
  };

  // Handle reject registration
  const handleReject = async (userId, userName, reason = '') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/registration/${userId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          reason: reason || 'Registration rejected by admin'
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Update local state
          const updatedUsers = users.map(user =>
            user.id === userId ? { 
              ...user, 
              status: 'rejected',
              registrationStatus: 'rejected',
              rejectionReason: reason || 'Registration rejected by admin',
              rejectedAt: new Date().toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }),
              approvedBy: '',
              approvedAt: ''
            } : user
          );
          
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers.filter(user => 
            statusFilter === 'all' || user.status === statusFilter
          ));
          
          // Update stats
          fetchStats();
          
          // If modal is open, update selected user
          if (selectedUser && selectedUser.id === userId) {
            setSelectedUser({ 
              ...selectedUser, 
              status: 'rejected',
              registrationStatus: 'rejected',
              rejectionReason: reason || 'Registration rejected by admin',
              rejectedAt: new Date().toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }),
              approvedBy: '',
              approvedAt: ''
            });
          }
          
          console.log(`❌ Rejected registration for: ${userName}`);
        }
      } else {
        setError('Failed to reject registration');
      }
    } catch (err) {
      console.error('Error rejecting registration:', err);
      setError('Failed to reject registration');
    }
  };

  // Generate email content based on user status
  const generateEmailContent = (user) => {
    const registrationId = `ISTE${user.id.slice(-8).toUpperCase()}`;
    const stayDatesText = user.stayDates && user.stayDates.length > 0 
      ? `Stay Dates: ${user.stayDates.map(dateStr => {
          const date = new Date(dateStr);
          return date.toLocaleDateString('en-IN', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short',
            year: 'numeric'
          });
        }).join(', ')}`
      : '';
    
    if (user.status === 'approved') {
      return {
        subject: `🎉 Registration Approved - ISTE INDUSTRY 5.0 - ${registrationId}`,
        body: `Dear ${user.fullName},

Congratulations! Your registration for ISTE INDUSTRY 5.0 has been APPROVED.

📋 Registration Details:
• Registration ID: ${registrationId}
• Name: ${user.fullName}
• College: ${user.college}
• Department: ${user.department} - ${user.year} Year
• Institution Type: ${user.institution}
• Accommodation: ${user.stayPreference} 
${user.stayPreference === 'With Stay' ? `• Stay Days: ${user.stayDays} day${user.stayDays !== 1 ? 's' : ''}` : ''}
${stayDatesText ? `• ${stayDatesText}` : ''}
• Transaction ID: ${user.transactionId}
• Amount Paid: ₹${user.amount} 
• Status: APPROVED ✅
• Approved By: ${user.approvedBy || 'Admin'}
• Approval Date: ${user.approvedAt || new Date().toLocaleDateString('en-IN')}

📍 Important Information:
1. Please carry your college ID card for verification
2. ${user.stayPreference === 'With Stay' ? 'Accommodation details will be shared separately' : 'No accommodation arranged'}
3. Keep this email for reference

We look forward to seeing you at ISTE INDUSTRY 5.0!

Best regards,
ISTE INDUSTRY 5.0 Team`
      };
    } else if (user.status === 'rejected') {
      return {
        subject: `⚠️ Registration Update - ISTE INDUSTRY 5.0 - ${registrationId}`,
        body: `Dear ${user.fullName},

We regret to inform you that your registration for ISTE INDUSTRY 5.0 could not be approved.

📋 Registration Details:
• Registration ID: ${registrationId}
• Name: ${user.fullName}
• College: ${user.college}
• Transaction ID: ${user.transactionId}
• Amount: ₹${user.amount}
• Status: REJECTED ❌
• Rejection Date: ${user.rejectedAt || new Date().toLocaleDateString('en-IN')}
${user.rejectionReason ? `• Reason: ${user.rejectionReason}` : ''}

🔍 What to do next:
1. Review the reason for rejection
2. If you believe this is a mistake, please contact us immediately
3. Include your Transaction ID (${user.transactionId}) in all communications
4. Refunds (if applicable) will be processed within 7-10 working days

We apologize for any inconvenience caused.

For queries, please contact us.

Sincerely,
ISTE INDUSTRY 5.0 Team`
      };
    } else {
      return {
        subject: `📋 Registration Status - ISTE INDUSTRY 5.0 - ${registrationId}`,
        body: `Dear ${user.fullName},

Your registration for ISTE INDUSTRY 5.0 is currently PENDING approval.

📋 Registration Details:
• Registration ID: ${registrationId}
• Name: ${user.fullName}
• College: ${user.college}
• Department: ${user.department}
• Transaction ID: ${user.transactionId}
• Status: PENDING ⏳

We will notify you once your registration is reviewed by our team.

Best regards,
ISTE INDUSTRY 5.0 Team`
      };
    }
  };

  // Send email via Gmail web interface
  const handleSendEmail = (user) => {
    const emailContent = generateEmailContent(user);
    const adminEmail = 'iste.industry5.0@gmail.com';
    
    // Create Gmail web interface URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(user.email)}&su=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}&cc=${encodeURIComponent(adminEmail)}}`;
    
    // Debug: Log the generated URL
    console.log('📧 Generated Gmail URL:', gmailUrl);
    console.log('📧 Sending to:', user.email);
    console.log('📧 Subject:', emailContent.subject);
    
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  // Filter users based on search and status
  useEffect(() => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.institution.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, statusFilter, users]);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const exportToCSV = () => {
    const headers = [
      'Name', 'Email', 'Phone', 'Institution Type', 'College', 'Department', 'Year', 
      'ISTE Member', 'ISTE Reg No', 'Accommodation', 'Stay Days', 'Stay Dates', 'Transaction ID', 
      'Amount', 'Status', 'Registration Date', 'Payment Status', 'Approved By', 'Approval Date', 'Rejection Reason'
    ];
    
    const csvData = filteredUsers.map(user => [
      user.fullName,
      user.email,
      user.phone,
      user.institution,
      user.college,
      user.department,
      user.year,
      user.isIsteMember,
      user.isteRegistrationNumber || '',
      user.stayPreference,
      user.stayDays,
      user.stayDates ? user.stayDates.join(', ') : '',
      user.transactionId,
      `₹${user.amount}`,
      user.status,
      user.registrationDate,
      user.paymentStatus,
      user.approvedBy || '',
      user.approvedAt || '',
      user.rejectionReason || ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iste-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'status-pending', text: 'Pending', icon: '⏳' },
      approved: { color: 'status-approved', text: 'Approved', icon: '✅' },
      rejected: { color: 'status-rejected', text: 'Rejected', icon: '❌' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`status-badge ${config.color}`}>
        <span className="badge-icon">{config.icon}</span>
        <span className="badge-text">{config.text}</span>
      </span>
    );
  };

  const getInstitutionBadge = (institution) => {
    const config = {
      Engineering: { color: 'institution-engineering', text: 'Engineering', icon: '🎓' },
      Polytechnic: { color: 'institution-polytechnic', text: 'Polytechnic', icon: '🏫' }
    };
    
    const institutionConfig = config[institution] || { color: 'institution-unknown', text: institution, icon: '🏛️' };
    return (
      <span className={`institution-badge ${institutionConfig.color}`}>
        <span className="badge-icon">{institutionConfig.icon}</span>
        <span className="badge-text">{institutionConfig.text}</span>
      </span>
    );
  };

  const getStayBadge = (stayPreference, stayDays) => {
    if (stayPreference === 'With Stay' && stayDays > 0) {
      return (
        <span className="stay-badge with-stay">
          <span className="badge-icon">🏨</span>
          <span className="badge-text">{stayDays} day{stayDays !== 1 ? 's' : ''}</span>
        </span>
      );
    } else {
      return (
        <span className="stay-badge without-stay">
          <span className="badge-icon">🏠</span>
          <span className="badge-text">No Stay</span>
        </span>
      );
    }
  };

  // ==================== RENDER LOGIC ====================

  // Login Form (shown when not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="admin-content">
          <div className="login-container">
            <div className="login-card">
              <div className="login-header">
                <Lock size={40} className="login-icon" />
                <h1 className="login-title">Admin Login</h1>
                <p className="login-subtitle">ISTE INDUSTRY 5.0 Dashboard</p>
              </div>

              {error && (
                <div className="error-alert">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="login-form">
                <div className="input-group">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    placeholder="Admin Username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    required
                    className="modern-input"
                    autoComplete="username"
                  />
                </div>

                <div className="input-group">
                  <Lock className="input-icon" size={20} />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                    className="modern-input"
                    autoComplete="current-password"
                  />
                </div>

                <button 
                  type="submit" 
                  className="login-btn"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <RefreshCw className="animate-spin" size={18} />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      Login
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Admin Dashboard (shown when authenticated)
  return (
    <div className="admin-container">
      {/* Background Shapes */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="admin-content">
        {/* Header */}
        <div className="admin-header">
          <div className="header-main">
            <div className="admin-title-section">
              <Shield size={40} className="admin-icon" />
              <div>
                <h1 className="main-heading">
                  Admin <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="header-description">
                  Manage and approve registrations for ISTE INDUSTRY 5.0
                </p>
              </div>
            </div>
            
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
              Logout
            </button>
          </div>
          
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Registrations</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pending Approval</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.withAccommodation}</div>
              <div className="stat-label">With Accommodation</div>
              <div className="stat-subtext">
                ({stats.stayCapacity.remaining} spots left)
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">₹{stats.totalRevenue}</div>
              <div className="stat-label">Total Revenue</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.engineering}</div>
              <div className="stat-label">Engineering</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.polytechnic}</div>
              <div className="stat-label">Polytechnic</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-alert">
            <AlertCircle size={20} />
            <span>{error}</span>
            <button onClick={() => setError('')} className="error-close">×</button>
          </div>
        )}

        {/* Controls */}
        <div className="controls-section">
          <div className="search-filter">
            <div className="search-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, email, college, institution or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-group">
              <Filter size={16} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending ({stats.pending})</option>
                <option value="approved">Approved ({stats.approved})</option>
                <option value="rejected">Rejected ({stats.rejected})</option>
              </select>
            </div>
          </div>

          <div className="action-buttons-group">
            <button onClick={() => fetchRegistrations()} className="refresh-btn" disabled={loading}>
              <RefreshCw size={18} className={loading ? 'spin' : ''} />
              {loading ? 'Loading...' : 'Refresh'}
            </button>
            <button onClick={exportToCSV} className="export-btn" disabled={filteredUsers.length === 0}>
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="table-container">
          <div className="table-card">
            {loading ? (
              <div className="loading-state">
                <RefreshCw size={40} className="spin" />
                <p>Loading registrations...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="empty-state">
                <p>No registrations found matching your criteria.</p>
                {users.length > 0 && (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                    }} 
                    className="clear-filters-btn"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Institution</th>
                    <th>College</th>
                    <th>Accommodation</th>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-info">
                          <div className="user-name">{user.fullName}</div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </td>
                      <td>
                        {getInstitutionBadge(user.institution)}
                      </td>
                      <td>
                        <div className="college-info">
                          {user.college}
                          <div className="college-details-small">
                            {user.department} • {user.year}
                          </div>
                        </div>
                      </td>
                      <td>
                        {getStayBadge(user.stayPreference, user.stayDays)}
                      </td>
                      <td className="transaction-id">{user.transactionId}</td>
                      <td className="amount">₹{user.amount}</td>
                      <td>{getStatusBadge(user.status)}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleViewDetails(user)}
                            className="action-btn view-btn"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          
                          {/* Add Send Email button for approved/rejected users */}
                          {(user.status === 'approved' || user.status === 'rejected') && (
                            <button
                              onClick={() => handleSendEmail(user)}
                              className="action-btn email-btn"
                              title="Send Email via Gmail"
                            >
                              <Mail size={16} />
                            </button>
                          )}
                          
                          {user.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(user.id, user.fullName)}
                                className="action-btn approve-btn"
                                title="Approve"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  const reason = prompt('Enter rejection reason (optional):');
                                  if (reason !== null) {
                                    handleReject(user.id, user.fullName, reason);
                                  }
                                }}
                                className="action-btn reject-btn"
                                title="Reject"
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Registration Details</h2>
              <button onClick={() => setShowModal(false)} className="modal-close">
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="user-details-grid">
                <div className="detail-group">
                  <User size={18} className="detail-icon" />
                  <div>
                    <label>Full Name</label>
                    <p className="detail-value">{selectedUser.fullName}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <Mail size={18} className="detail-icon" />
                  <div>
                    <label>Email</label>
                    <p className="detail-value">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <Phone size={18} className="detail-icon" />
                  <div>
                    <label>Phone</label>
                    <p className="detail-value">{selectedUser.phone}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <GraduationCap size={18} className="detail-icon" />
                  <div>
                    <label>Institution Type</label>
                    <div className="detail-value">
                      {getInstitutionBadge(selectedUser.institution)}
                      <span className="institution-note">
                        Base Fee: {selectedUser.institution === 'Polytechnic' 
                          ? (selectedUser.isIsteMember === 'Yes' ? '₹250' : '₹300') // UPDATED
                          : (selectedUser.isIsteMember === 'Yes' ? '₹450' : '₹500')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="detail-group">
                  <Building2 size={18} className="detail-icon" />
                  <div>
                    <label>College</label>
                    <p className="detail-value">{selectedUser.college}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <CreditCard size={18} className="detail-icon" />
                  <div>
                    <label>Department & Year</label>
                    <p className="detail-value">{selectedUser.department} - {selectedUser.year}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <Shield size={18} className="detail-icon" />
                  <div>
                    <label>ISTE Member</label>
                    <p className="detail-value">
                      {selectedUser.isIsteMember === 'Yes' ? 
                        `Yes ${selectedUser.isteRegistrationNumber ? `(${selectedUser.isteRegistrationNumber})` : ''}` 
                        : 'No'}
                    </p>
                  </div>
                </div>

                <div className="detail-group">
                  <BedDouble size={18} className="detail-icon" />
                  <div>
                    <label>Accommodation</label>
                    <div className="detail-value">
                      <span>
                        {selectedUser.stayPreference === 'With Stay' ? 
                          `Yes (${selectedUser.stayDays} day${selectedUser.stayDays !== 1 ? 's' : ''})` 
                          : 'No'}
                      </span>
                      {selectedUser.stayPreference === 'With Stay' && selectedUser.stayDays > 0 && (
                        <>
                          <span className="stay-cost">
                            • Cost: ₹${217 * selectedUser.stayDays}
                          </span>
                          {selectedUser.stayDates && selectedUser.stayDates.length > 0 && (
                            <div className="stay-dates-list">
                              <CalendarDays size={14} />
                              <span>
                                {selectedUser.stayDates.map(dateStr => {
                                  const date = new Date(dateStr);
                                  return date.toLocaleDateString('en-IN', { 
                                    weekday: 'short', 
                                    day: 'numeric', 
                                    month: 'short' 
                                  });
                                }).join(', ')}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="detail-group">
                  <CreditCard size={18} className="detail-icon" />
                  <div>
                    <label>Transaction ID</label>
                    <p className="detail-value transaction-highlight">{selectedUser.transactionId}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <Calendar size={18} className="detail-icon" />
                  <div>
                    <label>Registration Date</label>
                    <p className="detail-value">{selectedUser.registrationDate}</p>
                  </div>
                </div>

                <div className="detail-group full-width">
                  <label>Payment Details</label>
                  <div className="payment-details">
                    <div className="payment-item">
                      <span>Base Fee ({selectedUser.institution}):</span>
                      <span>
                        ₹{selectedUser.institution === 'Polytechnic' 
                          ? (selectedUser.isIsteMember === 'Yes' ? '250' : '300') // UPDATED
                          : (selectedUser.isIsteMember === 'Yes' ? '450' : '500')}
                      </span>
                    </div>
                    {selectedUser.stayPreference === 'With Stay' && selectedUser.stayDays > 0 && (
                      <div className="payment-item">
                        <span>Accommodation ({selectedUser.stayDays} day{selectedUser.stayDays !== 1 ? 's' : ''}):</span>
                        <span>₹${217 * selectedUser.stayDays}</span>
                      </div>
                    )}
                    <div className="payment-total">
                      <span>Total Amount:</span>
                      <span>₹{selectedUser.amount}</span>
                    </div>
                    <div className="payment-status">
                      <span>Payment Status:</span>
                      <span className={`status-badge ${selectedUser.paymentStatus === 'verified' ? 'status-approved' : 'status-pending'}`}>
                        {selectedUser.paymentStatus === 'verified' ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="detail-group full-width">
                  <label>Registration Status</label>
                  <div className="status-display">
                    {getStatusBadge(selectedUser.status)}
                    <span className="status-note">
                      {selectedUser.status === 'pending' && 'Awaiting admin approval'}
                      {selectedUser.status === 'approved' && `Approved by ${selectedUser.approvedBy} on ${selectedUser.approvedAt}`}
                      {selectedUser.status === 'rejected' && `Rejected${selectedUser.rejectionReason ? `: ${selectedUser.rejectionReason}` : ''}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {selectedUser.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedUser.id, selectedUser.fullName);
                      setShowModal(false);
                    }}
                    className="btn-primary"
                  >
                    <CheckCircle size={18} />
                    Approve Registration
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt('Enter rejection reason (optional):');
                      if (reason !== null) {
                        handleReject(selectedUser.id, selectedUser.fullName, reason);
                        setShowModal(false);
                      }
                    }}
                    className="btn-secondary"
                  >
                    <XCircle size={18} />
                    Reject Registration
                  </button>
                </>
              )}
              
              {/* Add Send Email button in modal */}
              {(selectedUser.status === 'approved' || selectedUser.status === 'rejected') && (
                <button
                  onClick={() => {
                    handleSendEmail(selectedUser);
                    setShowModal(false);
                  }}
                  className="btn-email"
                >
                  <Mail size={18} />
                  Send Email via Gmail
                </button>
              )}
              
              <button onClick={() => setShowModal(false)} className="btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;