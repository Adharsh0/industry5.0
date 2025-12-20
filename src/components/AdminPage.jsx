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
  BedDouble
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
    polytechnic: 0
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
      polytechnic: 0
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
        // CORRECTED MAPPING with better field handling
        const mappedUsers = result.data.map(user => {
          const institution = user.institution || 'Engineering';
          const stayPreference = user.stayPreference || 'Without Stay';
          const stayDays = user.stayDays || (stayPreference === 'With Stay' ? 1 : 0);
          
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
            stayDays: stayDays,
            transactionId: user.transactionId || '',
            amount: user.totalAmount || 0,
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
        
        // Fetch statistics
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

  // Fetch statistics
  const fetchStats = async (token = authToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const institutionStats = result.data.institutionStats || [];
          const engineering = institutionStats.find(s => s._id === 'Engineering')?.count || 0;
          const polytechnic = institutionStats.find(s => s._id === 'Polytechnic')?.count || 0;
          
          const stayStats = result.data.stayPreferenceStats || [];
          const withStay = stayStats.find(s => s._id === 'With Stay')?.count || 0;
          
          setStats({
            total: result.data.totalRegistrations || 0,
            totalRevenue: result.data.totalRevenue || 0,
            withAccommodation: withStay,
            pending: result.data.pendingRegistrations || 0,
            approved: result.data.approvedRegistrations || 0,
            rejected: result.data.rejectedRegistrations || 0,
            engineering: engineering,
            polytechnic: polytechnic
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
      'ISTE Member', 'ISTE Reg No', 'Accommodation', 'Stay Days', 'Transaction ID', 
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
                        Base Fee: {selectedUser.institution === 'Polytechnic' ? '₹350' : '₹500'}
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
                    <p className="detail-value">
                      {selectedUser.stayPreference === 'With Stay' ? 
                        `Yes (${selectedUser.stayDays} day${selectedUser.stayDays !== 1 ? 's' : ''})` 
                        : 'No'}
                      {selectedUser.stayPreference === 'With Stay' && selectedUser.stayDays > 0 && (
                        <span className="stay-cost">
                          • Cost: ₹{150 * selectedUser.stayDays}
                        </span>
                      )}
                    </p>
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
                      <span>₹{selectedUser.institution === 'Polytechnic' ? '350' : '500'}</span>
                    </div>
                    {selectedUser.stayPreference === 'With Stay' && selectedUser.stayDays > 0 && (
                      <div className="payment-item">
                        <span>Accommodation ({selectedUser.stayDays} day{selectedUser.stayDays !== 1 ? 's' : ''}):</span>
                        <span>₹{150 * selectedUser.stayDays}</span>
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