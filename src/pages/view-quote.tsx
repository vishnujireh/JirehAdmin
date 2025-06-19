import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Quote = {
  _id: string;
  name?: string;
  email?: string;
  mobile?: string;
  service?: string;
  serviceComment?: string;
  budget?: string;
  budgetComment?: string;
  createdAt?: string;
  updatedAt?: string;
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
    <div className="page-main-container">
      <div className="d-flex justify-content-between mb-3">
        <h6 className="page-header mb-0">View Details</h6>
        <button className="btn back-btn" onClick={goBack}>Back</button>
      </div>

      <div className="card pt-4 ps-3 pr-3">
        <div>
          {loading ? (
                <p className="odlist text-center">Loading...</p>
              ) : !quote ? (
                <p className="odlist text-center">No data found</p>
              ) : (
                <>
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
                </>
              )}
          <p></p>
        </div>
        
      </div>
    </div>
  );
};

export default ViewQuote;
