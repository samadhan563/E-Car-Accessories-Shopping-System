import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function Button() {
  return (
    <Link to='create-account'>
      <button className='btn' style={{marginTop: "-28px"}}>Sign Up</button>
    </Link>
  );
}
