import React from 'react'
import CIcon from '@coreui/icons-react'

import {
  cilUser,
cilTruck,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import strings from '../../lang/lang'

const _nav = [
  {
    component: CNavItem,
    name: strings.navbar.dashboard,
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,

  },
  
  {
    component: CNavTitle,
    name: strings.dashboard.Tables,
  },
  {
    component: CNavGroup,
    name: strings.dashboard.Users,
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: strings.dashboard.Users,
        to: '/dashboard/users',
      },
      {
        component: CNavItem,
        name: strings.dashboard.AddUser,
        to: '/dashboard/adduser',
      },
    
    ],
  },
  {
    component: CNavGroup,
    name: strings.dashboard.Stations,
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: strings.dashboard.Stations,
        to: '/dashboard/stations',
      },
      {
        component: CNavItem,
        name: strings.dashboard.AddStation,
        to: '/dashboard/addstation',
      },
    
    ],
  },

]

export default _nav
