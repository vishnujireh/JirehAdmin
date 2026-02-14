import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RiArrowLeftSLine } from 'react-icons/ri';
import Link from 'next/link';
interface ReportingUser {
  _id: string;
  firstName: string;
  lastName: string;
}
type Quote = {
  _id: string;
  name?: string;
  email?: string;
  mobile?: string;
  createdAt?: string;
  country?:string;
  employeeId?:string;
  firstName?:string;
  lastName?:string;
  reportingUser?:string | ReportingUser;
  updatedAt?:string;
  userStatus?:string;
  userType?:string;
  workingShift?:string;


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
        const response = await fetch(`/api/admin/userView?id=${id}`);
        const data = await response.json();
         console.log('Fetched user data:', data);
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
      <h5 className="page-header">View User</h5>
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
                  <p className='odlist'><span>Country</span> <span className='text-gray'>{quote.country}</span></p>
                   <p className='odlist'><span>Employee Id</span> <span className='text-gray'>{quote.employeeId}</span></p>
                  <p className='odlist'><span>Created On</span> <span className='text-gray text-trans'>{quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : ''}</span></p>
                  <p className='odlist'><span>Full Name</span> <span className='text-gray text-trans'> {quote.firstName} {quote.lastName}</span></p>

                  <p className='odlist'><span>Email</span> <span className='text-gray'><Link href={`mailto:${quote.email}`}>{quote.email}</Link></span></p>
                  <p className='odlist'><span>Mobile</span> <span className='text-gray'>{quote.mobile}</span></p>
                    <p className='odlist'><span>Reporting Manager</span> <span className='text-gray'>{typeof quote.reportingUser === "string"
  ? quote.reportingUser // just the ID (if not populated)
  : `${quote.reportingUser?.firstName} ${quote.reportingUser?.lastName}`}</span></p>
                    <p className='odlist'><span>Updated At</span> <span className='text-gray'>{quote.updatedAt ? new Date(quote.updatedAt).toLocaleDateString() : ''}</span></p>
                    <p className='odlist'><span>Status</span> <span className='text-gray'>{quote.userStatus}</span></p>
                    <p className='odlist'><span>User Type</span> <span className='text-gray'>{quote.userType}</span></p>
                    <p className='odlist'><span>Working Shift</span> <span className='text-gray'>{quote.workingShift}</span></p>


                 
                  
                </>
              )}
        </div>
        
      </div>
    </div>
  );
};

export default ViewQuote;
