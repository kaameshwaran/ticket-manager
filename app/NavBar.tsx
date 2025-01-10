'use client';
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { AiFillBug } from "react-icons/ai";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react'
import { Skeleton } from '@/app/components'


const NavBar = () => {

    return (
        <nav className='border-b px-5 mb-5 py-3'>
            <Container>
                <Flex justify={'between'}>
                    <Flex align={'center'} gap={'3'}>
                        <Link href={'/'}><AiFillBug/></Link>
                        <NavLinks/>
                    </Flex>
                    <AuthStatus/>
                </Flex>
            </Container>
        </nav>
  )
}


export const NavLinks = () => {
    const currentPath = usePathname(); 
    const links = [
        { name: 'DashBoard', url: '/' },
        { name: 'Issues', url: '/issues/list' },
        { name: 'Profile', url: '/profile'},
    ]

    return (
        <ul className='flex space-x-6 font-semibold'>
            {links.map((link) => (
            <li key={link.url}>
            <Link  
            className={classNames({
                "nav-link": true,
                '!text-zinc-900': link.url === currentPath,
            })}
            href={link.url}
            >
                {link.name}
            </Link>
            </li>
        ))}
        </ul>
    )
}


const AuthStatus = () => {
    const{ status, data: session } = useSession();
    if(status === 'loading') return <Skeleton width="2rem" height="2rem" borderRadius="50%" />
    if(status === 'unauthenticated') return <Link className="nav-link" href="/api/auth/signin">Log In</Link>
  return (
    <Box>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar 
                src={session!.user!.image!} 
                fallback="?"
                size={'2'}
                radius='full'
                style={{cursor:'pointer'}}
                referrerPolicy='no-referrer'
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <Text size={'2'}>
                        {session!.user!.name}
                    </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log Out</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Box>
  )
}

export default NavBar


