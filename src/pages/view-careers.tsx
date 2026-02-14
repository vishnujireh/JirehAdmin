import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RiArrowLeftSLine, RiEyeLine } from 'react-icons/ri';
import Link from 'next/link';
type Quote = {
  _id: string;
  name?: string;
  email?: string;
  mobile?: string;
  job_id?: string;
  job_title?: string;
  comments?: string;
  resume?: string;
  createdAt?: string;
  location?: string;
};

const ViewQuote = () => {
  const router = useRouter();
  const { id } = router.query;

  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (!router.isReady || !id || typeof id !== 'string') return;

    const fetchQuote = async () => {
      try {
        const response = await fetch(`/api/getApplication?id=${id}`);
        const data = await response.json();
        setQuote(data.data); // Use `data.data` because the response is { data: {...} }
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [router.isReady, id]);

  const goBack = () => {
    router.back();
  };

  return (
    <div className="page-main-container  p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h5 className="page-header">View Lead</h5>
        <button className="btn back-btn" onClick={goBack}><RiArrowLeftSLine  /> Back</button>
      </div>

      <div className="card">
        <div className='card-body'>
          {loading ? (
                <p className="odlist text-center">Loading...</p>
              ) : !quote ? (
                <p className="odlist text-center">No data found</p>
              ) : (
                <>
                  <p className='odlist'><span>Job Id</span> <span className='text-gray'>{quote.job_id}</span></p>
                   <p className='odlist'><span>Job Title</span> <span className='text-gray'>{quote.job_title}</span></p>
                  <p className='odlist'><span>Applied On</span> <span className='text-gray text-trans'>{quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : ''}</span></p>
                  <p className='odlist'><span>Name</span> <span className='text-gray text-trans'>{quote.name}</span></p>
                  <p className='odlist'><span>Email</span> <span className='text-gray'><Link href={`mailto:${quote.email}`}>{quote.email}</Link></span></p>
                  <p className='odlist'><span>Mobile</span> <span className='text-gray'>{quote.mobile}</span></p>
                  <p className='odlist'><span>Location</span> <span className='text-gray'>{quote.location}</span></p>
                  {quote.comments &&
                  <p className='odlist'><span>Comments</span> <span className='text-gray'>{quote.comments}</span></p>
                  }
                   <p className='odlist'><span>Resume</span> <span className='text-gray'>
                    <Link href={`http://jirehsol.com${quote.resume}`} target='_blank' className="view_icon" title="View Resume" >
                      <RiEyeLine />
                    </Link></span></p>
                </>
              )}
        </div>
        
      </div>
    </div>
  );
};

export default ViewQuote;
