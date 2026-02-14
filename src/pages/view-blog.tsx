import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RiArrowLeftSLine } from 'react-icons/ri';
import Image from "next/image"
type Blog = {
  _id: string;
  title?: string;
  slug?:string;
  category?:string;
  metaTitle?:string;
  metaDescription?:string;
  author?:string;
  blogStatus?:string;
  publishDate?:string;
  content?:string;
  coverImage?:string;
  thumbnailImage?:string;
};

const ViewBlog = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blogs, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
 
  
  useEffect(() => {
  if (!router.isReady || !id || typeof id !== 'string') return;

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/admin/blogView?id=${id}&_=${Date.now()}`);
      const data = await response.json();
      console.log('API response:', data); // important to check what you receive
      setBlog(data.blog || data); // adjust based on API structure
    } catch (error) {
      console.error('Error fetching blog:', error);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  fetchBlog();
}, [router.isReady, id]);


  const goBack = () => {
    router.back();
  };

  return (
    <div className="page-main-container  p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h5 className="page-header">View Blog</h5>
        <button className="btn back-btn" onClick={goBack}><RiArrowLeftSLine  /> Back</button>
      </div>

      <div className="card">
        <div className='card-body'>
          {loading ? (
                <p className="odlist text-center">Loading...</p>
              ) : !blogs ? (
                <p className="odlist text-center">No data found</p>
              ) : (
                <>
                   <p className='odlist'><span>Title</span> <span className='text-gray'>{blogs.title}</span></p>
                   <p className='odlist'><span>Slug</span> <span className='text-gray'>{blogs.slug}</span></p>
                   <p className='odlist'><span>Category</span> <span className='text-gray'>{blogs.category}</span></p>
                   <p className='odlist'><span>Meta Title</span> <span className='text-gray'>{blogs.metaTitle}</span></p>
                   <p className='odlist'><span>Meta Description</span> <span className='text-gray'>{blogs.metaDescription}</span></p>
                   <p className='odlist'><span>Author</span> <span className='text-gray'>{blogs.author}</span></p>
                   <p className='odlist'><span>Status</span> <span className='text-gray'>{blogs.blogStatus}</span></p>
                   <p className='odlist'><span>Publish Date</span> <span className='text-gray'>{blogs.publishDate}</span></p>
                   <p className='odlist'><span>Cover Image</span> <span className='text-gray'> {blogs.coverImage && <Image src={blogs.coverImage} alt="Cover" width={200} height={100} />}</span></p>
                   <p className='odlist'><span>Thumbnail Image</span> <span className='text-gray'> {blogs.thumbnailImage && <Image src={blogs.thumbnailImage} alt="Cover" width={200} height={100} />}</span></p>
              <p className='odlist odlistlscon' style={{display:"block"}}><span>Content</span> <span className='text-gray' style={{display:"block", width:"100%"}} > <div
        className="odlist"
        dangerouslySetInnerHTML={{ __html: blogs.content || '' }}
      /></span></p>
                 </>
              )}
        </div>
        
      </div>
    </div>
  );
};

export default ViewBlog;
