
import { Navigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function Logout({logOut}) {
  const navigate =  useNavigate()
    useEffect(() => {
     logOut()
     navigate('/signin')
    }, [])
    
  return <Navigate to='/signin' />
}
