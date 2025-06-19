import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Quote = {
  name?: string;
  email?: string;
  mobile?: string;
  service?: string;
  description?: string;
  budget?: string;
};

const View_quote = () => {
  const router = useRouter();
  const { id } = router.query;
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!router.isReady || !id || typeof id !== "string") return;

  const fetchQuote = async () => {
    try {
      const response = await fetch(`/api/getQuote?id=${id}`);
      const data = await response.json();
      console.log("Quote fetched:", data);
      setQuote(data); // or setQuote(data.data) if that's your API structure
    } catch (error) {
      console.error("Error fetching quote:", error);
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
    <>
      <div>
        <div className="page-main-container">
          <div>
            <div className='d-flex justify-content-between'>
              <div><h5 className="page-header">View Page:</h5></div>
              <div className="mb-3">
                <button className="btn back-btn" onClick={goBack}>Back</button>
              </div>
            </div>
            <div className="card pt-4 ps-3 pr-3">
              <div className="sub-ttl-cont">
                <h4 className="mb-4 sub-ttl">Lead Info</h4>
              </div>
              <div className="col-xl-12 col-md-12 col-lg-12">
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={3} className="text-center">Loading...</td>
                        </tr>
                      ) : !quote ? (
                        <tr>
                          <td colSpan={3} className="text-center">No data found</td>
                        </tr>
                      ) : (
                        <>
                          <tr>
                            <td><span className="w-50">Name</span></td>
                            <td>:</td>
                            <td><span className="font-weight-semibold">{quote.name}</span></td>
                          </tr>
                          <tr>
                            <td><span className="w-50">Email</span></td>
                            <td>:</td>
                            <td><span className="font-weight-semibold">{quote.email}</span></td>
                          </tr>
                          <tr>
                            <td><span className="w-50">Mobile</span></td>
                            <td>:</td>
                            <td><span className="font-weight-semibold">{quote.mobile}</span></td>
                          </tr>
                          <tr>
                            <td><span className="w-50">Service Looking</span></td>
                            <td>:</td>
                            <td><span className="font-weight-semibold">{quote.service}</span></td>
                          </tr>
                          <tr>
                            <td><span className="w-50">Description</span></td>
                            <td>:</td>
                            <td><span className="font-weight-semibold">{quote.description}</span></td>
                          </tr>
                          <tr>
                            <td><span className="w-50">Budget</span></td>
                            <td>:</td>
                            <td><span className="font-weight-semibold">{quote.budget}</span></td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View_quote;