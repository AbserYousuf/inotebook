import React, { useContext } from 'react'
import notecontext from '../context/notes/notecontext'
export default function Alert() {
    const context = useContext(notecontext)
    const {alert1,message,alert2} = context
   
  return (
    <>
    {alert1 && (
        
        <div className="alert alert-warning mb-0 " role="alert" style={{height:"50px"}}>
         {message}
      
        </div>

    )}
      {alert2 && (
         
         <div className="alert alert-warning mb-0 my-alert " role="alert" style={{height:"50px"}}>
         {message}
      
        </div>
      )}
    </>
  )
}
