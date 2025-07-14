import React from 'react';
import WelcomeFeed from './WelcomeFeed';
const WelcomePage = () => {
  return (
    <div>
      <div className='card mt-3 text-center rounded shadow'>
        <h1 className='card-title-bg mt-3'>Welcome to Heap Social</h1>
        <p className='fs-3'>We see that you are currently not signed in!</p>
        <p className='fs-4'>Feel free to take a look around the homepage.</p>
        <p className='fs-4'>Or you can go here to sign up, and join in on the fun!</p>
        <p className='fs-4'>Take a look at what some of our members are posting below</p>
      </div>

      <div className=' card mt-5 shadow rounded'>
        <WelcomeFeed />
      </div>


    </div>
  )
}

export default WelcomePage;
