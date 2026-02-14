import React, { useEffect, useState, ReactNode  } from "react";
import Image from "next/image";
import Link from "next/link";
import useSidebarStore from "../../store/sidebarStore";
import { useRouter } from "next/router";
import jirehlogo from "../../../public/assets/jireh-logo.png";
import jireh_closedlogo from "../../../public/assets/small-logo.png";
import {
  RiMenu2Line,
  RiCloseLine,
  RiMessage3Line,
  RiBriefcaseLine,
  RiHome5Line,
  RiUserLine,
  RiGroupLine,
} from "react-icons/ri";

type MenuItem = {
  title: string;
  path: string;
  roles: string[];
  icon: ReactNode;
};

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    roles: ["Admin", "Manager", "HR", "Employee", "Intern", "Sales"],
    icon: <RiHome5Line color="white" className="img-fluid sidebar-icon fs-4" />,
  },
  {
    title: "Leads",
    path: "/getquote",
    roles: ["Admin", "Manager", "HR", "Sales"],
    icon: <RiMessage3Line color="white" className="img-fluid sidebar-icon fs-4" />,
  },
  {
    title: "Careers",
    path: "/joblist",
    roles: ["Admin", "Manager", "HR"],
    icon: <RiBriefcaseLine color="white" className="img-fluid sidebar-icon fs-4" />,
  },
  {
    title: "User Management",
    path: "/usermanagement",
    roles: ["Admin", "Manager"],
    icon: <RiGroupLine color="white" className="img-fluid sidebar-icon fs-4" />,
  },
  {
    title: "Blog",
    path: "/blog",
    roles: ["Admin", "Manager"],
    icon: <RiMessage3Line color="white" className="img-fluid sidebar-icon fs-4" />,
  }
];

function normalizePath(path: string): string {
  if (!path) return "/";
  const noQuery = path.split("?")[0];
  const trimmed = noQuery.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export default function Header() {
  const { isOpen, toggleSidebar, setSidebarState } = useSidebarStore();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSidebar = localStorage.getItem("sidebarState");
      if (storedSidebar) {
        setSidebarState(storedSidebar === "open");
      }

      const storedRole = localStorage.getItem("role");
      setRole(storedRole);
    }
  }, [setSidebarState]);

  const current = normalizePath(router.asPath);

  return (
    <div className="container-fluid main-container fixed-top">
      <div className="navmain-cont d-flex">
        {/* Sidebar */}
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
              {menuItems
                .filter((item) => !role || item.roles.includes(role)) // ✅ role check
                .map((item) => {
                  const itemPath = normalizePath(item.path);

                  // Active if exact match OR current path starts with the menu path
                  // Handle special route relationships
const relatedPaths: Record<string, string[]> = {
  "/getquote": ["/add-lead", "/edit-lead"], // ✅ mark Leads active for add/edit lead pages
  "/blog": ["/add-blog", "/edit-blog", "/view-blog"],     // example if needed later
  "/usermanagement":["/add-user", "/view-user"],
  "/careers":["/joblist", "/add-job", "/view-careers"]
};

const isRelated =
  relatedPaths[itemPath]?.some((related) => current.startsWith(related)) ?? false;

const isActive =
  current === itemPath ||
  (itemPath !== "/" && current.startsWith(itemPath)) ||
  isRelated;

                  return (
                    <li
                      key={item.path}
                      onClick={() => router.push(item.path)}
                      className={isActive ? "active" : ""}
                    >
                      <Link href={item.path} className="d-flex align-items-center">
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </aside>
        </div>

        {/* Toggle button */}
        <div className="toggle-btn-wrapper">
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? <RiMenu2Line /> : <RiCloseLine className="recolor" />}
          </button>
        </div>

        {/* Logo */}
        <div className="company-logo-md">
          <Image className="img-fluid" src={jirehlogo} alt="Jireh Logo" width={80} />
        </div>

        {/* Profile/Logout */}
        <div className="d-flex order-lg-2 my-auto ms-auto">
          <div className="navbar navbar-expand-lg navbar-nav-right responsive-navbar navbar-dark p-0">
            <div className="nav-link-cont ms-auto">
              <div className="d-flex showmore-cont container-fluid ">
                <div className="nav-link-dw ">
                  <div className=" profile-dropdown">
                    <div className="avatar-container user_icon">
                      <RiUserLine />
                    </div>
                    <div className="profile-dropdown-menu">
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          localStorage.removeItem("admin_token");
                          localStorage.removeItem("role");
                          router.push("/login");
                        }}
                      >
                        Logout
                      </button>
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
