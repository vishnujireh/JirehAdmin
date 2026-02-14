import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { RiArrowLeftSLine } from 'react-icons/ri';
import 'react-datepicker/dist/react-datepicker.css';

interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  userType: string;
  userStatus: string;
}

const Add_lead = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [budgetComment, setBudgetComment] = useState('');
  const [serviceComment, setServiceComment] = useState('');
  const [source, setSource] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [salesUsers, setSalesUsers] = useState<UserType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();
  const { id } = router.query;
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode && typeof id === 'string') {
      // Fetch existing lead data to populate form for editing
      const fetchLead = async () => {
        try {
          const response = await fetch(`/api/getQuote?id=${id}`);
          const data = await response.json();

          if (data.success && data.data) {
            const lead = data.data;
            setName(lead.name || '');
            setEmail(lead.email || '');
            setMobile(lead.mobile || '');
            setService(lead.service || '');
            setBudget(lead.budget || '');
            setBudgetComment(lead.budgetComment || '');
            setServiceComment(lead.serviceComment || '');
            setSource(lead.source || '');
            setUpdatedBy(lead.updatedBy || '');
            setAssignTo(lead.assignTo || '');
          }
        } catch (error) {
          console.error('Error fetching lead:', error);
        }
      };

      fetchLead();
    }
  }, [isEditMode, id]);

  // ✅ Fetch only "Sales Person" users for dropdown
  useEffect(() => {
    const fetchSalesUsers = async () => {
      try {
        const res = await fetch('/api/admin/userList');
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          const filtered = data.data.filter(
            (user: UserType) =>
              user.userType === 'Sales Person' && user.userStatus === 'Active'
          );
          setSalesUsers(filtered);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchSalesUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
  const payload = {
    name,
    mobile,
    email,
    source,
    updatedBy,
    assignTo,        // user _id
    service,
    serviceComment,
    budget,
    budgetComment,
  };

  const url = isEditMode ? '/api/admin/updateQuote' : '/api/admin/addQuote';
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

  alert(isEditMode ? 'Quote updated successfully!' : 'Quote added successfully!');
  router.push('/getquote');
} catch (error) {
  console.error('❌ Error:', error);
  alert('Something went wrong. Please try again.');
} finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="page-main-container">
      <div className="d-flex justify-content-between">
        <h5 className="page-header">{isEditMode ? 'Edit' : 'Add'} Lead</h5>
        <button className="btn back-btn" onClick={goBack}>
          <RiArrowLeftSLine /> Back
        </button>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {/* Success / Error messages */}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Name */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                {/* Updated By */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Updated By</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updatedBy}
                      onChange={(e) => setUpdatedBy(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  

                  

                  {/* Source */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Source</label>
                    <input
                      type="text"
                      className="form-control"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      required
                    />
                  </div>
                  {/* Assign To - Only Sales Users */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Assign To</label>
                    <select
                      className="form-control text-dark form-select w-100"
                      value={assignTo}
                      onChange={(e) => setAssignTo(e.target.value)}
                      required
                    >
                      <option value="">Select Sales User</option>
                      {salesUsers.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.firstName} {user.lastName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Service */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Service Looking For</label>
                    <select
                      className="form-control text-dark form-select w-100"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      required
                    >
                      <option value="">Select Service</option>
                      <option>UI/UX Design</option>
                      <option>Web Development</option>
                      <option>Mobile Development</option>
                      <option>Customized Applications</option>
                      <option>eCommerce Development</option>
                      <option>AWS Cloud Service</option>
                      <option>Digital Marketing</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="col-lg-3">
                    <label className="form-label" style={{ fontSize: '14px' }}>Budget</label>
                    <select
                      className="form-control text-dark w-100 form-select"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      required
                    >
                      <option value="">Select Budget</option>
                      <option>$5K - $10K</option>
                      <option>$10K - $50K</option>
                      <option>$50K - $100K</option>
                      <option>$100K - $250K</option>
                      <option>$250K - $500K</option>
                    </select>
                  </div>

                  {/* Service Description */}
                  <div className="col-lg-12">
                    <label className="form-label" style={{ fontSize: '14px' }}>Service Description</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={serviceComment}
                      onChange={(e) => setServiceComment(e.target.value)}
                      placeholder="Enter service-related details"
                    />
                  </div>

                  {/* Budget Description */}
                  <div className="col-lg-12">
                    <label className="form-label" style={{ fontSize: '14px' }}>Budget Description</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={budgetComment}
                      onChange={(e) => setBudgetComment(e.target.value)}
                      placeholder="Enter additional budget details"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="col-12 text-start">
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn-job"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (isEditMode ? 'Updating...' : 'Submitting...') : 'Submit'}
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

export default Add_lead;
