import React, { useState } from 'react'
import './style.css'
import { CHeaderToggler, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import { AppSidebarNav } from './AppSidebarNav'


import SimpleBar from 'simplebar-react'
//import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { cilMenu } from '@coreui/icons'
import strings from '../../../lang/lang'

const AppSidebar = () => {
   const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <>
      <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
    <CSidebar
      style={{ color: 'red' }}
      color="light"
      position="fixed"
      className={strings.getLanguage()=='en' || 'right'} 
      unfoldable={unfoldable}
    visible={sidebarShow}
    onVisibleChange={(visible) => {
      dispatch({ type: 'set', sidebarShow: visible })
    }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full"  height={35} />
        <CIcon className="sidebar-brand-narrow" height={35} />
      </CSidebarBrand>
      <CSidebarNav className='mt-5'>
        
          <AppSidebarNav items={navigation} />
      
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
    </CSidebar>
        </>
  )
}

export default React.memo(AppSidebar)
