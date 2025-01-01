'use client'
import { Spinner } from '@/app/components'
import {AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteIssueButton = ({ issueId }: {issueId: number}) => {
  const router = useRouter()
  const[error, setError] = useState(false);
  const[isDeleting, setIsDeleting] = useState(false);


  const deleteIssue = async() =>{
        try {
            setIsDeleting(true)
            await axios.delete('/api/issues/' + issueId);
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setIsDeleting(false)
            setError(true)
        }
    }
  return (
    <>
    <AlertDialog.Root>
		<AlertDialog.Trigger>
			<Button color='red' disabled={isDeleting} style={{cursor: 'pointer'}}>
                <Trash size={18}/> Delete {isDeleting && <Spinner/>}
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
                    <Button style={{cursor: 'pointer'}} color='gray' variant='soft'>Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button onClick={deleteIssue}
                    style={{cursor: 'pointer'}} color='red'>Yes, delete</Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
	</AlertDialog.Root>
    <AlertDialog.Root open={error}>
    <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>This issue could not be deleted.</AlertDialog.Description>
        <Button color='gray' variant='soft' mt={'3'} onClick={() => {setError(false)}}>Ok</Button>
    </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton