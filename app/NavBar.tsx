'use client';
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { RiBugLine } from "react-icons/ri";


const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        { name: 'DashBoard', url: '/' },
        { name: 'Issues', url: '/issues/list' },
    ]
    return (
        <nav className='flex space-x-6 border-b px-5 mb-5 h-14 items-center'>
            <div className='text-black text-xl'><RiBugLine/></div>
            <ul className='space-x-6 font-semibold'>
                {links.map(link => 
                <Link key={link.url} 
                className={classNames({
                    'text-zinc-900': link.url === currentPath,
                    'text-zinc-500': link.url !== currentPath,
                    'hover:text-zinc-900 transition-colors': true
                })}
                href={link.url}>{link.name}</Link>)}
            </ul>
        </nav>
  )
}

export default NavBar


