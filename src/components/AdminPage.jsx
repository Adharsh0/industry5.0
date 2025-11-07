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
  Shield
} from 'lucide-react';
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    // This would typically come from your backend
    const mockUsers = [
      {
        id: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+919876543210',
        college: 'Mar Baselios College of Engineering',
        department: 'Computer Science',
        year: '3rd Year',
        isIsteMember: 'yes',
        isteRegistrationNumber: 'ISTE12345',
        stayPreference: 'yes',
        foodPreference: 'yes',
        transactionId: 'TXN001234',
        amount: 800,
        status: 'pending', // pending, approved, rejected
        registrationDate: '2024-01-15',
        paymentDate: '2024-01-15'
      },
      {
        id: 2,
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+919876543211',
        college: 'College of Engineering Trivandrum',
        department: 'Electronics',
        year: '4th Year',
        isIsteMember: 'no',
        isteRegistrationNumber: '',
        stayPreference: 'no',
        foodPreference: 'yes',
        transactionId: 'TXN001235',
        amount: 300,
        status: 'approved',
        registrationDate: '2024-01-14',
        paymentDate: '2024-01-14'
      },
      {
        id: 3,
        fullName: 'Raj Kumar',
        email: 'raj@example.com',
        phone: '+919876543212',
        college: 'Government Engineering College',
        department: 'Mechanical',
        year: '2nd Year',
        isIsteMember: 'yes',
        isteRegistrationNumber: 'ISTE12346',
        stayPreference: 'yes',
        foodPreference: 'no',
        transactionId: 'TXN001236',
        amount: 500,
        status: 'rejected',
        registrationDate: '2024-01-13',
        paymentDate: '2024-01-13'
      }
    ];
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

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

  const handleApprove = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: 'approved' } : user
    ));
  };

  const handleReject = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: 'rejected' } : user
    ));
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'College', 'Department', 'Year', 'ISTE Member', 'Transaction ID', 'Amount', 'Status'];
    const csvData = filteredUsers.map(user => [
      user.fullName,
      user.email,
      user.phone,
      user.college,
      user.department,
      user.year,
      user.isIsteMember,
      user.transactionId,
      user.amount,
      user.status
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
      pending: { color: 'bg-yellow-500', text: 'Pending' },
      approved: { color: 'bg-green-500', text: 'Approved' },
      rejected: { color: 'bg-red-500', text: 'Rejected' }
    };
    
    const config = statusConfig[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.color} text-white`}>
        {config.text}
      </span>
    );
  };

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
          
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-number">{users.length}</div>
              <div className="stat-label">Total Registrations</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{users.filter(u => u.status === 'pending').length}</div>
              <div className="stat-label">Pending Approval</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{users.filter(u => u.status === 'approved').length}</div>
              <div className="stat-label">Approved</div>
            </div>
          </div>
        </div>

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
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <button onClick={exportToCSV} className="export-btn">
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {/* Users Table */}
        <div className="table-container">
          <div className="table-card">
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
                    <td>{user.college}</td>
                    <td>{user.department}</td>
                    <td>
                      <span className={`member-badge ${user.isIsteMember === 'yes' ? 'member-yes' : 'member-no'}`}>
                        {user.isIsteMember === 'yes' ? 'Yes' : 'No'}
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
                              onClick={() => handleApprove(user.id)}
                              className="action-btn approve-btn"
                              title="Approve"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              onClick={() => handleReject(user.id)}
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

            {filteredUsers.length === 0 && (
              <div className="empty-state">
                <p>No registrations found matching your criteria.</p>
              </div>
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
                  <User size={18} />
                  <div>
                    <label>Full Name</label>
                    <p>{selectedUser.fullName}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <Mail size={18} />
                  <div>
                    <label>Email</label>
                    <p>{selectedUser.email}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <Phone size={18} />
                  <div>
                    <label>Phone</label>
                    <p>{selectedUser.phone}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <Building2 size={18} />
                  <div>
                    <label>College</label>
                    <p>{selectedUser.college}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <CreditCard size={18} />
                  <div>
                    <label>Department & Year</label>
                    <p>{selectedUser.department} - {selectedUser.year}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <Shield size={18} />
                  <div>
                    <label>ISTE Member</label>
                    <p>{selectedUser.isIsteMember === 'yes' ? `Yes (${selectedUser.isteRegistrationNumber})` : 'No'}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <CreditCard size={18} />
                  <div>
                    <label>Transaction ID</label>
                    <p className="transaction-highlight">{selectedUser.transactionId}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <Calendar size={18} />
                  <div>
                    <label>Registration Date</label>
                    <p>{selectedUser.registrationDate}</p>
                  </div>
                </div>

                <div className="detail-group full-width">
                  <label>Services</label>
                  <div className="services-list">
                    <span className={`service-badge ${selectedUser.stayPreference === 'yes' ? 'active' : ''}`}>
                      Accommodation: {selectedUser.stayPreference === 'yes' ? 'Yes (₹500)' : 'No'}
                    </span>
                    <span className={`service-badge ${selectedUser.foodPreference === 'yes' ? 'active' : ''}`}>
                      Food: {selectedUser.foodPreference === 'yes' ? 'Yes (₹300)' : 'No'}
                    </span>
                  </div>
                </div>

                <div className="detail-group full-width">
                  <label>Total Amount</label>
                  <p className="total-amount">₹{selectedUser.amount}</p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {selectedUser.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedUser.id);
                      setShowModal(false);
                    }}
                    className="btn-primary"
                  >
                    <CheckCircle size={18} />
                    Approve Registration
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedUser.id);
                      setShowModal(false);
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