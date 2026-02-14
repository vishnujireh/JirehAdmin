import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import Link from 'next/link';
import { RiAddLine, RiPencilLine, RiDeleteBin6Line, RiEyeLine} from 'react-icons/ri';


type BlogList = {
  _id: string | number;
  title: string;
  slug: string;
  author: string;
  content: string;
  category: string;
  tags: string;
  coverImage: string;
  blogStatus: 'Active' | 'Inactive';
  publishDate: string;
};
 
const Blog = () => {
  const [blogData, setBlogData] = useState<BlogList[]>([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef<HTMLTableElement>(null);
  //const dataTable = useRef<any>(null);
  const dataTable = useRef<DataTables.Api | null>(null);


useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/admin/blogList');
        const data = await response.json();
        // Adjust this depending on your API response structure:
        setBlogData(Array.isArray(data.blogs) ? data.blogs : []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

useEffect(() => {
    if (!loading && blogData.length && tableRef.current) {
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
  }, [loading, blogData.length]);

  const deleteUser = async (id: string) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await fetch(`/api/admin/deleteBlog?id=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      alert('User deleted successfully');

      if (dataTable.current) {
        dataTable.current.destroy();
        dataTable.current = null;
      }

      // 1️⃣ Remove from state
      setBlogData((prev) => prev.filter((u) => u._id !== id));

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
        <h5 className="page-header">Blogs</h5>
        <Link href="/add-blog">
          <button className="btn btn-primary">
            <RiAddLine /> Add Blog
          </button>
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          {blogData.length === 0 ? (
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
                    <th>Title</th>
                    <th style={{ width: '20%' }}>Slug</th>
                    <th className='text-center'>Author</th>
                    <th className='text-center'>Category</th>
                    <th className='text-center'>PublishedAt</th>
                    <th className='text-center'>Status</th>
                     
                    <th className="text-center" style={{ width: '13%' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blogData.map((BlogList, index) => (
                    <tr key={BlogList._id} id={`row-${BlogList._id}`}>
                      <td className="text-center">{index + 1}</td>
                      <td>{BlogList.title}</td>
                      <td style={{ width: '20%' }}>{BlogList.slug}</td>
                      <td className='text-center'>{BlogList.author}</td>
                      <td className='text-center'>{BlogList.category}</td>
                      <td  className='text-center'>{new Date(BlogList.publishDate).toLocaleDateString()}</td>
                      <td  className='text-center'>
                        <span
                          className={`badge ${
                            BlogList.blogStatus === 'Active' ? 'bg-success' : 'bg-danger'
                          }`}
                        >
                          {BlogList.blogStatus}
                        </span>
                      </td>
                      <td className="text-center" style={{ width: '13%' }}>
                        <Link
                          href={`/add-blog?id=${BlogList._id}`}
                          className="edit_icon"
                          title="Edit"
                        >
                          <RiPencilLine />
                        </Link>
                         <Link href={`/view-blog?id=${BlogList._id}`} className="view_icon"
  title="View" style={{ marginLeft: '8px' }}>
                          <RiEyeLine />
                        </Link> 
                        <a onClick={() => deleteUser(BlogList._id as string)} className="delete_icon"
  title="Delete" style={{ marginLeft: '8px' }}>
                          <RiDeleteBin6Line  />
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

export default Blog;
