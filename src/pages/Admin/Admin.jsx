import React from 'react';
import { useState } from 'react';
import './admin.scss';
import $ from 'jquery';
import axios from 'axios';

const Admin = ({ userMe }) => {

   const [postImage, setPostImage] = useState(null);
   const [postDetails, setPostDetails] = useState({
      title: '',
      description: ''
   })

   ////IF USER IS NOT EXIST REDIRECT
   if(userMe.admin === false || !window.localStorage.getItem('user_token')) {
      window.location.href = '/';
   }

   const handleChange = (e) => {
      const {name, value} = e.target;

      setPostDetails((prevState) => {
         return {
            ...prevState,
            [name]:value
         }
      })
   }

   const createPost = async (e) => {
      e.preventDefault();

      const Post = ({
         title: postDetails.title,
         description: postDetails.description,
         image: postImage,
         authorName: userMe.username,
         authorImage: userMe.avatar
      })
      if(postImage == null || postDetails.title === '' || postDetails.description === '') {
         $('.post-error-box').css('display', 'flex');
         setTimeout(() => {
            $('.post-error-box').css('display', 'none');
         }, 3000)
      } else {
         await axios.post(`${process.env.REACT_APP_API_URL}/api/create-post`, Post, {
            headers: { "Content-Type": "multipart/form-data" }
         })
         .then(res => {
            window.location.href = '/';
            return res.data;
         })
         .catch(err => {
            console.log('error from creating post front end' + err);
         })
      }
   }

   return (
      <div className="dashboard">
         <div className="post-error-box">
            <span>Inputs cant be empty</span>
         </div>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-12 col-lg-8">
                  <div className="create-post-form">
                     <div className="row">
                        <div className="col-12">
                           <div className="post-image d-flex justify-content-center mb-4">
                              {postImage ? (
                                 <img className="writeImg" src={URL.createObjectURL(postImage)} alt="" />
                              ) :
                              (
                                 <img src={require('../../assets/add-photo.png')} className="img-fluid" style={{width: '400px'}} alt="" />
                              )}
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="file-group">
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
                              <input
                                 type="text"
                                 name='title'
                                 placeholder='Title'
                                 autoFocus={true}
                                 onChange={handleChange}
                              />
                           </div>
                           <div className="form-description">
                              <textarea
                              name="description"
                              placeholder='Description'
                              onChange={handleChange}
                              ></textarea>
                           </div>
                           <div className="form-button">
                              <button type='button' onClick={createPost}>CREATE POST</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Admin