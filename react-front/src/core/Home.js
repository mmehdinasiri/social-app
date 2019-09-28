import React from 'react';
import Posts from '../post/Posts';

const Home = () => ( 
  <div>
    <div className="jumbotron">
      <div></div>
      <h2>Home</h2>
      <p className="lead">Welcom to React Frontend</p>
    </div>
    <div className="container">
      <Posts />
    </div>
  </div>
)

export default Home;