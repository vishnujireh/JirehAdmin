import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import Link from 'next/link';
import { RiAddLine, RiPencilLine, RiDeleteBin6Line, RiEyeLine } from 'react-icons/ri';

type UserList = {
  _id: string | number;
  title: string;
  jobType: string;
  salary: string;
  experience: string;
  jobStatus: 'Active' | 'Inactive';
  createdAt: string;
};

const UserManagement = () => {
  const [userdata, setUserdata] = useState<UserList[]>([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef<HTMLTableElement>(null);
    //const dataTable = useRef<any>(null);
    const dataTable = useRef<DataTables.Api | null>(null);

  // Fetch jobs from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/admin/jobList');
        const data = await response.json();
        setUserdata(Array.isArray(data.jobs) ? data.jobs : []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUserdata([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Initialize DataTable whenever userdata changes
  useEffect(() => {
    if (!loading && userdata.length && tableRef.current) {
     if (dataTable.current) {

        dataTable.current.destroy();

      }

      dataTable.current = $(tableRef.current).DataTable({
        destroy: true,
        // Optional: customize DataTable options here
        paging: true,
        searching: true,
        info: true,
      });
 
    }
  }, [loading, userdata.length]);

  // Delete user
  const deleteUser = async (id: string) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await fetch(`/api/admin/deleteJob?id=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      alert('User deleted successfully');

      // ✅ Destroy DataTable first
      if (dataTable.current) {
        dataTable.current.destroy();
        dataTable.current = null;
      }

      // ✅ Then update React state
      setUserdata((prev) => prev.filter((u) => u._id !== id));

      // ✅ The useEffect watching userdata.length will re-initialize DataTable
    } else {
      alert(data.error || 'Failed to delete user');
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    alert('Something went wrong!');
  }
};

  return (
    <div className="page-main-container p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="page-header">Job List</h5>
        <Link href="/add-job">
          <button className="btn btn-primary">
            <RiAddLine /> Add Job
          </button>
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          {userdata.length === 0 ? (
            <div className="text-center">No data found</div>
          ) : (
            <div className="table-responsive">
              <table
                id="usertable"
                ref={tableRef}
                className="table table-striped table-bordered table-hover align-middle"
                style={{ width: '100%' }}
              >
                <thead>
                  <tr>
                    <th className="text-center">Sl.No</th>
                    <th style={{ width: '20%' }}>Job Title</th>
                    <th className="text-center">Job Type</th>
                    <th className="text-center">Experience</th>
                    <th className="text-center">Salary</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Status</th>
                    <th className="text-center" style={{ width: '13%' }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.map((job, index) => (
                    <tr key={job._id} id={`row-${job._id}`}>
                      <td className="text-center">{index + 1}</td>
                      <td style={{ width: '20%' }}>{job.title}</td>
                      <td className="text-center">{job.jobType}</td>
                      <td className="text-center">{job.experience}</td>
                      <td className="text-center">{job.salary}</td>
                      <td className="text-center">{new Date(job.createdAt).toLocaleDateString()}</td>
                      <td className="text-center">
                        <span className={`badge ${job.jobStatus === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                          {job.jobStatus}
                        </span>
                      </td>
                      <td className="text-center" style={{ width: '13%' }}>
                        <Link href={`/add-job?id=${job._id}`} title="Edit" className="edit_icon">
                          <RiPencilLine />
                        </Link>
                        <Link
                          href={`/view-job?id=${job._id}`}
                          title="View"
                          className="view_icon"
                          style={{ marginLeft: '8px' }}
                        >
                          <RiEyeLine />
                        </Link>
                        <a
                          onClick={() => deleteUser(job._id as string)}
                          title="Delete"
                          className="delete_icon"
                          style={{ marginLeft: '8px', cursor: 'pointer' }}
                        >
                          <RiDeleteBin6Line />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
