import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { RiArrowLeftSLine } from 'react-icons/ri';

const AddUser = () => {
    const [country, setCountry] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [userType, setUserType] = useState('');
    const [reportingUser, setReportingUser] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [workingShift, setWorkingShift] = useState('');
    const [status, setStatus] = useState('');

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({
            country,
            employeeId,
            userType,
            reportingUser,
            firstName,
            lastName,
            email,
            mobile,
            workingShift,
            status
        });
    };

    const goBack = () => {
        router.back();
    };

    return (
        <div className="page-main-container">
            <div className="d-flex justify-content-between">
                <h5 className="page-header">Add User</h5>
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

                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: '14px' }}>Country</label>
                                            <select className="form-control text-dark form-select w-100 " value={country} onChange={(e) => setCountry(e.target.value)} required>
                                                <option value="">Select Country</option>
                                                <option>India</option>
                                                <option>USA</option>
                                                <option>UK</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: '14px' }}>Employee ID</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={employeeId}
                                                onChange={(e) => setEmployeeId(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: '14px' }}>User Type</label>
                                            <select className="form-control text-dark form-select w-100" value={userType} onChange={(e) => setUserType(e.target.value)} required>
                                                <option value="">Select User Type</option>
                                                <option>Admin</option>
                                                <option>Manager</option>
                                                <option>Employee</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: '14px' }}>Reporting User</label>
                                            <select className="form-control text-dark form-select w-100" value={reportingUser} onChange={(e) => setReportingUser(e.target.value)} required>
                                                <option value="">Select Reporting User</option>
                                                <option>Manager 1</option>
                                                <option>Manager 2</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: '14px' }}>First Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: '14px' }}>Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: '14px' }}>Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: '14px' }}>Mobile</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: '14px' }}>Working Shift</label>
                                            <select className="form-control text-dark form-select w-100" value={workingShift} onChange={(e) => setWorkingShift(e.target.value)} required>
                                                <option value="">Select Shift</option>
                                                <option>Day</option>
                                                <option>Night</option>
                                                <option>Rotational</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: '14px' }}>Status</label>
                                            <select className="form-control text-dark form-select w-100" value={status} onChange={(e) => setStatus(e.target.value)} required>
                                                <option value="">Select Status</option>
                                                <option>Active</option>
                                                <option>Inactive</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-12 text-start">
                                        <button type="submit" className="btn btn-primary submit-btn-job">Submit</button>
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
