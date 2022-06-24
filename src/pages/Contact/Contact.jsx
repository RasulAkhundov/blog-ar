import React from 'react';
import { Helmet } from 'react-helmet';
import SideBar from '../../components/sidebar/Sidebar';
import './contact.scss';

const Contact = () => {
  return (
   <div className="contact-me-section">
      <Helmet>
         <title>Contact</title>
      </Helmet>
      <div className="container">
         <div className="row">
            <div className="col-12 col-sm-11 col-lg-7 mb-5 mb-lg-0">
               <h2>Contact with me</h2>
               <div className="form-container">
                  <div className="row">
                     <div className="col-6">
                        <input type="text" autoFocus={true} placeholder='First Name'/>
                     </div>
                     <div className="col-6">
                        <input type="text" placeholder='Last Name'/>
                     </div>
                     <div className="col-12">
                        <input type="email" placeholder='Email'/>
                     </div>
                     <div className="col-12">
                        <textarea name="message" placeholder='Type your message...'></textarea>
                     </div>
                     <div className="form-button">
                        <button type='button'>SEND MESSAGE</button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-12 col-lg-4">
               <SideBar/>
            </div>
         </div>
      </div>
   </div>
  )
}

export default Contact