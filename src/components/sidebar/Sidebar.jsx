import React from 'react';
import './sidebar.scss'

const SideBar = () => {
   return (
      <div className="sidebar-area">
         <div className="row">
            <div className="col-12">
               <div className="sidebar-content">
                  <div className="sidebar-title">
                     <h3>ABOUT ME</h3>
                  </div>
                  <div className="sidebar-image"></div>
                  <div className="sidebar-description">
                     <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi tempora vero autem eos, laborum dolores quia repellat delectus, ipsa perspiciatis saepe quos iure aspernatur laboriosam!</p>
                  </div>
                  <div className="sidebar-title">
                     <h3>CATEGORIES</h3>
                  </div>
                  <div className="category-lists">
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
                  <div className="sidebar-title">
                     <h3>FOLLOW ME</h3>
                     <div className="social-links">
                        <ul>
                           <li><i className="fa-brands fa-facebook-square"></i></li>
                           <li><i className="fa-brands fa-instagram-square"></i></li>
                           <li><i className="fa-brands fa-linkedin"></i></li>
                           <li><i className="fa-brands fa-github-square"></i></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SideBar