import React from 'react';
import './footer.scss';

const Footer = () => {

   return (
      <footer>
         <div className="container">
            <div className="subscribe-post-section">
               <h2>Subscribe to <i>new posts</i></h2>
               <div className="subscribe-form">
                  <input type="text" placeholder='Your Email Address'/>
                  <button type='button'>Subscribe</button>
               </div>
            </div>
            <div className="footer-content">
               <img src={require('../../assets/navbar/R-white.png')} alt="" />
               <div className="row pt-5">
                  <div className="col-12 col-sm-6 col-md-3 mb-3 mb-md-0">
                     <div className="footer-widget">
                        <h3>Social</h3>
                        <ul>
                           <li><i className="fa-brands fa-facebook"></i>Facebook</li>
                           <li><i className='fa-brands fa-instagram'></i>Instagram</li>
                           <li><i className="fa-brands fa-github"></i>Github</li>
                           <li><i className="fa-brands fa-linkedin"></i>Likedin</li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3 mb-md-0">
                     <div className="footer-widget">
                        <h3>Pages</h3>
                        <ul>
                           <a href="/"><li>Home</li></a>
                           <a href="/about"><li>About</li></a>
                           <a href="/contact"><li>Contact</li></a>
                        </ul>
                     </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3 mb-sm-0">
                     <div className="footer-widget">
                        <h3>Category</h3>
                        <div className="category-list">
                           <ul>
                              <li>Front End</li>
                              <li>UI Design</li>
                              <li>DataBases</li>
                           </ul>
                           <ul>
                              <li>Back End</li>
                              <li>UX Design</li>
                              <li>Graphic Design</li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                     <div className="footer-widget">
                        <h3>Membership</h3>
                        <ul>
                           <li>Sign in</li>
                           <li>Sign up</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer