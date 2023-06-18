import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound(){
    return(
        <div className='notFoundBackground'>
        <h1 className='notFoundContent'>404</h1>
        <p>Page Not Found</p>
        <Link to="/chat">
          <button className='button'>Go to Login</button>
        </Link>
      </div>
    );
  };
