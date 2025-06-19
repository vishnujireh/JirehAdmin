import React, { useState } from 'react'
import { useRouter } from 'next/router';
import HtmlEditor from './components/Description';
const Add_job = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobType, setJobType] = useState('');
    const [experience, setExperience] = useState('');
    const [salary, setSalary] = useState('');
    const [skills, setSkills] = useState('');
    const [description] = useState('');
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // You can handle form submission here, e.g., send data to a backend API.
        console.log({
            jobTitle,
            jobType,
            experience,
            salary,
            skills,
            description
        });
    };

    const goBack = () => {
        router.back();
    };
    return (
        <>
            <div >
                <div className="page-main-container">
                    <div className="">
                        <div className='d-flex justify-content-between' >
                            <div><h5 className="page-header ">Careers Page</h5></div>
                            <div className="mb-3">
                                <button
                                    className="btn back-btn"
                                    onClick={goBack}
                                >
                                    Back
                                </button>
                            </div>

                        </div>


                    </div>
                    <div className="row">
                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                            <div className="card">
                                <div className="add-job-table pt-4">
                                    <div className="add-job-form-cont" >
                                        <form onSubmit={handleSubmit}>
                                            <h4 className="mb-4 sub-ttl">Job Info</h4>
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <label htmlFor="jobTitle" className="form-label add-job-form-title ">Job Title</label>
                                                        <select
                                                            id="jobTitle"
                                                            className="form-control"
                                                            value={jobTitle}
                                                            onChange={(e) => setJobTitle(e.target.value)}
                                                        >
                                                            <option>Select Option</option>
                                                            <option>Project Manager</option>
                                                            <option>Reporting Manager</option>
                                                            <option>Team Lead</option>
                                                            <option>Sr.Developer</option>
                                                            <option>Jr.Developer</option>
                                                            <option>Sr. Tester</option>
                                                            <option>Jr.Tester</option>
                                                            <option>Designer</option>
                                                            <option>HR</option>
                                                            <option>Sales Admin</option>
                                                            <option>Office Admin</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <label htmlFor="jobType" className="form-label add-job-form-title">Job Type</label>
                                                        <input
                                                            type="text"
                                                            id="jobType"
                                                            className="form-control"
                                                            value={jobType}
                                                            onChange={(e) => setJobType(e.target.value)}
                                                            placeholder=" "
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <label htmlFor="experience" className="form-label add-job-form-title">Experience</label>
                                                        <input
                                                            type="number"
                                                            id="experience"
                                                            className="form-control"
                                                            name="experience"
                                                            min="0"
                                                            step="1"
                                                            value={experience}
                                                            onChange={(e) => setExperience(e.target.value)}
                                                            placeholder="Enter years"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <label htmlFor="salary" className="form-label add-job-form-title">Salary</label>
                                                        <input
                                                            type="number"
                                                            id="salary"
                                                            step="0.01"
                                                            min="0"
                                                            value={salary}
                                                            onChange={(e) => setSalary(e.target.value)}
                                                            placeholder="Enter amount"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <label htmlFor="skills" className="form-label add-job-form-title">Skills</label>
                                                        <input
                                                            type="text"
                                                            id="skills"
                                                            className="form-control"
                                                            value={skills}
                                                            onChange={(e) => setSkills(e.target.value)}
                                                            placeholder=" "
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="add-job-form-title">
                                                    <h6 className='discr_txt'>Description</h6>
                                                    </div>
                                                 
                                                    <HtmlEditor />
                                                </div>
                                                <div className="col-lg-12 text-end">
                                                    <button type="submit" className="btn btn-success submit-btn-job">Submit</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Add_job
