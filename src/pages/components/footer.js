import React from 'react'
import BackToTop from './BackToTop'

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-md-12 col-sm-12 mt-3 mt-lg-0 text-center">
              Copyright © 2023{' '}
              <a href="">Jireh</a>. All rights reserved.
            </div>
          </div>
        </div>
        <BackToTop/>
      </footer>
    </>
  )
}

export default Footer
