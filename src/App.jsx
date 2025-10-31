
import { Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import PNF from './components/PNF'
import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import AllBooks from './pages/AllBooks'
import AdminSettings from './admin/pages/AdminSettings'
import AdminBooks from './admin/pages/AdminBooks'
import AdminHome from './admin/pages/AdminHome'
import Admincareers from './admin/pages/Admincareers'
import Profile from './pages/Profile'
import ViewBooks from './pages/ViewBooks'
import PaymentSuccess from './components/PaymentSuccess'
import PaymentFailure from './components/PaymentFailure'


function App() {
  const [isShowLanding,setIsShowLanding]= useState(false)

  useEffect(()=>{
    setTimeout(() => {
      setIsShowLanding(true)
    },5000);
  })

  return (
    <>
    <Routes>
      <Route path='/' element={isShowLanding?<Landing/>:<Loader/>}/>
     
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideRegister={true}/>}/>
       <Route path='/contact' element={<Contact/>}/>
       <Route path='/careers' element={<Careers/>}/>
       <Route path='/my-books' element={<AllBooks/>}/>
       {/* Route params */}
       <Route path='/view-book/:id' element={<ViewBooks/>}/>

       <Route path='/payment-success' element={<PaymentSuccess/>}/>
           <Route path='/payment-failure' element={<PaymentFailure/>}/>

       
       <Route path='/admin-books' element={<AdminBooks/>}/>
       <Route path='/admin-settings' element={<AdminSettings/>}/>
       <Route path='/admin-home' element={<AdminHome/>}/>
       <Route path='/admin-careers' element={<Admincareers/>}/>
       <Route path='/profile' element={<Profile/>}/>
       <Route path='*' element={<PNF/>}/>
    </Routes>
    {/* <Footer/> */}
    </>
  )
}

export default App
