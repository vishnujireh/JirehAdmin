import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import Link from 'next/link';
import { FiEye } from 'react-icons/fi';

// Match the API response structure for job applications
type CareerApplication = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  location: string;
  job_id?: string;
  job_title?: string;
  resume?: string;
  comments?: string;
  createdAt?: string;
};

const GetCareer = () => {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/applications');
        const data = await response.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Initialize DataTable after data is loaded
  useEffect(() => {
    if (!loading && applications.length && tableRef.current) {
      const table = $(tableRef.current).DataTable({
        destroy: true,
        paging: true,
        searching: true,
        info: true,
      });

      // Cleanup DataTable instance on component unmount or data change
      return () => {
        table.destroy();
      };
    }
  }, [loading, applications]);

  return (
    <div className="page-main-container p-3">
      <h5 className="page-header mb-4">Career Applications</h5>
    <div className='card_pbg'>
    {loading ? (
        <div className="text-center">Loading...</div>
      ) : applications.length === 0 ? (
        <div className="text-center">No data found</div>
      ) : (
        <div className="table-responsive">
          <table
            id="assigntask"
            ref={tableRef}
            className="table table-striped table-bordered table-hover"
            style={{ width: '100%' }}
          >
            <thead>
              <tr>
                <th className='text-center'>S.no</th>
                <th>Name</th>
                <th>Email</th>
                <th className='text-center'>Mobile</th>
                <th>Location</th>
                <th>Job Title</th>
                <th className='text-center'>Applied On</th>
                <th className='text-center'>Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id}>
                  <td className='text-center'>{index + 1}</td>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td className='text-center'>{app.mobile}</td>
                  <td>{app.location}</td>
                  <td>{app.job_title}</td>
                  <td className='text-center'>{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : ''}</td>
                   <td className='text-center'>
                    <Link href={`http://demo1.jirehsol.com${app.resume}`} className="btn btn-sm btn-primary" title="View Resume" target="_blank" rel="noopener noreferrer">
                      <FiEye size={18} color="#fff" />
                    </Link>
                     
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
      
    </div>
  );
};

export default GetCareer;