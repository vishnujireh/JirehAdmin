import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RiMessage3Line, RiBriefcaseLine, RiUserFollowLine  } from "react-icons/ri";

const Dashboard = () => {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    if (!token) {
      router.replace("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) return null;

  return (
  <>
   <div className="page-main-container p-3">
      <h5 className="page-header mb-4">Dashboard</h5>
      <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-7">
                    <div className="mt-0 text-start">
                      <h6 className="fw-semibold">Total Leads</h6>
                      <h3 className="mb-0 mt-auto text-info fw-bolder">51</h3>
                    </div>
                  </div>
                  <div className="col-5 text-end">
                    <div className="icon1 block  bg-info my-auto  float-end rounded"  style={{ width: '50px', height: '50px', lineHeight: '45px', textAlign: 'center'}}>
                      <RiMessage3Line className="text-white fs-4 lh-md" />
                       </div>
                  </div>
                </div>
                </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-7">
                    <div className="mt-0 text-start">
                      <h6 className="fw-semibold">Career</h6>
                      <h3 className="mb-0 mt-auto text-primary fw-bolder">51</h3>
                    </div>
                  </div>
                  <div className="col-5 text-end">
                    <div className="icon1 bg-primary my-auto float-end rounded" style={{ width: '50px', height: '50px', lineHeight:'45px', textAlign:'center' }}>
                       <RiBriefcaseLine className="text-white fs-4 lh-md"/>
                       </div>
                  </div>
                </div>
                </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-7">
                    <div className="mt-0 text-start">
                      <h6 className="fw-semibold">Shortlisted Leads</h6>
                      <h3 className="mb-0 mt-auto text-warning fw-bolder">51</h3>
                    </div>
                  </div>
                  <div className="col-5 text-end">
                    <div className="icon1 bg-warning my-auto  float-end rounded" style={{ width: '50px', height: '50px', lineHeight:'45px', textAlign:'center' }}> 
                      <RiUserFollowLine className="text-white fs-4 lh-md" /> 
                    </div>
                  </div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
  </>
   ) ;
};

export default Dashboard;