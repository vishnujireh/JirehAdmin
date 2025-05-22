import React, { useState } from 'react';
import { FiEye, FiEdit, FiTrash } from 'react-icons/fi';
import Link from 'next/link';





const jobs = [
  { id: 1, title: 'Developer', type: 'Front-End Developer', experience: '5 years', salary: '$100-$2000' },
  { id: 2, title: 'Designer', type: 'UI/UX Designer', experience: '3 years', salary: '$80-$1500' },
  { id: 3, title: 'Project Manager', type: 'Agile Project Manager', experience: '7 years', salary: '$1200-$2500' },
  
];


const Careers = () => {

  const [searchTerm, setSearchTerm] = useState('');




  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

                
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <div className="page-main-container">
          <div className="">
            <div className="d-flex justify-content-between">
              <div><h5 className="page-header">Careers Page</h5></div>
              <div className="mb-3">
                <button className="add-job-btn">
                  <Link href="/add-job">Add Job</Link>
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                <div className="card">
                  <div className="table-responsive pt-4">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="row">
                          <div className="col-sm-12 col-md-6">
                            <div id="assigntask_length">
                              <div className="d-flex gap-3 quote-pg-first">
                                <div>
                                  <p> Show </p>
                                </div>

                                <div className="dropdown">
                                  <select className="form-select form-select-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                  </select>
                                </div>

                                <div><p> Entries </p></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-6 d-flex justify-content-end">
                            <div className="search-filter">
                              <label>
                                <input
                                  type="search"
                                  className="form-control form-control"
                                  placeholder="Search..."
                                  aria-controls="assigntask"
                                  value={searchTerm}
                                  onChange={handleSearchChange}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="assigntask_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                      <div className="row">
                        <div className="col-sm-12" id="assigntask_length">
                          <table
                            className="table table-vcenter text-nowrap mb-0 dataTable"
                            id="assigntask"
                            role="grid"
                            aria-describedby="assigntask_info"
                          >
                            <thead>
                              <tr role="row">
                                <th className="wd-10p border-bottom-0 sorting_disabled">S.no</th>
                                <th className="wd-10p border-bottom-0 sorting_disabled">Job Title</th>
                                <th className="wd-15p border-bottom-0 sorting">Job Type</th>
                                <th className="wd-20p border-bottom-0 sorting">Experience</th>
                                <th className="w-5p border-bottom-0 sorting">Salary</th>
                                <th className="wd-10p border-bottom-0 sorting_disabled">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredJobs.map((job, index) => (
                                <tr key={job.id} className="odd">
                                  <td className="text-start fs-13">{index + 1}</td>
                                  <td className="text-start fs-13">{job.title}</td>
                                  <td className="text-start">{job.type}</td>
                                  <td className="text-start">{job.experience}</td>
                                  <td className="text-start">{job.salary}</td>
                                  <td className="text-start">
                                    <div className="d-flex">
                                      <a
                                        href="/view-careers"
                                        className="action-btns1"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="View"
                                      >
                                        <i>
                                          <FiEye size={18} color="#4676ac" />
                                        </i>
                                      </a>

                                      <a
                                        href="/Careers_edit"
                                        className="action-btns1"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Edit"
                                      >
                                        <i>
                                          <FiEdit size={18} color="green" />
                                        </i>
                                      </a>

                                      <a
                                        href="#"
                                        className="action-btns1"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Delete"
                                      >
                                        <i>
                                          <FiTrash size={18} color="red" />
                                        </i>
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                   

                    {/* Pagination */}
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
  );
};

export default Careers;
