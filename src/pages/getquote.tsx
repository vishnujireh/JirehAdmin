import React, { useState, useEffect, useRef } from 'react';
import { FiEye } from 'react-icons/fi';
import Link from 'next/link';
import $ from 'jquery';
import 'datatables.net-bs5';

type Quote = {
  id?: string | number;
  name?: string;
  email?: string;
  mobile?: string;
  service?: string;
  budget?: string;
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
      <h5 className="page-header mb-4">Get a Quote</h5>
    <div className='card_pbg'>
        {loading ? (
        <div className="text-center">Loading...</div>
      ) : quotedata.length === 0 ? (
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
                <th>Mobile</th>
                <th>Service Looking</th>
                <th>Budget</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {quotedata.map((quote, index) => (
                <tr key={quote.id || index}>
                  <td className='text-center'>{index + 1}</td>
                  <td>{quote.name}</td>
                  <td>{quote.email}</td>
                  <td>{quote.mobile}</td>
                  <td>{quote.service}</td>
                  <td>{quote.budget}</td>
                  {/* <td>
                    <Link href={`/view-quote?id=${quote.id}`} className="btn btn-sm btn-primary" title="View">
                        <FiEye size={18} color="#fff" />
                    </Link>
                  </td> */}
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

export default GetQuote;
