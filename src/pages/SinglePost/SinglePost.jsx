import React from 'react';
import './singlePost.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
import moment from 'moment';
import loading from '../../assets/loading.svg';
import Sidebar from '../../components/sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SinglePost = ({ userMe }) => {

  const [singlePost, setSinglePost] = useState('');
  const [previousPost, setPreviousPost] = useState('');
  const [nextPost, setNextPost] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [postEditDetails, setPostEditDetails] = useState({
    title: singlePost.title,
    description: singlePost.description
  });
  const [comment, setComment] = useState('');
  const [userLiked, setUserLiked] = useState(false);
  const [likeID, setLikeID] = useState('');

  // let id = window.location.pathname.slice(6);
  let { id } = useParams();
  useEffect(() => {
    async function fetchData() {

      ////GETTING SINGLE POST FOR ID FUNCTION
      const singlePost = await axios.get(`${process.env.REACT_APP_API_URL}/api/post/${id}`).then(res => res.data.singlePost)
      setSinglePost(singlePost);

      ///GETTING PREVIOUS POST FUNCTION
      const previousPost = await axios.get(`${process.env.REACT_APP_API_URL}/api/previous/${id}`).then(res => res.data.previousPost[0]);
      setPreviousPost(previousPost);

      ///GETTING NEXT POST FUNCTION
      const nextPost = await axios.get(`${process.env.REACT_APP_API_URL}/api/next/${id}`).then(res => res.data.nextPost[0]);
      setNextPost(nextPost);

      ///UP POST VIEWS FUNCTION
      await axios.put(`${process.env.REACT_APP_API_URL}/api/post-views-update/${singlePost._id}/view/${singlePost.postViews}`)
        .then(res => {
          return res.data;
        });
    }
    fetchData();
  }, []);

  ////GETTING USER LIKE SITUATION FUNCTION
  useEffect(() => {
    if (singlePost) {
      singlePost.like.filter(l => {
        if (l.user === userMe._id) {
          setUserLiked(true);
          setLikeID(l._id);
        }
        if (l.user !== userMe._id) {
          setUserLiked(false);
        }
      });
    }
  }, [singlePost])

  ///POST EDIT HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostEditDetails((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  ///EDIT POST FUNCTION
  const editPost = async (e) => {
    e.preventDefault();

    const editDetails = {
      title: postEditDetails.title,
      description: postEditDetails.description,
      image: postImage
    }

    if (postImage === null) {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/api/edit-post/${singlePost._id}/filename/${singlePost.image}`, postEditDetails)
        .then(res => {
          window.location.reload();
          return res.data;
        })
    } else {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/api/edit-post/${singlePost._id}/filename/${singlePost.image}`, editDetails, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          window.location.reload();
          return res.data;
        })
    }
  }

  ///REMOVING POST FUNCTION
  const removingFunction = async () => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/delete-post/${singlePost._id}/filename/${singlePost.image}`)
      .then(res => {
        window.location.href = '/';
        return res.data;
      });
  }

  ///MADE COMMENT FUNCTION
  const doComment = async (e) => {
    e.preventDefault();

    const commentDetails = {
      comment: comment,
      authorName: userMe.username,
      authorImage: userMe.avatar
    }

    if (comment === '') {
      $('#comment-error-text').css('display', 'flex');
    } else {
      $('#comment-error-text').css('display', 'none');
      await axios.post(`${process.env.REACT_APP_API_URL}/api/do-comment/${singlePost._id}`, commentDetails)
        .then(res => {
          window.location.reload();
          return res.data;
        })
    }
  }

  ///MADE LIKE FUNCTION
  const doLike = async (e) => {
    e.preventDefault();

    const likeDetails = {
      postID: singlePost._id,
      userID: userMe._id
    }

    if (userLiked === true) {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/api/do-unlike/${singlePost._id}/${likeID}`)
        .then(res => {
          $('#post-like-button').attr('src', require("../../assets/unlike.png"));
          $('#post-like-count').text(singlePost.like.length - 1);
          window.location.reload();
          return res.data;
        })
        .catch(err => console.log('error from do unlike frontend ' + err))
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/do-like`, likeDetails)
        .then(res => {
          $('#post-like-button').attr('src', require("../../assets/like.png"));
          $('#post-like-count').text(res.data.like.like.length + 1);
          window.location.reload();
          return res.data;
        })
        .catch(err => console.log('error from do like front end ' + err));
    }
  }

  ///REGISTER MODAL FUNCTION
  const registerModal = () => {
    $('.navbar .register-modal').css('display', 'flex');
  }
  ///DELETE MODAL OPEN FUNCTION
  const deleteActiveToggle = () => {
    $('.single-post-area .delete-modal').css('display', 'flex');
  }
  ///DELETE MODAL CLOSE FUNCTION
  const deleteCloseToggle = () => {
    $('.single-post-area .delete-modal').css('display', 'none');
  }
  ///EDIT MODAL OPEN FUNCTION
  const editActiveToggle = () => {
    $('.single-post-area .edit-modal').css('display', 'flex');
  }
  ///EDIT MODAL CLOSE FUNCTION
  const editCloseToggle = () => {
    $('.single-post-area .edit-modal').css('display', 'none');
  }
  ////LOOK IMAGE MODAL OPEN FUNCTION
  const lookImage = () => {
    $('.look-image').css('display', 'flex');
  }
  ////LOOK IMAGE MODAL Close FUNCTION
  const closeLookImage = () => {
    $('.look-image').css('display', 'none');
  }

  return (
    <div className="single-post-area">
      <Helmet>
        <title>{singlePost.title}</title>
      </Helmet>
      <div className="look-image" onClick={closeLookImage}>
        <div className="modal-layout" onClick={e => e.stopPropagation()}>
          <span className="material-symbols-outlined" onClick={closeLookImage}>
            close
          </span>
          <img src={singlePost && require('../../../public/uploads/post-images/' + singlePost.image)} alt="" />
        </div>
      </div>
      <div className="edit-modal" onClick={editCloseToggle}>
        <div className="modal-layout">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8 px-4">
              <div className="create-post-form" onClick={e => e.stopPropagation()}>
                <div className="row">
                  <div className="col-12">
                    <div className="post-image d-flex justify-content-center mb-4">
                      {postImage ? (
                        <img className="writeImg" src={URL.createObjectURL(postImage)} alt="" />
                      ) :
                        (
                          <img src={singlePost && require('../../../public/uploads/post-images/' + singlePost.image)} className="img-fluid" style={{ width: '400px' }} alt="" />
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
                        defaultValue={singlePost && singlePost.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-description">
                      <textarea
                        name="description"
                        placeholder='Description'
                        defaultValue={singlePost && singlePost.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="form-button">
                      <button className='close' type='button' onClick={editCloseToggle}>CLOSE</button>
                      <button type='button' onClick={editPost} >EDIT POST</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="delete-modal" onClick={deleteCloseToggle}>
        <div className="modal-layout" onClick={e => e.stopPropagation()}>
          <div className="modal-title">
            <h3>Do you want to remove this post</h3>
          </div>
          <div className="modal-buttons">
            <button type='button' onClick={deleteCloseToggle}>Close</button>
            <button className='delete-button' type='button' onClick={removingFunction}>Remove</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 mb-5 mb-lg-0">
            {
              singlePost || previousPost || nextPost ?
                <div className="single-post-content">
                  <img className='single-post-image' src={singlePost && require('../../../public/uploads/post-images/' + singlePost.image)} onClick={lookImage} alt="" />
                  <div className="post-configuration">
                    <div className="single-post-counter">
                      <div className="views">
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                        <small>{singlePost.postViews + 1}</small>
                      </div>
                      <div className="like">
                        <img id='post-like-button' onClick={userMe ? doLike : registerModal} src={userLiked === false ? require('../../assets/unlike.png') : require('../../assets/like.png')} width="24px" height="24px" style={{ cursor: 'pointer', marginRight: '5px' }} alt="" />
                        <small id="post-like-count">{singlePost.like.length}</small>
                      </div>
                    </div>
                    {
                      userMe.admin === true &&
                      <div className="single-post-configuration">
                        <span className="edit material-symbols-outlined" onClick={editActiveToggle}>
                          edit
                        </span>
                        <span className="delete material-symbols-outlined" onClick={deleteActiveToggle}>
                          delete
                        </span>
                      </div>
                    }
                  </div>
                  <div className="single-post-title">
                    <h3>{singlePost.title}</h3>
                  </div>
                  <div className="single-post-author-date">
                    <div className="author d-flex align-items-start align-items-sm-center flex-column flex-sm-row">
                      <div className="author-info">
                        <img src={require('../../assets/no-user.png')} alt="" />
                        <span>{singlePost.authorName}</span>
                      </div>
                    </div>
                    <div className="date">
                      <i>{moment(singlePost.date).startOf().fromNow()}</i>
                    </div>
                  </div>
                  <div className="single-post-description mb-5">
                    <h2 style={{ fontFamily: 'Bebas Neue, cursive' }}>{singlePost && singlePost.description.slice(0, 1)}</h2>
                    <p>{singlePost && singlePost.description.slice(1)}</p>
                  </div>
                </div>
                :
                <div className="loading-box">
                  <img src={loading} alt="" />
                </div>
            }
            <div className="previous-next-area">
              <div className="row">
                <div className="col-col-12 col-md-6 mb-3 mb-md-0">
                  {
                    previousPost &&
                    <a href={'/post/' + previousPost._id} style={{ textDecoration: 'none', color: '#ebebeb' }}>
                      <div className="previous-content prev-next-content">
                        <div className="content-navigation">
                          <span className="material-symbols-outlined">
                            keyboard_backspace
                          </span>
                          <small>Previous post</small>
                        </div>
                        <div className="content-body d-flex align-items-center">
                          <img src={require('../../../public/uploads/post-images/' + previousPost.image)} className="img-fluit" alt="" />
                          <h3>{previousPost.title}</h3>
                        </div>
                      </div>
                    </a>
                  }
                </div>
                <div className="col-12 col-md-6">
                  {
                    nextPost &&
                    <a href={'/post/' + nextPost._id} style={{ textDecoration: 'none', color: '#ebebeb' }}>
                      <div className="next-content prev-next-content">
                        <div className="content-navigation d-flex align-items-center justify-content-end">
                          <small style={{ marginRight: '5px' }}>Next post</small>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                        </div>
                        <div className="content-body d-flex align-items-center">
                          <img src={require('../../../public/uploads/post-images/' + nextPost.image)} className="img-fluit" alt="" />
                          <h3>{nextPost.title}</h3>
                        </div>
                      </div>
                    </a>
                  }
                </div>
              </div>
            </div>
            {
              singlePost &&
              <div className="comment-section mt-4">
                <div className="section-header">
                  <h2>Comments</h2>
                </div>
                <div className="row">
                  <div className="col-12">
                    {
                      userMe ?
                        <div className="write-comment-area">
                          <img src={require('../../assets/no-user.png')} alt="" />
                          <div className="input">
                            <span id="comment-error-text">Please enter a comment</span>
                            <textarea
                              type="text"
                              placeholder='Add a comment...'
                              onChange={e => setComment(e.target.value)}
                            ></textarea>
                            <button type='button' onClick={doComment} id="do-comment-btn">COMMENT</button>
                          </div>
                        </div>
                        :
                        <div className="write-comment-layer">
                          <span onClick={registerModal} style={{ color: '#14AE9C', marginRight: '5px', cursor: 'pointer' }}>Sing in</span><span>to comment</span>
                        </div>
                    }
                  </div>
                  <div className="row d-flex flex-column-reverse" id='comment-box-wrapper'>
                    {
                      singlePost.comments.length > 0 ? singlePost.comments.map((comment, i) => (
                        <div className="col-12 mb-3" key={i}>
                          <div className="comment-made-area">
                            <img src={require('../../assets/no-user.png')} alt="" />
                            <div className="comment-made-content">
                              {
                                userMe.admin === true &&
                                <div className="delete-icon">
                                  <span className="delete material-symbols-outlined">
                                    delete
                                  </span>
                                </div>
                              }
                              <div className="comment-header">
                                <span>{comment.authorName}</span>
                                <small>{moment(comment.date).startOf().fromNow()}</small>
                              </div>
                              <div className="comment">
                                <p>{comment.comment}</p>
                              </div>
                              <div className="comment-footer">
                                <div className="like">
                                  <span className="material-symbols-outlined" style={{ cursor: "pointer" }}>
                                    favorite
                                  </span>
                                  <small>0</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                        :
                        <span style={{ textAlign: 'center', color: '#888d93' }}>Be the first commenter...</span>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="col-12 col-lg-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePost