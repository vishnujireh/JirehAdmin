import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RiArrowLeftSLine } from 'react-icons/ri';

interface UserType {
  _id: string;
  firstName: string;
  lastName: string;

  userStatus: 'Active' | 'Inactive';
}

const AddUser = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  const [country, setCountry] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [userType, setUserType] = useState('');
  const [reportingUser, setReportingUser] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [workingShift, setWorkingShift] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const isEditMode = Boolean(id);

  // ✅ Fetch existing user when editing
  useEffect(() => {
    if (isEditMode && id) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/api/admin/getUser?id=${id}`);
          const data = await response.json();
          if (data.success && data.data) {
            const user = data.data;
            setCountry(user.country || '');
            setEmployeeId(user.employeeId || '');
            setUserType(user.userType || '');
            setReportingUser(user.reportingUser || '');
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setEmail(user.email || '');
            setMobile(user.mobile || '');
            setWorkingShift(user.workingShift || '');
            setUserStatus(user.userStatus || '');
            setUserPassword(user.userPassword || '');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }
  }, [isEditMode, id]);

  // ✅ Handle submit for Add / Update
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        country,
        employeeId,
        userType,
        reportingUser,
        firstName,
        lastName,
        email,
        mobile,
        workingShift,
        userStatus,
        userPassword,
      };

      const url = isEditMode ? '/api/admin/updateUser' : '/api/admin/addUser';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isEditMode ? { id, ...payload } : payload),
      });

      if (!res.ok) throw new Error(`Failed: ${res.status}`);

      const data = await res.json();
      console.log('✅ Success:', data);

      alert(isEditMode ? 'User updated successfully!' : 'User added successfully!');
      router.push('/usermanagement');
    } catch (err) {
      console.error('❌ Error saving user:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch all users for Reporting User dropdown
  useEffect(() => {
    const fetchingUsers = async () => {
      try {
        const response = await fetch('/api/admin/userList');
        const data = await response.json();
        setUsers(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      }
    };

    fetchingUsers();
  }, []);

  const goBack = () => router.back();

  return (
    <div className="page-main-container">
      <div className="d-flex justify-content-between">
        <h5 className="page-header">{isEditMode ? 'Edit User' : 'Add User'}</h5>
        <button className="btn back-btn" onClick={goBack}>
          <RiArrowLeftSLine /> Back
        </button>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Country */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Country</label>
                    <select
                      className="form-control text-dark form-select w-100"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      <option value="">Select Country</option>
                      <option>India</option>
                      <option>USA</option>
                      <option>UK</option>
                    </select>
                  </div>

                  {/* Employee ID */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Employee ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      required
                    />
                  </div>

                  {/* User Type */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>User Type</label>
                    <select
                      className="form-control text-dark form-select w-100"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      required
                    >
                      <option value="">Select User Type</option>
                      <option>HR</option>
                      <option>Manager</option>
                      <option>Sales</option>
                        <option>Employee</option>
                        <option>Intern</option>
                    </select>
                  </div>

                  {['HR', 'Manager', 'Sales'].includes(userType) && (
                  <div className='col-lg-3'>
                    <label className="form-label" style={{ fontSize: '14px' }}>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      required
                    />
                  </div>
                  )}  

                  {/* Reporting User */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Reporting User</label>
                    <select
                      className="form-control text-dark form-select w-100"
                      value={reportingUser}
                      onChange={(e) => setReportingUser(e.target.value)}
                      required
                    >
                      <option value="">Select Reporting User</option>
                      {users
                        .filter((u) => u.userStatus === 'Active' && u._id !== id) // Exclude inactive users and self
                        .map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.firstName} {user.lastName}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* First Name */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Mobile */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Mobile</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                  </div>

                  {/* Working Shift */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Working Shift</label>
                    <select
                      className="form-control text-dark form-select w-100"
                      value={workingShift}
                      onChange={(e) => setWorkingShift(e.target.value)}
                      required
                    >
                      <option value="">Select Shift</option>
                      <option>Day</option>
                      <option>Night</option>
                      <option>Rotational</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Status</label>
                    <select
                      className="form-control text-dark form-select w-100"
                      value={userStatus}
                      onChange={(e) => setUserStatus(e.target.value)}
                      required
                    >
                      <option value="">Select Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12 text-start">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading
                        ? isEditMode
                          ? 'Updating...'
                          : 'Submitting...'
                        : isEditMode
                        ? 'Update'
                        : 'Submit'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
