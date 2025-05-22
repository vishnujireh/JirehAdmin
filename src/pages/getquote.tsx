import React, { useState } from 'react';
import { FiEye } from 'react-icons/fi';

const Quotedata = [
  {
    id: 1,
    name: 'Chandu',
    email: 'chandu@gmail.com',
    mobile: '+91 9876543210',
    serviceLooking: 'Mobile App Development',
    budget: '$100-$2000',
  },
  {
    id: 2,
    name: 'Arun',
    email: 'arun@gmail.com',
    mobile: '+91 9876543211',
    serviceLooking: 'Web Development',
    budget: '$500-$3000',
  },
];

const GetQuote = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  
  const filteredQuotedata = Quotedata.filter((quote) => {
    return (
      quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.mobile.includes(searchTerm) ||
      quote.serviceLooking.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.budget.includes(searchTerm)
    );
  });

  return (
    <div>
      <div className="page-main-container">
        <div>
          <h5 className="page-header">Get a Quote</h5>

          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
              <div className="card">
                <div className="table-responsive pt-4">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <div className="" id="assigntask_length">
                            <div className="d-flex gap-3 quote-pg-first">
                              <div>
                                <p>Show</p>
                              </div>

                              <div className="dropdown">
                                <select className="form-select form-select-sm">
                                  <option value="10">10</option>
                                  <option value="25">25</option>
                                  <option value="50">50</option>
                                  <option value="100">100</option>
                                </select>
                              </div>

                              <div>
                                <p>Entries</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6 d-flex justify-content-end search-filter-cont">
                          <div className="search-filter">
                            <label>
                              <input
                                type="search"
                                className="form-control form-control"
                                placeholder="Search..."
                                aria-controls="assigntask"
                                value={searchTerm}
                                onChange={handleSearch}
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
                              <th className="wd-10p border-bottom-0 sorting_disabled">Name</th>
                              <th className="wd-15p border-bottom-0 sorting">Email</th>
                              <th className="wd-20p border-bottom-0 sorting">Mobile</th>
                              <th className="w-5p border-bottom-0 sorting">Service Looking</th>
                              <th className="wd-15p border-bottom-0 sorting">Budget</th>
                              <th className="wd-10p border-bottom-0 sorting_disabled">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredQuotedata.map((quote, index) => (
                              <tr key={quote.id} className="odd">
                                <td className="text-start fs-13">{index + 1}</td>
                                <td className="text-start fs-13">{quote.name}</td>
                                <td className="text-start">{quote.email}</td>
                                <td className="text-start">{quote.mobile}</td>
                                <td className="text-start">{quote.serviceLooking}</td>
                                <td className="text-start">{quote.budget}</td>
                                <td className="text-start">
                                  <div className="d-flex">
                                    <a
                                      href="/view-quote"
                                      className="action-btns1"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="View"
                                    >
                                      <i>
                                        <FiEye size={18} color="#4676ac" />
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

                  <div className="col-sm-12 col-md-12 pt-2">
                    <div className="dataTables_info" id="assigntask_info" role="status" aria-live="polite">
                      Showing {filteredQuotedata.length} of {filteredQuotedata.length} entries
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
  );
};

export default GetQuote;
