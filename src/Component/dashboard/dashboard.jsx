import React from 'react'
import AppSidebar from './components/AppSidebar'
import AppContent from './components/AppContent'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import { Provider } from 'react-redux'

export default function Dashboard() {
  return (
    <div>
          <Provider store={store}>

      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <div className="container-fluid body flex-grow-1 px-3">
          <AppContent />
        </div>
    
      </div>
          </Provider>
    </div>
  )
}
