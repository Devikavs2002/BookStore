import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSideBar from '../components/AdminSideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons'


const AdminHome = () => {
  return (
   <>
   <AdminHeader/>
   <div className='grid grid-cols-[1fr_5fr]'>
    <div><AdminSideBar/></div>
    <div>
      <div className='flex justify-evenly mt-8'>
        <div className="box bg-blue-900 rounded">
          <div className='text-white flex p-3 '>
            <FontAwesomeIcon className='text-4xl' icon={faBook}/>
             <h5 className='text-center'>Total Number of Books
                <h4>100+</h4>
             </h5>
            

          </div>
        </div>
  <div className="box bg-green-900 rounded">
    <div className='text-white flex p-3 '> 

       <FontAwesomeIcon className='text-4xl'  icon={faUserGroup}/>
       <h5 className='text-center' >Total Number of Users 
        <h4>100+</h4>
       </h5>
    </div>
  </div >
    <div className="box bg-yellow-600 rounded">
      <div className='text-white flex p-3'>
       <FontAwesomeIcon className='text-4xl'  icon={faUser}/>
          <h5 className='text-center' >Total Number of Employees   <h4>100+</h4></h5>
    </div>
    </div>
      </div>
      
    </div>

   </div>
   
   
   </>
  )
}

export default AdminHome