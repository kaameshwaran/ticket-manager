import Link from 'next/link'
import React from 'react'
import Pagination from './components/Pagination'

const page = ({searchParams}: { searchParams: { page: string } }) => {
  return (
    <>
    <div className='text-black ml-10'>Home</div>
    <Pagination totalItem={120} currentPage={parseInt(searchParams.page)} pageSize={10} />
    </>
  )
}

export default page