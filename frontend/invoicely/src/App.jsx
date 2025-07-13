import React from 'react'
import Menubar from './components/Menubar/Menubar'
import {Routes,Route, useLocation} from "react-router-dom"
import Dashboard from './pages/Dashboard/Dashboard';
import ManageCategory from './pages/ManageCategory/ManageCategory';
import ManageUsers from './pages/MangeUsers/ManageUsers';
import ManageItems from './pages/ManageItems/ManageItems';
import Explore from './pages/Explore/Explore';

import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';
import Login from './pages/Login/Login';
const App = () => {
  const location = useLocation();
  return (

      
    <div>
      {location.pathname !== "/login" && <Menubar/>}
      <Toaster/>
<Routes>

<Route path='/dashboard' element={<Dashboard/>}/>
<Route path='/category' element={<ManageCategory/>}/>
<Route path='/users' element={<ManageUsers/>}/>
<Route path='/items' element={<ManageItems/>}/>
<Route path='/explore' element={<Explore/>}/>
<Route path='/' element={<Explore/>}/>
<Route path='/login' element={<Login/>}/>
  </Routes>
      
    </div>

  )
}

export default App