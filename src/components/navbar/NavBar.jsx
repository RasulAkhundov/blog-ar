import React, { useState } from 'react';
import './navbar.scss';
import $ from 'jquery';
import axios from 'axios';
import loading from '../../assets/loading.svg';

const NavBar = ({ userMe }) => {

   const [menuActive, setMenuActive] = useState(false);
   const [searchActive, setSearchActive] = useState(false);
   const [passwordShow, setPasswordShow] = useState(false);
   const [registerLocation, setRegisterLocation] = useState(false);
   const [registerModalActive, setRegisterModalActive] = useState(false);
   const [registerDetails, setRegisterDetails] = useState({
      username: '',
      email: '',
      password: ''
   });
   const [loginDetails, setLoginDetails] = useState({
      email: '',
      password: ''
   })

   //////REGISTER HANDLE CHANGE
   const registerChange = (event) => {
      const { name, value } = event.target;
      setRegisterDetails((prevState) => {
         return {
            ...prevState,
            [name]: value
         }
      })
   }

   //////Login HANDLE CHANGE
   const loginChange = (event) => {
      const { name, value } = event.target;
      setLoginDetails((prevState) => {
         return {
            ...prevState,
            [name]: value
         }
      })
   }

   ///EMAIL VALIDATIOn
   const validateEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
   };

   /////REGISTER VALIDATION
   const registerValidate = (registerDetails) => {
      if (registerDetails.username.length < 3) {
         $('.error-box').css('display', 'flex');
         $('.error-box span').text(`Username can't be less than 3 character!`);
         $('.input-widget.username input').css('border', '1px solid #a72237');
         return false;
      } else {
         $('.input-widget.username input').css('border', '1px solid #3f4851');
      }
      if (registerDetails.username.length > 20) {
         $('.error-box').css('display', 'flex');
         $('.error-box span').text(`Username can't be more than 20 character!`);
         $('.input-widget.username input').css('border', '1px solid #a72237');
         return false;
      } else {
         $('.input-widget.username input').css('border', '1px solid #3f4851');
      }
      if (!validateEmail(registerDetails.email)) {
         $('.error-box').css('display', 'flex');
         $('.error-box span').text(`Email is not correct!`);
         $('.input-widget.email input').css('border', '1px solid #a72237');
         return false;
      } else {
         $('.input-widget.email input').css('border', '1px solid #3f4851');
      }
      if (registerDetails.password.length < 6) {
         $('.error-box').css('display', 'flex');
         $('.error-box span').text(`Password can't be less than 6 character!`);
         $('.input-widget.password input').css('border', '1px solid #a72237');
         return false;
      } else {
         $('.input-widget.password input').css('border', '1px solid #3f4851');
      }
      $('.error-box').css('display', 'none');
      return true;
   }

   ///LOGIN VALIDATION
   const loginValidate = (loginDetails) => {
      if (!validateEmail(loginDetails.email)) {
         $('.error-box').css('display', 'flex');
         $('.error-box span').text(`Email is not correct!`);
         $('.input-widget.email input').css('border', '1px solid #a72237');
         return false;
      } else {
         $('.input-widget.email input').css('border', '1px solid #3f4851');
      }
      if (loginDetails.password.length < 6) {
         $('.error-box').css('display', 'flex');
         $('.error-box span').text(`Password can't be less than 6 character!`);
         $('.input-widget.password input').css('border', '1px solid #a72237');
         return false;
      } else {
         $('.input-widget.password input').css('border', '1px solid #3f4851');
      }
      $('.error-box').css('display', 'none');
      return true;
   }

   const registerHandler = async (e) => {
      e.preventDefault();

      const User = ({
         username: registerDetails.username,
         email: registerDetails.email,
         password: registerDetails.password
      })

      if (registerValidate(registerDetails)) {
         const token = await axios.post(`${process.env.REACT_APP_API_URL}/api/sign-up`, User)
            .then(res => {
               return res.data
            })
            .catch(err => {
               console.log('error from sign up front end' + err)
               if (err.response.data.error.errors.email) {
                  $('.error-box').css('display', 'flex');
                  $('.error-box span').text(`This Email is already using!`);
               }
            })
         if (token.user) {
            $('.register-loading-box').css('display', 'flex');
            setTimeout(() => {
               window.localStorage.setItem('user_token', token.user);
               window.location.reload();
            }, 1000)
         }
         console.log(token)
      }
   }

   const loginHandler = async (e) => {
      e.preventDefault();

      if (loginValidate(loginDetails)) {
         const User = ({
            email: loginDetails.email,
            password: loginDetails.password
         })
         const token = await axios.post(`${process.env.REACT_APP_API_URL}/api/sign-in`, User)
            .then(res => res.data);
         if (token.user) {
            $('.register-loading-box').css('display', 'flex');
            setTimeout(() => {
               window.localStorage.setItem('user_token', token.user);
               window.location.reload();
            }, 1000)
         } else {
            console.log(token.alert);
            $('.error-box').css('display', 'flex');
            $('.error-box span').text(`${token.alert.msg}`);
         }
      }
   }

   ////Menu Toggle
   const menuToggle = () => {
      if (menuActive === false) {
         $('#menu-toggle-btn').text('close');
         return setMenuActive(true)
      } else {
         $('#menu-toggle-btn').text('menu');
         return setMenuActive(false)
      }
   }

   //////Search Toggle
   const searchToggle = () => {
      if (searchActive === false) {
         $('.search-overlay').addClass('search-active');
         $('main').css('display', 'none');
         $('.navbar .navbar-container').css('display', 'none');
         return setSearchActive(true);
      } else {
         $('main').css('display', 'block');
         $('.navbar .navbar-container').css('display', 'flex');
         $('.search-overlay').removeClass('search-active');
         return setSearchActive(false);
      }
   }

   ////PAssword Show Toggle
   const passwordShowToggle = () => {
      if (passwordShow === false) {
         return setPasswordShow(true)
      } else {
         return setPasswordShow(false);
      }
   }

   ////Register Location Toggle
   const registerLocationToggle = () => {
      $('.error-box').css('display', 'none');
      if (registerLocation === false) {
         return setRegisterLocation(true)
      } else {
         return setRegisterLocation(false);
      }
   }

   ////REGISTER MODAL ACTIVE
   const registerModalToggle = () => {
      $('.error-box').css('display', 'none')
      if (registerModalActive === false) {
         $('.register-modal').css('display', 'flex')
         return setRegisterModalActive(true);
      } else {
         $('.register-modal').css('display', 'none')
         return setRegisterModalActive(false);
      }
   }

   /////USER CONTENT FUNCTIONS
   let userContentToggle = false;
   const userContentActive = () => {
      if (userContentToggle === false) {
         $('.user-content .user-content-widget').css('display', 'flex');
         return userContentToggle = true;
      } else {
         $('.user-content .user-content-widget').css('display', 'none');
         return userContentToggle = false;
      }
   }

   ////LOGOUT FUNCTIONS
   const logOut = () => {
      window.localStorage.removeItem('user_token');
      window.location.reload();
   }


   return (
      <div className="navbar">
         <div className="search-overlay" onClick={searchToggle}>
            <span className="search-icon material-symbols-outlined">
               close
            </span>
            <div className="container">
               <div className="row align-items-center justify-content-center" onClick={e => e.stopPropagation()}>
                  <div className="col-12 col-md-10">
                     <div className="search-form">
                        <input type="text" placeholder='Type your keywords' />
                        <span>PLEASE ENTER AT LEAST 3 CHARACTERS</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="register-modal" onClick={registerModalToggle}>
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-12 col-md-10 col-xxl-8">
                     <div className="register-overlay" onClick={e => e.stopPropagation()}>
                        <div className="row">
                           <div className="col-12 col-lg-5">
                              <div className="registration-image"></div>
                           </div>
                           <div className="col-12 col-lg-7">
                              <div className="registration-content" onClick={e => e.stopPropagation()}>
                                 <h2>{registerLocation === false ? 'Sign up' : 'Sign in'}</h2>
                                 <div className="error-box">
                                    <span></span>
                                 </div>
                                 <div className="register-form">
                                    <div className="register-loading-box">
                                       <img src={loading} alt="" />
                                    </div>
                                    {registerLocation === false &&
                                       <div className="input-widget username">
                                          <label htmlFor="username">Username</label>
                                          <input
                                             type="text"
                                             name='username'
                                             value={registerLocation === false ? registerDetails.username : ''}
                                             id='username'
                                             required
                                             onChange={registerChange}
                                             autoComplete='off'
                                          />
                                       </div>
                                    }
                                    <div className="input-widget email">
                                       <label htmlFor="email">Email</label>
                                       <input
                                          type="email"
                                          name='email'
                                          id='email'
                                          required
                                          value={registerLocation === false ? registerDetails.email : loginDetails.email}
                                          onChange={registerLocation === false ? registerChange : loginChange}
                                       />
                                    </div>
                                    <div className="input-widget password">
                                       <label htmlFor="password">Password</label>
                                       <div className="input-cover">
                                          <input
                                             type={passwordShow === false ? 'password' : 'text'}
                                             name='password'
                                             id='password'
                                             required
                                             value={registerLocation === false ? registerDetails.password : loginDetails.password}
                                             onChange={registerLocation === false ? registerChange : loginChange}
                                          />
                                          <span className="icon material-symbols-outlined" onClick={passwordShowToggle}>
                                             {passwordShow === false ? 'visibility' : 'visibility_off'}
                                          </span>
                                       </div>
                                    </div>
                                    {registerLocation === false &&
                                       <div className="forgot-password">
                                          <span className='forgot-password'>Forgot Password?</span>
                                       </div>
                                    }
                                    <div className="remember-me">
                                       <input type="checkbox" name='remember-me' />
                                       <label htmlFor="remember-me">Remember me</label>
                                    </div>
                                    <div className="form-action">
                                       <button type='button' onClick={registerLocation === false ? registerHandler : loginHandler}>{registerLocation === false ? 'Sign up' : 'Sign in'}</button>
                                       <span>{registerLocation === false ? 'Have an account?' : 'New User?'} <span className='new-user' onClick={registerLocationToggle}>{registerLocation === false ? 'Sign in' : 'Sign up'}</span></span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="navbar-container container">
            <div className="logo">
               <a href='/'><img src={require('../../assets/navbar/R-white.png')} alt="" /></a>
            </div>
            <div className="navbar-navigation">
               <ul>
                  <a href="/"><li>Home</li></a>
                  <a href="/about"><li>About</li></a>
                  <a href="/contact"><li>Contact</li></a>
                  {
                     userMe.admin === true &&
                     <a href="/admin"><li>Admin</li></a>
                  }
               </ul>
            </div>
            <div className="registration-buttons">
               <span className="material-symbols-outlined" onClick={searchToggle}>
                  search
               </span>
               <div className="responsive-menu">
                  <span className="material-symbols-outlined menu-btn" id='menu-toggle-btn' onClick={menuToggle}>
                     menu
                  </span>
                  <div className={menuActive === true ? 'responsive-menu-widget menu-widget-active' : 'responsive-menu-widget'}>
                     <ul>
                        {
                           userMe &&
                           <li>
                              <div className="user-content-header">
                                 <span>{userMe.username}</span>
                                 <img src={userMe && require('../../assets/' + userMe.avatar)} alt="" />
                              </div>
                           </li>
                        }
                        <a href="/"><li>Home</li></a>
                        <a href="/about"><li>About</li></a>
                        <a href="/contact"><li>Contact</li></a>
                        {
                           userMe.admin === true &&
                           <a href="/admin"><li>Admin</li></a>
                        }
                        {
                           userMe &&
                           <a href="/profile"><li>Profile</li></a>
                        }
                        {
                           userMe ?
                              <li><button type='button' onClick={logOut}>Log out</button></li>
                              :
                              <div className="register-buttons">
                                 <li onClick={registerModalToggle}>Sign In</li>
                                 <li onClick={registerModalToggle}><button className='sign-up' type='button'>Sign Up</button></li>
                              </div>
                        }
                     </ul>
                  </div>
               </div>
               {
                  userMe ?
                     <div className="user-content">
                        <img onClick={userContentActive} src={userMe && require('../../assets/' + userMe.avatar)} alt="" />
                        <div className="user-content-widget">
                           <ul>
                              <li>
                                 <div className="user-content-header">
                                    <span>{userMe.username}</span>
                                    <img src={userMe && require('../../assets/' + userMe.avatar)} alt="" />
                                 </div>
                              </li>
                              <a href="/profile"><li>Profile</li></a>
                              <li><button type='button' onClick={logOut}>Log out</button></li>
                           </ul>
                        </div>
                     </div>
                     :
                     <ul className='buttons-ul'>
                        <li onClick={registerModalToggle}>Sign in</li>
                        <li onClick={registerModalToggle}><button className='sign-up' type='button'>Sign up</button></li>
                     </ul>
               }
            </div>
         </div>
      </div>
   )
}

export default NavBar