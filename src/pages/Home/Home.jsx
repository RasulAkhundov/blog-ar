import React from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/sidebar/Sidebar';

const Home = ({ posts }) => {
  return (
   <div className='home-section'>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Header/>
      <div className="main-content-area">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-9 mb-4 mb-lg-0 p-0">
              <Posts posts={posts} />
            </div>
            <div className="col-12 col-lg-3">
              <Sidebar/>
            </div>
          </div>
        </div>
      </div>
   </div>
  )
}

export default Home