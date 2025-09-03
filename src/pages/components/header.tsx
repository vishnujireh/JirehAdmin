import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useSidebarStore from "../../store/sidebarStore";
import { useRouter } from "next/router"; // Importing useRouter from next/router
import jirehlogo from "../../../public/assets/jireh-logo.png";
import jireh_closedlogo from "../../../public/assets/small-logo.png";
import { RiMenu2Line, RiCloseLine, RiMessage3Line, RiBriefcaseLine, RiHome5Line, RiUserLine,RiGroupLine } from "react-icons/ri";
export default function Header() {
  const { isOpen, toggleSidebar, setSidebarState } = useSidebarStore();
  const router = useRouter(); // Accessing router to get current route

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSidebar = localStorage.getItem("sidebarState");
      if (storedSidebar) {
        setSidebarState(storedSidebar === "open");
      }
    }
  }, [setSidebarState]);


  return (
    <div className="container-fluid main-container fixed-top">
      <div className="navmain-cont d-flex">
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-logo">
              <Image className="img-fluid" src={jirehlogo} alt="Jireh Logo" width={80} />
            </div>
            <div className="header-logo-closed">
              <Image src={jireh_closedlogo} alt="Jireh Closed Logo" width={30} />
            </div>
          </div>

          <aside className="sidebar-content">


            <ul>
              <li
                onClick={() => router.push("/dashboard")}
                className={router.pathname === "/dashboard" ? "active" : ""} // Dynamically check if the current page is Dashboard
              >
                <Link href="/dashboard" className="d-flex align-items-center">
                  <RiHome5Line color="white" className="img-fluid sidebar-icon fs-4" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li
                onClick={() => router.push("/getquote")}
                className={
                  router.pathname === "/getquote" || router.pathname === "/view-quote" || router.pathname ==="/add-lead"
                    ? "active"
                    : ""
                }
              >
                <Link href="/getquote" className="d-flex align-items-center">
                  <RiMessage3Line color="white" className="img-fluid sidebar-icon fs-4" />
                  <span>Leads</span>
                </Link>
              </li>
              <li
                onClick={() => router.push("/careers")}
                className={router.pathname === "/careers" ? "active" : ""} // Dynamically check if the current page is Careers
              >
                <Link href="/careers" className="d-flex align-items-center">
                  <RiBriefcaseLine color="white" className="img-fluid sidebar-icon fs-4" />
                  <span>Careers</span>
                </Link>
              </li>
              <li
                onClick={() => router.push("/usermanagement")}
                className={
                  router.pathname === "/usermanagement" || router.pathname === "/add-user"
                    ? "active"
                    : ""
                }
              >
                <Link href="/usermanagement" className="d-flex align-items-center">
                  <RiGroupLine color="white" className="img-fluid sidebar-icon fs-4" />
                  <span>User Management</span>
                </Link>
              </li>
            </ul>

          </aside>
        </div>

        <div className="toggle-btn-wrapper">
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? <RiMenu2Line /> : <RiCloseLine className="recolor" />}

          </button>
        </div>
        <div className="company-logo-md">
          <Image className="img-fluid" src={jirehlogo} alt="Jireh Logo" width={80} />
        </div>

        <div className="d-flex order-lg-2 my-auto ms-auto">
          <div className="navbar navbar-expand-lg navbar-nav-right responsive-navbar navbar-dark p-0">
            <div className="nav-link-cont ms-auto">


              <div className={`d-flex showmore-cont container-fluid `}>


                <div className="nav-link-dw ">
                  <div className=" profile-dropdown">
                    <div className="avatar-container user_icon">

                      <RiUserLine />
                    </div>
                    {/* Profile Dropdown Menu */}
                    <div className="profile-dropdown-menu">

                      <button className="dropdown-item"
                        onClick={() => {
                          console.log("Logout clicked");
                          localStorage.removeItem("admin_token");
                          router.push("/login");
                        }}
                      >Logout</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
