import React from 'react'


import { useRouter } from 'next/router';

const View_quote = () => {
  
  const router = useRouter();


  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div >
        <div className="page-main-container">
          <div className=""> 
            <div className='d-flex justify-content-between' >
              <div className=""><h5 className="page-header ">View Page:</h5></div>
        
              <div className="mb-3">
                <button
                  className="btn back-btn"
                  onClick={goBack} 
                >
                  Back
                </button>
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
                      <tr>
                        <td>
                          <span className="w-50"> Name </span>
                        </td>
                        <td>:</td>
                        <td>
                          <span className="font-weight-semibold">chandu</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="w-50"> Email </span>
                        </td>
                        <td>:</td>
                        <td>
                          <span className="font-weight-semibold">chandu@gmail.com</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="w-50">Mobile</span>
                        </td>
                        <td>:</td>
                        <td>
                          <span className="font-weight-semibold">9866019049</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="w-50">Service Looking</span>
                        </td>
                        <td>:</td>
                        <td>
                          <span className="font-weight-semibold">Mobile App Development</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="w-50">Description</span>
                        </td>
                        <td>:</td>
                        <td>
                          <span className="font-weight-semibold">it shvsd ahsa</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="w-50">Budget</span>
                        </td>
                        <td>:</td>
                        <td>
                          <span className="font-weight-semibold">$100-$2000</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="w-50">Description</span>
                        </td>
                        <td>:</td>
                        <td>
                          <span className="font-weight-semibold">$100-$2000</span>
                        </td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>



          </div>

        </div>

      </div>

    </>
  )
}

export default View_quote
