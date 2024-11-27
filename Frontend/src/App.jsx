import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signin from '../src/Pages/Signin';
import UserDetails from '../src/Pages/UserDetails';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Signin/>}/>
    <Route path='/user-details' element={<UserDetails/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App