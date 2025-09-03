import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { RiArrowLeftSLine } from 'react-icons/ri';
import ReactDatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const Add_lead = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [service, setService] = useState('');
    const [budget, setBudget] = useState('');
    const [date, setDate] = useState('');
    const [updatedBy, setUpdatedBy] = useState('');
    const [assignTo, setAssignTo] = useState('');

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({
            name,
            email,
            mobile,
            service,
            budget,
            date,
            updatedBy,
            assignTo
        });
    };

    const goBack = () => {
        router.back();
    };
    return (
        <>
            <div className="page-main-container">
                <div className="d-flex justify-content-between">
                    <h5 className="page-header">Add Lead</h5>
                    <button className="btn back-btn" onClick={goBack}>
                        <RiArrowLeftSLine /> Back
                    </button>
                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>

                                    <div className="row g-3 ">
                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label className="form-label" style={{ fontSize: '14px' }}>Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
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
                                        </div>

                                        <div className="col-lg-3 ">
                                            <div className="form-group">
                                                <label className="form-label" style={{ fontSize: '14px' }}>Budget</label>
                                                <select
                                                    className="form-control text-dark w-100 form-select"
                                                    value={budget}
                                                    onChange={(e) => setBudget(e.target.value)}
                                                    required
                                                >
                                                    <option >Select Budget</option>
                                                    <option>$5K - $10K</option>
                                                    <option>$10K - $50K</option>
                                                    <option>$50K - $100K</option>
                                                    <option>$100K - $250K</option>
                                                    <option>$250K - $500K</option>

                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-3">
                                            <div className="form-group position-relative" style={{ display: 'flex', flexDirection: 'column', zIndex: 99999 }}>
                                                <label className="form-label" style={{ fontSize: '14px' }}>Date</label>

                                                <ReactDatePicker
                                                    selected={date ? new Date(date) : null}
                                                    onChange={(date: Date | null) =>
                                                        setDate(date ? format(date, 'yyyy-MM-dd') : '')
                                                    }
                                                    placeholderText="dd-mm-yyyy"
                                                    className="form-control"
                                                    dateFormat="dd-MM-yyyy"
                                                    popperClassName="datepicker-popper"
                                                />



                                            </div>

                                        </div>

                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label className="form-label " style={{ fontSize: '14px' }}>Updated By</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={updatedBy}
                                                    onChange={(e) => setUpdatedBy(e.target.value)}
                                                    placeholder="Your name"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label className="form-label " style={{ fontSize: '14px' }}>Assign To</label>
                                                <select
                                                    className="form-control text-dark form-select w-100"
                                                    value={assignTo}
                                                    onChange={(e) => setAssignTo(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select Sales User</option>
                                                    <option>Sales User 1</option>
                                                    <option>Sales User 2</option>
                                                    <option>Sales User 3</option>
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
        </>

    )
}

export default Add_lead
