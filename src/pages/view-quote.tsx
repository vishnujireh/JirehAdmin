import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RiArrowLeftSLine } from 'react-icons/ri';
type Quote = {
  _id: string;
  name?: string;
  email?: string;
  mobile?: string;
  service?: string;
  serviceComment?: string;
  budget?: string;
  budgetComment?: string;
  pageurl?: string;
  userip?: string;
  fileattachment?: string;
  createdAt?: string;
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
        const response = await fetch(`/api/getQuote?id=${id}`);
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
                  <p className='odlist'><span>Date</span> <span className='text-gray text-trans'>{quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : ''}</span></p>
                  <p className='odlist'><span>Name</span> <span className='text-gray text-trans'>{quote.name}</span></p>
                  <p className='odlist'><span>Email</span> <span className='text-gray'>{quote.email}</span></p>
                  <p className='odlist'><span>Mobile</span> <span className='text-gray'>{quote.mobile}</span></p>
                  <p className='odlist'><span>Service Looking</span> <span className='text-gray'>{quote.service}</span></p>
                  {quote.serviceComment && (
                  <p className='odlist'><span>Service Description</span> <span className='text-gray'>{quote.serviceComment}</span></p>
                  )}
                  <p className='odlist'><span>Budget</span> <span className='text-gray'>{quote.budget}</span></p>
                  {quote.budgetComment && (
                  <p className='odlist'><span>Budget Description</span> <span className='text-gray'>{quote.budgetComment}</span></p>
                  )}
                  {quote.pageurl && (
                    <p className='odlist'><span>Page URL</span> <span className='text-gray'>{quote.pageurl}</span></p>
                  )}
                  {quote.userip && (
                    <p className='odlist'><span>User IP</span> <span className='text-gray'>{quote.userip}</span></p>
                  )}
                  {quote.fileattachment && (
                    <p className='odlist'><span>File Attachment</span> <span className='text-gray'>{quote.fileattachment}</span></p>
                  )}
                </>
              )}
        </div>
        
      </div>
    </div>
  );
};

export default ViewQuote;
