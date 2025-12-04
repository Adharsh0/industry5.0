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
  Users,
  DollarSign,
  Home,
  RefreshCw,
  AlertCircle,
  LogIn,
  Lock,
  LogOut
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
    rejected: 0
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
        console.log('✅ Admin login successful');
        fetchRegistrations(result.token);
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Admin logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthToken('');
    localStorage.removeItem('adminToken');
    setUsers([]);
    setFilteredUsers([]);
  };

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setAuthToken(storedToken);
      setIsAuthenticated(true);
      fetchRegistrations(storedToken);
    }
  }, []);

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
        setError('Session expired. Please login again.');
        return;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Map backend data to match our frontend structure
        const mappedUsers = result.data.map(user => ({
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          college: user.college,
          department: user.department,
          year: user.year,
          isIsteMember: user.isIsteMember,
          isteRegistrationNumber: user.isteRegistrationNumber || '',
          stayPreference: user.stayPreference,
          foodPreference: 'no', // Not in current schema, set default
          transactionId: user.transactionId,
          amount: user.totalAmount,
          status: user.registrationStatus || 'pending', // Use registrationStatus from backend
          registrationStatus: user.registrationStatus,
          paymentStatus: user.paymentStatus,
          registrationDate: new Date(user.registrationDate).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }),
          paymentDate: new Date(user.registrationDate).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }),
          approvedBy: user.approvedBy || '',
          approvedAt: user.approvedAt ? new Date(user.approvedAt).toLocaleDateString('en-IN') : '',
          rejectionReason: user.rejectionReason || ''
        }));
        
        setUsers(mappedUsers);
        setFilteredUsers(mappedUsers);
        
        // Fetch statistics
        fetchStats(token);
      } else {
        throw new Error(result.message || 'Failed to fetch registrations');
      }
    } catch (err) {
      console.error('Error fetching registrations:', err);
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
          setStats({
            total: result.data.totalRegistrations,
            totalRevenue: result.data.totalRevenue,
            withAccommodation: result.data.stayPreferenceStats?.find(s => s._id === 'yes')?.count || 0,
            pending: result.data.pendingRegistrations,
            approved: result.data.approvedRegistrations,
            rejected: result.data.rejectedRegistrations
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
          approvedBy: 'Admin' // In production, use actual admin name
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
              approvedAt: new Date().toLocaleDateString('en-IN')
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
              approvedAt: new Date().toLocaleDateString('en-IN')
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
              rejectionReason: reason || 'Registration rejected by admin'
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
              rejectionReason: reason || 'Registration rejected by admin'
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
        user.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
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
      'Name', 'Email', 'Phone', 'College', 'Department', 'Year', 
      'ISTE Member', 'ISTE Reg No', 'Accommodation', 'Transaction ID', 
      'Amount', 'Status', 'Registration Date', 'Payment Status', 'Approved By', 'Approval Date'
    ];
    
    const csvData = filteredUsers.map(user => [
      user.fullName,
      user.email,
      user.phone,
      user.college,
      user.department,
      user.year,
      user.isIsteMember,
      user.isteRegistrationNumber || '',
      user.stayPreference,
      user.transactionId,
      `₹${user.amount}`,
      user.status,
      user.registrationDate,
      user.paymentStatus,
      user.approvedBy || '',
      user.approvedAt || ''
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

  // Login Form
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

                <div className="login-note">
                  <p><strong>Default Credentials:</strong></p>
                  <p>Username: <code>admin</code></p>
                  <p>Password: <code>iste@2024</code></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Admin Dashboard
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
              <Users size={24} className="stat-icon" />
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Registrations</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon pending">⏳</div>
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pending Approval</div>
            </div>
            <div className="stat-card">
              <Home size={24} className="stat-icon" />
              <div className="stat-number">{stats.withAccommodation}</div>
              <div className="stat-label">With Accommodation</div>
            </div>
            <div className="stat-card">
              <DollarSign size={24} className="stat-icon" />
              <div className="stat-number">₹{stats.totalRevenue}</div>
              <div className="stat-label">Total Revenue</div>
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
                placeholder="Search by name, email, college or transaction ID..."
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
                    <th>College</th>
                    <th>Department</th>
                    <th>ISTE Member</th>
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
                        <div className="college-info">
                          {user.college}
                        </div>
                      </td>
                      <td>{user.department}</td>
                      <td>
                        <span className={`member-badge ${user.isIsteMember === 'yes' ? 'member-yes' : 'member-no'}`}>
                          {user.isIsteMember === 'yes' ? 'Yes' : 'No'}
                          {user.isIsteMember === 'yes' && user.isteRegistrationNumber && (
                            <span className="iste-number">({user.isteRegistrationNumber})</span>
                          )}
                        </span>
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
                      {selectedUser.isIsteMember === 'yes' ? `Yes (${selectedUser.isteRegistrationNumber || 'No ID'})` : 'No'}
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
                  <label>Services</label>
                  <div className="services-list">
                    <span className={`service-badge ${selectedUser.stayPreference === 'yes' ? 'active' : ''}`}>
                      Accommodation: {selectedUser.stayPreference === 'yes' ? 'Yes (₹150)' : 'No'}
                    </span>
                  </div>
                </div>

                <div className="detail-group full-width">
                  <label>Payment Details</label>
                  <div className="payment-details">
                    <div className="payment-item">
                      <span>Registration Fee:</span>
                      <span>₹500</span>
                    </div>
                    {selectedUser.stayPreference === 'yes' && (
                      <div className="payment-item">
                        <span>Accommodation:</span>
                        <span>₹150</span>
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