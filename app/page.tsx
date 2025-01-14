import Link from 'next/link'
import React from 'react'
import Pagination from './components/Pagination'

const page = () => {
  return (
    <>
    <div className='text-black ml-10'>Home</div>
    <Pagination totalItem={120} currentPage={1} pageSize={10} />
    </>
  )
}

export default page