import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SideBar from '../../components/sidebar/Sidebar';
import './profile.scss';

const Profile = ({ userMe }) => {

   const [postImage, setPostImage] = useState(null);

   if(!window.localStorage.getItem('user_token')) {
      window.location.href = '/';
   }

   const deleteAccount = async () => {
      const alert = window.confirm('Do you want to delete this user?');

      if(alert) {
         await axios
         .delete(`${process.env.REACT_APP_API_URL}/api/delete-account/${userMe._id}`)
         .then(res => {
            window.localStorage.removeItem('user_token');
            window.location.href = '/';
            return res.data;
         })
      }
   }

   return (
      <div className="profile-section">
         <Helmet>
            <title>Profile</title>
         </Helmet>
         <div className="container">
            <div className="row">
               <div className="col-12 col-sm-11 col-lg-7 mb-5 mb-lg-0">
                  <div className="profile-wrapper">
                     <div className="profile-header-text">
                        <h2>Update your account</h2>
                        <span onClick={deleteAccount}>Delete account</span>
                     </div>
                     <div className="profile-form">
                        <h3>Profile picture</h3>
                        <div className="profile-image mb-5">
                           {
                              postImage ?
                              <img src={URL.createObjectURL(postImage)} alt="" />
                              :
                              <img src={userMe && require('../../assets/' + userMe.avatar)} alt="" />
                           }
                           <div className="image-file-choose">
                              <label htmlFor="fileInput">
                                 <span className="material-symbols-outlined">
                                    add_a_photo
                                 </span>
                              </label>
                              <input
                                 type="file"
                                 id='fileInput'
                                 style={{ display: 'none' }}
                                 onChange={e => setPostImage(e.target.files[0])}
                              />
                           </div>
                        </div>
                        <div className="profile-username mb-5">
                           <h3>Username</h3>
                           <div className="username-input">
                              <input
                              type="text"
                              id='profile-username-input'
                              defaultValue={userMe.username}
                              />
                           </div>
                        </div>
                        <div className="profile-email mb-5">
                           <h3>Email</h3>
                           <div className="email-input">
                              <input
                              type="email"
                              id='profile-email-input'
                              defaultValue={userMe.email}
                              />
                           </div>
                        </div>
                        <div className="profile-password">
                           <h3>Password</h3>
                           <div className="password-input">
                              <input
                              type="password"
                              id='profile-password-input'
                              placeholder='Password'
                              />
                           </div>
                        </div>
                        <div className="profile-edit-button">
                           <button type='button'>Update</button>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-12 col-lg-4">
                  <SideBar />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Profile