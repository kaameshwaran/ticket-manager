'use client'
import {AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const DeleteIssueButton = ({ issueId }: {issueId: number}) => {
  const router = useRouter()
  return (
    <AlertDialog.Root>
		<AlertDialog.Trigger>
			<Button color='red' style={{cursor: 'pointer'}}>
                <Trash size={18}/>Delete
            </Button>
		</AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Title>
                Are you absolutely sure?
            </AlertDialog.Title>
            <AlertDialog.Description>
                This action cannot be undone. This will permanently delete your
                ticket from our servers.
            </AlertDialog.Description>
            <Flex mt={'2'} gap={'3'}>
                <AlertDialog.Cancel>
                    <Button style={{cursor: 'pointer'}} color='gray'>Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button onClick={async() =>{
                        await axios.delete('/api/issues/' + issueId);
                        router.push('/issues')
                        router.refresh()
                    }}
                    style={{cursor: 'pointer'}} color='red'>Yes, delete</Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
	</AlertDialog.Root>
  )
}

export default DeleteIssueButton