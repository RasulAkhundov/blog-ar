import React from 'react';
import './posts.scss';
import moment from 'moment';

const Posts = ({ posts }) => {

   return (
      <div className="posts-area">
         <div className="row mx-1">
            {
               posts && posts.map((post, i) => (
                  <div className="col-12 col-sm-6 col-xl-4 mb-4" key={i}>
                     <div className="single-post">
                        <a href={`/post/${post._id}`}><div className="single-post-image" style={{ background: `url(${require('../../../../backend/uploads/post-images' + post.image)})`}}></div></a>
                        <div className="post-content">
                           <div className="post-info">
                              <div className="post-watch-count">
                                 <span className="material-symbols-outlined">
                                    visibility
                                 </span>
                                 <span className='watch-count'>{post.postViews}</span>
                              </div>
                              <div className="post-like-count">
                              <img id='post-like-button' src={require('../../assets/unlike.png')} width="15px" height="15px" style={{cursor: 'pointer', marginRight: '5px'}} alt="" />
                                 <span className='like-count'>{post.like.length}</span>
                              </div>
                           </div>
                           <div className="post-subject">
                              <a href={`/post/${post._id}`}><h3>{post.title}</h3></a>
                           </div>
                           <div className="post-author-date">
                              <span>{post.authorName} </span>
                              <i>{moment(post.date).startOf().fromNow()}</i>
                           </div>
                        </div>
                     </div>
                  </div>
               ))

            }
         </div>
         {/* <div className="load-more-section">
            <button type='button'>LOAD MORE</button>
         </div> */}
      </div>
   )
}

export default Posts