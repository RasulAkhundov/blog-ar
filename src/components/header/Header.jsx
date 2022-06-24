import React from 'react';
import './header.scss';

const Header = () => {
   return (
      <header>
         <div className="header-side"></div>
         <div className="header-content">
            <div className="container" data-aos="zoom-in" data-aos-duration="1000">
               <div className="row">
                  <div className="col-12">
                     <h2>Welcome to my personal Blog</h2>
                     <h4>Programming, Projects, Design and more!</h4>
                     <a href="/about"><button type='button'>ABOUT ME</button></a>
                  </div>
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header