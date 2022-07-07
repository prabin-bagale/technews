import React from 'react'
import { useGlobalContext } from './contexct'

const Pagination = () => {
  const{Page,nbPages,getPrevPage,getNextPage}= useGlobalContext();
  return (
    <>
      <div className='pagination-btn'>
      <button onClick={()=>getPrevPage()}>PREV</button>
      <p>
        {Page + 1} of {nbPages}
      </p>
       <button onClick={()=>getNextPage()}>NEXT</button> 
      </div>
    </>
  )
}

export default Pagination