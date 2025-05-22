import React, { useEffect, useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { Maximize, Bell } from "react-feather";
import Image from "next/image";
import Link from "next/link";
import useSidebarStore from "../../store/sidebarStore";
import { FiMoreVertical } from "react-icons/fi";
import { useRouter } from "next/router"; // Importing useRouter from next/router

import jirehlogo from "../../../public/assets/jireh-logo-new.png";
import jireh_closedlogo from "../../../public/assets/jireh-closed-logo.png";
import profile_pic from "../../../public/assets/vishnu.jpg";
import homelogo from "../../../public/assets/home.svg";
import getquote from "../../../public/assets/get-quote.svg";
import vishnuimage from "../../../public/assets/vishnu.jpg";
import announcement from "../../../public/assets/announcement.png";

export default function Header() {
  const { isOpen, toggleSidebar, setSidebarState } = useSidebarStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const router = useRouter(); // Accessing router to get current route

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSidebar = localStorage.getItem("sidebarState");
      if (storedSidebar) {
        setSidebarState(storedSidebar === "open");
      }
    }
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="container-fluid main-container fixed-top">
      <div className="navmain-cont d-flex">
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-logo">
              <Image className="img-fluid" src={jirehlogo} alt="Jireh Logo" />
            </div>
            <div className="header-logo-closed">
              <Image src={jireh_closedlogo} alt="Jireh Closed Logo" />
            </div>
          </div>

          <aside className="sidebar-content">
            <div className="sidebar-profile">
              <div className="d-flex justify-content-center user-profile">
                <Image
                  src={vishnuimage}
                  className="img-fluid rounded-circle profile-img"
                  alt="User Profile"
                  width={80}
                  height={80}
                />
              </div>
              <div className="text-center user-info text-white">
                <h5>Vishnu L</h5>
                <p>Web Developer</p>
              </div>
            </div>

            <ul>
              <li
                onClick={() => router.push("/")}
                className={router.pathname === "/" ? "active" : ""} // Dynamically check if the current page is Dashboard
              >
                <Link href="/" className="d-flex align-items-center">
                  <Image src={homelogo} alt="home" className="img-fluid sidebar-icon" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li
                onClick={() => router.push("/getquote")}
                className={router.pathname === "/getquote" ? "active" : ""} // Dynamically check if the current page is Get a Quote
              >
                <Link href="/getquote" className="d-flex align-items-center">
                  <Image src={getquote} alt="quote" className="img-fluid sidebar-icon" />
                  <span>Get a Quote</span>
                </Link>
              </li>
              <li
                onClick={() => router.push("/careers")}
                className={router.pathname === "/careers" ? "active" : ""} // Dynamically check if the current page is Careers
              >
                <Link href="/careers" className="d-flex align-items-center">
                  <FaBriefcase size={24} color="white" className="img-fluid sidebar-icon" />
                  <span>Careers</span>
                </Link>
              </li>
            </ul>

            <div className="announcement-card">
              <div className="text-center">
                <h5 className="text-white">Announcement</h5>
                <div className="announcement-bg">
                  <Image src={announcement} alt="announcement" className="img-fluid" />
                </div>
                <p className="sub-text">Make an announcement to our employees</p>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-block btn-announcement text-white announcement-create-text">
                  Create Announcement
                </button>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-block text-white history-btn announcement-create-text">
                  Announcement History
                </button>
              </div>
            </div>
          </aside>
        </div>

        <div className="toggle-btn-wrapper">
          <button className="toggle-btn" onClick={toggleSidebar}>
            <img
              src={isOpen ? "/assets/opentoggle.svg" : "/assets/closetoggle.svg"}
              alt={isOpen ? "Close Sidebar" : "Open Sidebar"}
              className="toggle-img"
            />
          </button>
        </div>
        <div className="company-logo-md">
          <Image className="img-fluid" src={jirehlogo} alt="Jireh Logo" />
        </div>

        <div className="d-flex order-lg-2 my-auto ms-auto">
          <div className="navbar navbar-expand-lg navbar-nav-right responsive-navbar navbar-dark p-0">
            <div className="nav-link-cont ms-auto">
              <div className="fimore">
                <button className="nav-link icon " onClick={() => setShowMore(!showMore)}>
                  <FiMoreVertical size={24} color="#4676ac" />
                </button>
              </div>

              <div className={`d-flex showmore-cont  ${showMore ? "show-more" : ""} container-fluid `}>
                <button className={`nav-link icon ${isFullscreen ? "active" : ""}`} onClick={toggleFullscreen}>
                  <Maximize size={24} color="#4676ac" />
                </button>
             
                <div className="nav-link-dw ">
                  <div className=" profile-dropdown">
                    <div className="avatar-container">
                      <Image
                        src={profile_pic}
                        alt="profile"
                        className="avatar avatar-md bradius"
                      />
                    </div>
                    {/* Profile Dropdown Menu */}
                    <div className="profile-dropdown-menu">
                      
                      <button className="dropdown-item">Logout</button>
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
