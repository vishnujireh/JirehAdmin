import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import Link from 'next/link';
import { RiAddLine, RiEyeLine } from 'react-icons/ri';
type Quote = {
  _id?: string | number;
  name?: string;
  email?: string;
  mobile?: string;
  service?: string;
  budget?: string;
  createdAt?: string;
};

const GetQuote = () => {
  const [quotedata, setQuotedata] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef<HTMLTableElement>(null);

  
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('/api/getAllQuote');
        const data = await response.json();
        // Adjust this depending on your API response structure:
        setQuotedata(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setQuotedata([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  // Initialize DataTable after data is loaded
  useEffect(() => {
    if (!loading && quotedata.length && tableRef.current) {
      const table = $(tableRef.current).DataTable({
        destroy: true,
        // Optional: customize DataTable options here
        paging: true,
        searching: true,
        info: true,
      });

      // Cleanup DataTable instance on component unmount or data change
      return () => {
        table.destroy();
      };
    }
  }, [loading, quotedata]);

  return (
    <div className="page-main-container p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="page-header">Leads</h5>
              <Link href="/add-lead" className="btn btn-primary"><RiAddLine /> Add Lead</Link>
            </div>
      
    <div className='card'>
      <div className="card-body">
        {loading ? (
        <div className="text-center">Loading...</div>
      ) : quotedata.length === 0 ? (
        <div className="text-center">No data found</div>
      ) : (
        <div className="table-responsive">
          <table
            id="assigntask"
            ref={tableRef}
            className="table table-striped table-bordered table-hover align-middle"
            style={{ width: '100%' }}
          >
            <thead>
              <tr>
                <th className='text-center'>Sl.No</th>
                <th className='text-capitalize'>Name</th>
                <th style={{ width: '20%' }}>Email</th>
                <th>Mobile</th>
                <th>Service Looking</th>
                <th style={{ width: '13%' }} className='text-center'>Budget</th>
                <th className='text-center'>Date</th>
               <th className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {quotedata.map((quote, index) => (
                <tr key={quote._id || index}>
                  <td className='text-center'>{index + 1}</td>
                  <td className='text-capitalize'>{quote.name}</td>
                  <td style={{ width: '20%' }}>{quote.email}</td>
                  <td>{quote.mobile}</td>
                  <td>{quote.service}</td>
                  <td style={{ width: '13%' }} className='text-center'>{quote.budget}</td>
                    <td className='text-center'>{quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : ''}</td>
                   <td className='text-center'>
                    <Link
  href={`/view-quote?id=${quote._id}`}
  className="view_icon"
  title="View"
>
  <RiEyeLine />
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

export default GetQuote;
