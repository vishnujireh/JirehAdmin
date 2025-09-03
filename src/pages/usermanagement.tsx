import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import Link from 'next/link';
import { RiAddLine, RiEditLine } from 'react-icons/ri';

type User = {
  _id: string | number;
  name: string;
  email: string;
  mobile: string;
  userType: string;
  country: string;
  status: 'Active' | 'Inactive';
  workingShift: string;
  createdAt: string;
};

const dummyUsers: User[] = [
  {
    _id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    mobile: '1234567890',
    userType: 'Admin',
    country: 'USA',
    status: 'Active',
    workingShift: 'Morning',
    createdAt: '2025-08-01T10:30:00Z',
  },
  {
    _id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    mobile: '9876543210',
    userType: 'Editor',
    country: 'UK',
    status: 'Inactive',
    workingShift: 'Evening',
    createdAt: '2025-08-02T15:45:00Z',
  },
  // Add more users as needed...
];

const UserManagement = () => {
  const [userdata, setUserdata] = useState<User[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    // Simulate data loading (e.g., from localStorage or hardcoded)
    setUserdata(dummyUsers);
  }, []);

  useEffect(() => {
    if (userdata.length && tableRef.current) {
      const table = $(tableRef.current).DataTable({
        destroy: true,
        paging: true,
        searching: true,
        info: true,
      });

      return () => {
        table.destroy();
      };
    }
  }, [userdata]);

  return (
    <div className="page-main-container p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="page-header">User Management</h5>
        <Link href="/add-user">
          <button className="btn btn-primary">
            <RiAddLine /> Add User
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>User Type</th>
                    <th>Country</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Working Shift</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.map((user, index) => (
                    <tr key={user._id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.userType}</td>
                      <td>{user.country}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge ${
                            user.status === 'Active' ? 'bg-success' : 'bg-danger'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>{user.workingShift}</td>
                      <td className="text-center">
                        <Link
                          href={`/edit-user?id=${user._id}`}
                          className="btn btn-sm btn-outline-primary"
                          title="Edit"
                        >
                          <RiEditLine />
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
    </div>
  );
};

export default UserManagement;
