import React from 'react';
import { Helmet } from 'react-helmet';
import './about.scss';

const About = () => {
   return (
      <div className='about-me-section'>
         <Helmet>
            <title>About</title>
         </Helmet>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-12 col-sm-11 col-lg-7">
                  <div className="about-section">
                     <h2>About Me</h2>
                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quam porro, assumenda suscipit reiciendis dolorum explicabo deleniti exercitationem tempora fugit, blanditiis, ducimus corporis illo ipsam in quasi ipsa. Repellendus et dolore, laudantium rem qui nesciunt placeat temporibus officiis consequatur delectus ad minus eos aspernatur obcaecati dolorum voluptas minima eius at?</p>
                     <img src={require('../../assets/about-image-1.jpeg')} alt="" />
                     <h2>Lorem ipsum dolor sit.</h2>
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae sunt quidem reiciendis asperiores, nulla tenetur sint repudiandae voluptatum odit, maxime eius at, maiores reprehenderit et quod! Cum ipsum repudiandae minus sint sed sunt, eveniet sit dolore incidunt voluptates unde maxime odio iusto a earum nesciunt magni in consequuntur blanditiis vero magnam, error veniam! Velit incidunt delectus eos cumque possimus, labore tenetur dolores esse tempore! Sequi soluta velit quo delectus dolore vel atque labore commodi voluptatem.</p>
                     <h2>Lorem, ipsum dolor.</h2>
                     <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ducimus?</h4>
                     <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, porro commodi explicabo deserunt ex, minima exercitationem quam atque blanditiis, veniam aut. Voluptate modi nihil saepe, expedita exercitationem, unde similique quasi laboriosam aperiam doloremque possimus nam, eum eaque facere veritatis culpa optio fuga? Nisi alias ad id temporibus voluptatum laborum magni corporis debitis maiores vero, aliquid a voluptate dolor necessitatibus modi?</p>
                     <img src={require('../../assets/about-image-2.jpeg')} alt="" />
                     <h2>Lorem ipsum dolor sit amet consectetur.</h2>
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur excepturi necessitatibus dolorum nisi itaque cum voluptate minus, deserunt placeat voluptatem dignissimos reprehenderit saepe minima numquam eaque nihil nesciunt delectus ab at officia veniam! Veniam magni nobis quas vitae nesciunt sapiente suscipit ex ipsam tempore, excepturi quam enim modi repellat totam ab sit recusandae rem quos itaque, dolorem consequatur, quibusdam aut. Suscipit nulla enim alias, hic eveniet magni minima incidunt fuga neque nemo ut illum, laboriosam error odio ipsa. Maxime aliquid molestiae recusandae totam sint corporis natus alias a quae magnam, quam quia labore. Voluptate id magni eveniet repellendus dignissimos dolores excepturi recusandae optio ad dolor consectetur itaque quos voluptas adipisci, at maxime quidem velit possimus est ex placeat perferendis sunt. Iure modi quo facere, fuga corporis ipsam eius aperiam magni ex quae repudiandae, alias quod quaerat. Impedit, cum tempora? Qui quae recusandae illo, ipsa aperiam natus repellendus iste quidem placeat!</p>
                  </div>
               </div>
               <div className="col-12 col-lg-4">
                  <div className="sidebar-content">
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
      </div>
   )
}

export default About