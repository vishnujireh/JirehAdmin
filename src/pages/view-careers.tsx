import React from 'react'

import { useRouter } from 'next/router';
import { FaDownload } from "react-icons/fa";

const View_careers = () => {

    const router = useRouter();


    const goBack = () => {
        router.back();
    };

    return (
        <>
            <div >
                <div className="page-main-container">
                    <div className="">
                        <div className='d-flex justify-content-between'>
                            <div><h5 className="page-header ">View Page:</h5></div>
                            
                            <div className="mb-3">
                                <button
                                    className="btn back-btn"
                                    onClick={goBack}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                        <div className="card pt-4 ps-3 pr-3">
                            <div className="sub-ttl-cont">
                                <h4 className="mb-4 sub-ttl">Job Info</h4>
                            </div>

                            <div className="col-xl-12 col-md-12 col-lg-12">
                                <div className="table-responsive">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="w-50">Job Title </span>
                                                </td>
                                                <td>:</td>
                                                <td>
                                                    <span className="font-weight-semibold">Developer</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="w-50">Job Type  </span>
                                                </td>
                                                <td>:</td>
                                                <td>
                                                    <span className="font-weight-semibold">Front-End Developer</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="w-50">Experience</span>
                                                </td>
                                                <td>:</td>
                                                <td>
                                                    <span className="font-weight-semibold">7 years</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="w-50">Salary	</span>
                                                </td>
                                                <td>:</td>
                                                <td>
                                                    <span className="font-weight-semibold">$2000</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="w-50">Skills</span>
                                                </td>
                                                <td>:</td>
                                                <td>
                                                    <span className="font-weight-semibold">html,css,javascript</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="w-50">Descriptions</span>
                                                </td>
                                                <td>:</td>
                                                <td>
                                                    <span className="font-weight-semibold">here we go that i&apos;m well known developer can do any type of front-end related development</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>



                    </div>
                    <div className="">
                        <div className='mb-4'>
                            <div><h5 className="page-header ">List of applied candates:</h5></div>
                         

                        </div>

                        <div className="row">
                            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                                <div className="card">
                                    <div className="table-responsive pt-4">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-6">
                                                        <div className="" id='assigntask_length'>
                                                            <div className="d-flex gap-3 quote-pg-first">
                                                                <div>
                                                                    <p> Show </p>
                                                                </div>

                                                                <div className="dropdown" >
                                                                    <select className="form-select form-select-sm ">
                                                                        <option value="10">10</option>
                                                                        <option value="25">25</option>
                                                                        <option value="50">50</option>
                                                                        <option value="100">100</option>
                                                                    </select>
                                                                </div>



                                                                <div> <p > Entries </p></div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-6 d-flex justify-content-end ">
                                                        <div className="search-filter">
                                                            <label>
                                                                <input
                                                                    type="search"
                                                                    className="form-control form-control"
                                                                    placeholder="Search..."
                                                                    aria-controls="assigntask"
                                                                />
                                                            </label>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="assigntask_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                            <div className="row">
                                                <div className="col-sm-12" id='assigntask_length'>
                                                    <table
                                                        className="table table-vcenter text-nowrap mb-0 dataTable"
                                                        id="assigntask"
                                                        role="grid"
                                                        aria-describedby="assigntask_info"
                                                    >
                                                        <thead className='thread-noborder'>
                                                            <tr role="row">
                                                                <th className="wd-10p border-bottom-0 sorting_disabled">S.no</th>
                                                                <th className="wd-10p border-bottom-0 sorting_disabled">Name</th>
                                                                <th className="wd-15p border-bottom-0 sorting">Mobile</th>
                                                                <th className="wd-20p border-bottom-0 sorting">Email</th>
                                                                <th className="w-5p border-bottom-0 sorting">Location</th>

                                                                <th className="wd-10p border-bottom-0 sorting_disabled">CV</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="odd">
                                                                <td className="text-start fs-13">1</td>
                                                                <td className="text-start fs-13">Chandu</td>
                                                                <td className="text-start">9866019049</td>
                                                                <td className="text-start">chandu@gmail.com</td>

                                                                <td className="text-start">Banglore</td>
                                                                <td className="text-start"><FaDownload style={{color:"rgb(85, 91, 149)"}} /></td>

                                                         
                                                            </tr>
                                                           
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-12 pt-2">
                                            <div className="dataTables_info" id="assigntask_info" role="status" aria-live="polite">
                                                Showing 1 to 2 of 2 entries
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-12 d-flex justify-content-end">
                                            <div className="dataTables_paginate paging_simple_numbers" id="assigntask_paginate">
                                                <ul className="pagination">
                                                    <li className="paginate_button page-item previous disabled" id="assigntask_previous">
                                                        <a href="#" aria-controls="assigntask" data-dt-idx="0" tabIndex={0} className="page-link">
                                                            Previous
                                                        </a>
                                                    </li>
                                                    <li className="paginate_button page-item active">
                                                        <a href="#" aria-controls="assigntask" data-dt-idx="1" tabIndex={0} className="page-link">
                                                            1
                                                        </a>
                                                    </li>
                                                    <li className="paginate_button page-item next disabled" id="assigntask_next">
                                                        <a href="#" aria-controls="assigntask" data-dt-idx="2" tabIndex={0} className="page-link">
                                                            Next
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
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

export default View_careers
