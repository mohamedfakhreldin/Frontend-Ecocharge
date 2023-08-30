import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config

import jwtDecode from 'jwt-decode';
import Dashboard from '../dashboard';
import AddStation from '../addStation';
import UpdataStation from '../updataStation';
import Stations from '../stations';
import { Provider, useSelector } from 'react-redux';
import store from '../store';
import Home from './Home';
import Users from '../users/users';
import AddUser from '../users/addUser';
import UpdateUser from '../users/updateUser';
import strings from '../../../lang/lang';

const AppContent = () => {
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  

  
  return (
    <CContainer className={strings.getLanguage()=='en' || 'right'} style={unfoldable?{width:'100%'} : strings.getLanguage()=='en'? {float:'right',width:'83%'}:{float:'left',width:'83%'}} lg>
      <Suspense fallback={<CSpinner color="primary" />}>
    
        <Routes>
        <Route path="/"  element={ <Home/>}></Route>
        <Route exact path="/stations" element={ <Stations/>}></Route>
        <Route exact path="/users" element={ <Users/>}></Route>
  <Route path="/addStation" exact element={<AddStation/>}></Route>
  <Route path="/addUser" exact element={<AddUser/>}></Route>
  <Route path="/updateStation/:stationId" exact element={<UpdataStation/>}></Route>
  <Route path="/updateUser/:userID" exact element={<UpdateUser/>}></Route>
          
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
