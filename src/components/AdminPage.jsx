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
  CalendarDays,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Users2,
  FileSpreadsheet,
  Loader2
} from 'lucide-react';
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
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
      total: 350,
      used: 0,
      remaining: 350
    }
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [pageSize] = useState(50);

  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [authToken, setAuthToken] = useState('');

  // Ambassador code filter
  const [ambassadorFilter, setAmbassadorFilter] = useState('all');
  
  // Ambassador count state
  const [ambassadorCount, setAmbassadorCount] = useState(null);
  const [searchedAmbassadorCode, setSearchedAmbassadorCode] = useState('');

  // Google Sheets state
  const [isExportingToSheets, setIsExportingToSheets] = useState(false);
  const [sheetsExportStatus, setSheetsExportStatus] = useState('');

  // API Base URL
  const API_BASE_URL = 'https://iste-backend-fcd3.onrender.com/api';

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('adminToken');
      const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      
      if (storedToken && isLoggedIn) {
        setAuthToken(storedToken);
        setIsAuthenticated(true);
        fetchRegistrations(storedToken, 1);
      } else {
        setIsAuthenticated(false);
        setLoading(false);
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
        fetchRegistrations(result.token, 1);
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
    setCurrentPage(1);
    setTotalPages(1);
    setTotalRegistrations(0);
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
        total: 350,
        used: 0,
        remaining: 350
      }
    });
    setAmbassadorCount(null);
    setSearchedAmbassadorCode('');
    setError('');
    setLoginData({ username: '', password: '' });
  };

  // Fetch ambassador code statistics
  const fetchAmbassadorStats = async (token = authToken, code = searchTerm.trim()) => {
    if (!code || code.length < 2) {
      setAmbassadorCount(null);
      setSearchedAmbassadorCode('');
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/ambassador-stats?code=${encodeURIComponent(code)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setAmbassadorCount(result.data);
          setSearchedAmbassadorCode(code);
        } else {
          setAmbassadorCount(null);
          setSearchedAmbassadorCode('');
        }
      } else {
        setAmbassadorCount(null);
        setSearchedAmbassadorCode('');
      }
    } catch (err) {
      console.error('Error fetching ambassador stats:', err);
      setAmbassadorCount(null);
      setSearchedAmbassadorCode('');
    }
  };

  // Fetch registrations with pagination
  const fetchRegistrations = async (token = authToken, page = currentPage) => {
    try {
      setLoading(true);
      setError('');
      
      // Check if search term looks like an ambassador code (starts with letters)
      const trimmedSearchTerm = searchTerm.trim();
      const isAmbassadorCodeSearch = /^[a-zA-Z]/.test(trimmedSearchTerm);
      
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
        search: trimmedSearchTerm || '',
        status: statusFilter === 'all' ? '' : statusFilter,
        ...(ambassadorFilter === 'withCode' && { ambassadorCode: 'exists' }),
        ...(ambassadorFilter === 'withoutCode' && { ambassadorCode: 'empty' })
      });
      
      const response = await fetch(
        `${API_BASE_URL}/admin/registrations?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.status === 401) {
        handleLogout();
        setError('Your session has expired. Please login again.');
        return;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        const mappedUsers = result.data.map(user => {
          const institution = user.institution || 'Engineering';
          const stayPreference = user.stayPreference || 'Without Stay';
          const stayDates = user.stayDates || [];
          const stayDays = stayDates.length;
          const ambassadorCode = user.ambassadorCode || '';
          
          let baseFee;
          if (institution === 'Polytechnic') {
            baseFee = user.isIsteMember === 'Yes' ? 250 : 300;
          } else {
            baseFee = user.isIsteMember === 'Yes' ? 450 : 500;
          }
          
          const stayFee = stayDays * 217;
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
            ambassadorCode: ambassadorCode,
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
        
        setUsers(mappedUsers);
        setTotalPages(result.totalPages || 1);
        setTotalRegistrations(result.total || 0);
        
        // Fetch general statistics
        fetchStats(token);
        
        // Fetch ambassador stats if search looks like ambassador code
        if (isAmbassadorCodeSearch && trimmedSearchTerm) {
          fetchAmbassadorStats(token, trimmedSearchTerm);
        } else {
          setAmbassadorCount(null);
          setSearchedAmbassadorCode('');
        }
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

  // Fetch statistics and stay availability
  const fetchStats = async (token = authToken) => {
    try {
      const statsResponse = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const availabilityResponse = await fetch(`${API_BASE_URL}/stay-availability`);
      
      if (statsResponse.ok && availabilityResponse.ok) {
        const statsResult = await statsResponse.json();
        const availabilityResult = await availabilityResponse.json();
        
        if (statsResult.success && availabilityResult.success) {
          const availabilityData = availabilityResult.data;
          
          const institutionStats = statsResult.data.institutionStats || [];
          const engineering = institutionStats.find(s => s._id === 'Engineering')?.count || 0;
          const polytechnic = institutionStats.find(s => s._id === 'Polytechnic')?.count || 0;
          
          setStats({
            total: statsResult.data.totalRegistrations || 0,
            totalRevenue: statsResult.data.totalRevenue || 0,
            withAccommodation: availabilityData.used || 0,
            pending: statsResult.data.pendingRegistrations || 0,
            approved: statsResult.data.approvedRegistrations || 0,
            rejected: statsResult.data.rejectedRegistrations || 0,
            engineering: engineering,
            polytechnic: polytechnic,
            stayCapacity: {
              total: availabilityData.totalCapacity || 350,
              used: availabilityData.used || 0,
              remaining: availabilityData.remaining || 350
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
          // Refresh current page
          fetchRegistrations(authToken, currentPage);
          fetchStats();
          
          // Update selected user if open
          if (selectedUser && selectedUser.id === userId) {
            const updatedSelectedUser = { 
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
            };
            setSelectedUser(updatedSelectedUser);
          }
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
          // Refresh current page
          fetchRegistrations(authToken, currentPage);
          fetchStats();
          
          // Update selected user if open
          if (selectedUser && selectedUser.id === userId) {
            const updatedSelectedUser = { 
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
            };
            setSelectedUser(updatedSelectedUser);
          }
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
• Ambassador Code: ${user.ambassadorCode || 'None'}
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
• Ambassador Code: ${user.ambassadorCode || 'None'}
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

Note: Your stay accommodation spots (if any) have been released and are now available for others.

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
• Ambassador Code: ${user.ambassadorCode || 'None'}
• Department: ${user.department}
• Transaction ID: ${user.transactionId}
• Status: PENDING ⏳

Note: Stay accommodation spots (if selected) are reserved until final approval/rejection.

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
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(user.email)}&su=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}&cc=${encodeURIComponent(adminEmail)}}`;
    
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  // Handle search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        setCurrentPage(1); // Reset to page 1 when searching
        fetchRegistrations(authToken, 1);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter, ambassadorFilter]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchRegistrations(authToken, newPage);
    }
  };

  // Export to CSV (current page only)
  const exportToCSV = () => {
    const headers = [
      'Name', 'Email', 'Phone', 'Institution Type', 'College', 'Department', 'Year', 
      'ISTE Member', 'ISTE Reg No', 'Ambassador Code', 'Accommodation', 'Stay Days', 'Stay Dates', 
      'Transaction ID', 'Amount', 'Status', 'Registration Date', 'Payment Status', 
      'Approved By', 'Approval Date', 'Rejection Reason'
    ];
    
    const csvData = users.map(user => [
      user.fullName,
      user.email,
      user.phone,
      user.institution,
      user.college,
      user.department,
      user.year,
      user.isIsteMember,
      user.isteRegistrationNumber || '',
      user.ambassadorCode || '',
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
    a.download = `iste-registrations-page${currentPage}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Export ALL registrations to Google Sheets
  const exportToGoogleSheets = async (exportType = 'all') => {
    setIsExportingToSheets(true);
    setSheetsExportStatus('Preparing data for export...');

    try {
      // First, fetch ALL registrations (not just current page)
      let query = '';
      
      if (exportType === 'filtered') {
        // Build query for current filters
        const params = new URLSearchParams();
        
        if (statusFilter !== 'all') {
          params.append('status', statusFilter);
        }
        
        if (searchTerm.trim()) {
          params.append('search', searchTerm.trim());
        }
        
        if (ambassadorFilter === 'withCode') {
          params.append('ambassadorCode', 'exists');
        } else if (ambassadorFilter === 'withoutCode') {
          params.append('ambassadorCode', 'empty');
        }
        
        query = params.toString() ? `?${params.toString()}` : '';
      }

      setSheetsExportStatus('Fetching registrations...');
      
      // Get total count first to show progress
      const countResponse = await fetch(
        `${API_BASE_URL}/admin/registrations${query}`,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );
      
      const countResult = await countResponse.json();
      const totalRegistrationsCount = countResult.total || 0;
      
      if (totalRegistrationsCount === 0) {
        setSheetsExportStatus('No data to export');
        setTimeout(() => {
          setSheetsExportStatus('');
          setIsExportingToSheets(false);
        }, 2000);
        return;
      }
      
      // Fetch all registrations in batches
      const allRegistrations = [];
      const limit = 100; // Fetch 100 at a time
      const totalPages = Math.ceil(totalRegistrationsCount / limit);
      
      for (let page = 1; page <= totalPages; page++) {
        setSheetsExportStatus(`Fetching page ${page} of ${totalPages}...`);
        
        const response = await fetch(
          `${API_BASE_URL}/admin/registrations${query}${query ? '&' : '?'}page=${page}&limit=${limit}`,
          {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          }
        );
        
        const result = await response.json();
        
        if (result.success && result.data) {
          allRegistrations.push(...result.data);
        }
        
        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setSheetsExportStatus('Formatting data for Google Sheets...');
      
      // Format data for Google Sheets
      const sheetData = allRegistrations.map(user => {
        const institution = user.institution || 'Engineering';
        const stayPreference = user.stayPreference || 'Without Stay';
        const stayDates = user.stayDates || [];
        const stayDays = stayDates.length;
        const ambassadorCode = user.ambassadorCode || '';
        
        let baseFee;
        if (institution === 'Polytechnic') {
          baseFee = user.isIsteMember === 'Yes' ? 250 : 300;
        } else {
          baseFee = user.isIsteMember === 'Yes' ? 450 : 500;
        }
        
        const stayFee = stayDays * 217;
        const totalAmount = user.totalAmount || (baseFee + stayFee);
        
        return {
          fullName: user.fullName || '',
          email: user.email || '',
          phone: user.phone || '',
          institution: institution,
          college: user.college || '',
          department: user.department || '',
          year: user.year || '',
          isIsteMember: user.isIsteMember || 'No',
          isteRegistrationNumber: user.isteRegistrationNumber || '',
          ambassadorCode: ambassadorCode,
          stayPreference: stayPreference,
          stayDays: stayDays,
          stayDates: stayDates.join(', '),
          transactionId: user.transactionId || '',
          amount: totalAmount,
          status: user.registrationStatus || 'pending',
          registrationDate: new Date(user.registrationDate || user.createdAt).toLocaleString('en-IN'),
          paymentStatus: user.paymentStatus || 'pending',
          approvedBy: user.approvedBy || '',
          approvedAt: user.approvedAt ? new Date(user.approvedAt).toLocaleString('en-IN') : '',
          rejectedAt: user.rejectedAt ? new Date(user.rejectedAt).toLocaleString('en-IN') : '',
          rejectionReason: user.rejectionReason || '',
          baseFee: baseFee,
          stayFee: stayFee
        };
      });
      
      setSheetsExportStatus('Creating Google Sheet...');
      
      // Open Google Sheets with pre-filled data
      const headers = [
        'Full Name', 'Email', 'Phone', 'Institution Type', 'College', 'Department', 'Year',
        'ISTE Member', 'ISTE Reg No', 'Ambassador Code', 'Accommodation', 'Stay Days', 'Stay Dates',
        'Transaction ID', 'Total Amount', 'Status', 'Registration Date', 'Payment Status',
        'Approved By', 'Approval Date', 'Rejection Date', 'Rejection Reason', 'Base Fee', 'Stay Fee'
      ];
      
      // Convert data to CSV format
      const csvData = sheetData.map(user => [
        user.fullName,
        user.email,
        user.phone,
        user.institution,
        user.college,
        user.department,
        user.year,
        user.isIsteMember,
        user.isteRegistrationNumber,
        user.ambassadorCode,
        user.stayPreference,
        user.stayDays,
        user.stayDates,
        user.transactionId,
        user.amount,
        user.status,
        user.registrationDate,
        user.paymentStatus,
        user.approvedBy,
        user.approvedAt,
        user.rejectedAt,
        user.rejectionReason,
        user.baseFee,
        user.stayFee
      ]);
      
      const csvContent = [headers, ...csvData]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
      
      // Create a temporary file for Google Sheets import
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      // Open Google Sheets import page
      const googleSheetsUrl = `https://docs.google.com/spreadsheets/u/0/create?usp=sheets_home&create=${encodeURIComponent(`ISTE_Registrations_${exportType === 'all' ? 'All' : 'Filtered'}_${new Date().toISOString().split('T')[0]}`)}`;
      
      window.open(googleSheetsUrl, '_blank');
      
      // Create download link for CSV
      const a = document.createElement('a');
      a.href = url;
      a.download = `iste-registrations-${exportType === 'all' ? 'all' : 'filtered'}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      
      setSheetsExportStatus(`✅ Exported ${allRegistrations.length} registrations to Google Sheets`);
      
      setTimeout(() => {
        setSheetsExportStatus('');
        setIsExportingToSheets(false);
      }, 3000);
      
    } catch (error) {
      console.error('Google Sheets export error:', error);
      setSheetsExportStatus('❌ Export failed. Please try again.');
      setIsExportingToSheets(false);
      
      setTimeout(() => {
        setSheetsExportStatus('');
      }, 3000);
    }
  };

  // Quick export functions
  const handleQuickExportAll = () => exportToGoogleSheets('all');
  const handleQuickExportFiltered = () => exportToGoogleSheets('filtered');

  // Render pagination controls
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination-controls">
        <div className="pagination-info">
          Showing page {currentPage} of {totalPages} • Total: {totalRegistrations} registrations
        </div>
        
        <div className="pagination-buttons">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="pagination-btn"
            title="First page"
          >
            <ChevronsLeft size={16} />
          </button>
          
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
            title="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          
          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="pagination-number"
              >
                1
              </button>
              {startPage > 2 && <span className="pagination-ellipsis">...</span>}
            </>
          )}
          
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`pagination-number ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="pagination-number"
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
            title="Next page"
          >
            <ChevronRight size={16} />
          </button>
          
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
            title="Last page"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    );
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

  const getAmbassadorBadge = (ambassadorCode) => {
    if (ambassadorCode && ambassadorCode.trim() !== '') {
      return (
        <span className="ambassador-badge">
          <span className="badge-icon">👥</span>
          <span className="badge-text">{ambassadorCode}</span>
        </span>
      );
    }
    return (
      <span className="ambassador-badge empty">
        <span className="badge-icon">—</span>
        <span className="badge-text">No Code</span>
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

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
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
                <div className="header-note">
                  <AlertCircle size={14} />
                  <span>Stay capacity: 350 spots (Increased from 250)</span>
                </div>
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
                ({stats.stayCapacity.remaining} of 350 spots left)
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

        {/* Google Sheets Export Status */}
        {sheetsExportStatus && (
          <div className={`sheets-export-status ${sheetsExportStatus.includes('❌') ? 'error' : sheetsExportStatus.includes('✅') ? 'success' : 'info'}`}>
            {isExportingToSheets ? (
              <Loader2 size={16} className="spin" />
            ) : sheetsExportStatus.includes('✅') ? (
              <CheckCircle size={16} />
            ) : sheetsExportStatus.includes('❌') ? (
              <AlertCircle size={16} />
            ) : (
              <FileSpreadsheet size={16} />
            )}
            <span>{sheetsExportStatus}</span>
          </div>
        )}

        {/* Ambassador Code Count Display */}
        {ambassadorCount && searchedAmbassadorCode && (
          <div className="ambassador-count-container">
            <div className="ambassador-count-card">
              <div className="ambassador-count-header">
                <Users2 size={24} />
                <span className="ambassador-code-display">
                  Ambassador Code: <strong>{searchedAmbassadorCode.toUpperCase()}</strong>
                </span>
              </div>
              <div className="ambassador-count-stats">
                <div className="count-stat">
                  <div className="count-number">{ambassadorCount.total || 0}</div>
                  <div className="count-label">Total Registrations</div>
                </div>
                <div className="count-stat">
                  <div className="count-number">{ambassadorCount.approved || 0}</div>
                  <div className="count-label">Approved</div>
                </div>
                <div className="count-stat">
                  <div className="count-number">{ambassadorCount.pending || 0}</div>
                  <div className="count-label">Pending</div>
                </div>
                <div className="count-stat">
                  <div className="count-number">{ambassadorCount.rejected || 0}</div>
                  <div className="count-label">Rejected</div>
                </div>
                <div className="count-stat">
                  <div className="count-number">₹{ambassadorCount.totalRevenue || 0}</div>
                  <div className="count-label">Total Revenue</div>
                </div>
              </div>
              {ambassadorCount.averageRevenue && (
                <div className="count-footnote">
                  Avg. revenue per registration: ₹{ambassadorCount.averageRevenue}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="controls-section">
          <div className="search-filter">
            <div className="search-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, email, college, institution, ambassador code or transaction ID..."
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

            <div className="filter-group">
              <Users size={16} />
              <select
                value={ambassadorFilter}
                onChange={(e) => setAmbassadorFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Ambassador Codes</option>
                <option value="withCode">With Code</option>
                <option value="withoutCode">Without Code</option>
              </select>
            </div>
          </div>

          <div className="action-buttons-group">
            <button onClick={() => fetchRegistrations(authToken, currentPage)} className="refresh-btn" disabled={loading}>
              <RefreshCw size={18} className={loading ? 'spin' : ''} />
              {loading ? 'Loading...' : 'Refresh'}
            </button>
            
            <div className="sheets-export-dropdown">
              <button 
                className="sheets-export-btn" 
                disabled={isExportingToSheets || totalRegistrations === 0}
              >
                <FileSpreadsheet size={18} />
                Export to Sheets
              </button>
              <div className="sheets-export-options">
                <button 
                  onClick={handleQuickExportAll}
                  disabled={isExportingToSheets || totalRegistrations === 0}
                >
                  Export All ({totalRegistrations} registrations)
                </button>
                <button 
                  onClick={handleQuickExportFiltered}
                  disabled={isExportingToSheets || users.length === 0}
                >
                  Export Filtered ({users.length} registrations)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Info */}
        {renderPagination()}

        {/* Users Table */}
        <div className="table-container">
          <div className="table-card">
            {loading ? (
              <div className="loading-state">
                <RefreshCw size={40} className="spin" />
                <p>Loading registrations...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="empty-state">
                <p>No registrations found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setAmbassadorFilter('all');
                    setCurrentPage(1);
                    fetchRegistrations(authToken, 1);
                  }} 
                  className="clear-filters-btn"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Institution</th>
                      <th>College</th>
                      <th>Ambassador Code</th>
                      <th>Accommodation</th>
                      <th>Transaction ID</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
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
                          {getAmbassadorBadge(user.ambassadorCode)}
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
                
                {/* Pagination at bottom */}
                {renderPagination()}
              </>
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
                          ? (selectedUser.isIsteMember === 'Yes' ? '₹250' : '₹300')
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
                  <Users size={18} className="detail-icon" />
                  <div>
                    <label>Campus Ambassador Code</label>
                    <p className="detail-value">
                      {selectedUser.ambassadorCode && selectedUser.ambassadorCode.trim() !== '' 
                        ? selectedUser.ambassadorCode 
                        : 'None'}
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
                            • Cost: ₹{217 * selectedUser.stayDays}
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
                          ? (selectedUser.isIsteMember === 'Yes' ? '250' : '300')
                          : (selectedUser.isIsteMember === 'Yes' ? '450' : '500')}
                      </span>
                    </div>
                    {selectedUser.stayPreference === 'With Stay' && selectedUser.stayDays > 0 && (
                      <div className="payment-item">
                        <span>Accommodation ({selectedUser.stayDays} day{selectedUser.stayDays !== 1 ? 's' : ''}):</span>
                        <span>₹{217 * selectedUser.stayDays}</span>
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
                      {selectedUser.status === 'pending' && 'Awaiting admin approval. Stay spots are reserved.'}
                      {selectedUser.status === 'approved' && `Approved by ${selectedUser.approvedBy} on ${selectedUser.approvedAt}. Stay spots confirmed.`}
                      {selectedUser.status === 'rejected' && `Rejected${selectedUser.rejectionReason ? `: ${selectedUser.rejectionReason}` : ''}. Stay spots have been released.`}
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
                    <span className="action-note">(Releases stay spots)</span>
                  </button>
                </>
              )}
              
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