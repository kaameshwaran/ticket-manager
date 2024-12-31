import { Button } from '@radix-ui/themes'
import { Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DeleteIssueButton = ({ issueId }: {issueId: number}) => {
  return (
    <Button color='red' style={{cursor: 'pointer'}}>
        <Trash size={18}/>Delete
    </Button>
  )
}

export default DeleteIssueButton