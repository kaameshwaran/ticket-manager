'use client';
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { AiFillBug } from "react-icons/ai";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react'


const NavBar = () => {
    const currentPath = usePathname(); 
    const{ status, data: session } = useSession()
    const links = [
        { name: 'DashBoard', url: '/' },
        { name: 'Issues', url: '/issues/list' },
    ]
    return (
        <nav className='border-b px-5 mb-5 py-3'>
            <Container>
            <Flex justify={'between'}>
                <Flex align={'center'} gap={'3'}>
                    <Link href={'/'}><AiFillBug/></Link>
                    <ul className='flex space-x-6 font-semibold'>
                        {links.map((link) => (
                        <li key={link.url}>
                        <Link  
                        className={classNames({
                            'text-zinc-900': link.url === currentPath,
                            'text-zinc-500': link.url !== currentPath,
                            'hover:text-zinc-900 transition-colors': true
                        })}
                        href={link.url}
                        >
                            {link.name}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </Flex>
                <Box>
                    {status === "authenticated" && (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Avatar 
                                src={session.user!.image!} 
                                fallback="?"
                                size={'2'}
                                radius='full'
                                style={{cursor:'pointer'}}
                                />
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Label>
                                    <Text size={'2'}>
                                        {session.user!.name}
                                    </Text>
                                </DropdownMenu.Label>
                                <DropdownMenu.Item>
                                    <Link href="/api/auth/signout">Log Out</Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    )}
                    {status === "unauthenticated" && (
                        <Link href="/api/auth/signin">Log In</Link>
                    )}
                </Box>
            </Flex>
            </Container>
        </nav>
  )
}

export default NavBar


