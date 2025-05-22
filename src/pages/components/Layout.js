import React from "react";
import useSidebarStore from "../../store/sidebarStore";
import Header from "./Header"; 
import Footer from './footer'

const Layout = ({ children }) => {
  const { isOpen } = useSidebarStore();

  return (
    <div className="layout">
      <Header /> 
      <main className={`page-main-content top-border-main ${isOpen ? "content-expanded" : "content-collapsed"}`}>
        {children} 
      
      </main>
      <Footer/>

    </div>
  );
};

export default Layout;
