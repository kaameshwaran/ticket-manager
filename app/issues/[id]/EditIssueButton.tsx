import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { Edit } from 'lucide-react'

const EditIssueButton = ({ issueId }: {issueId: number}) => {
  return (
    <div>
        <Link href={`/issues/${issueId}/edit`}>
        <Button style={{cursor: 'pointer'}}>
          <Edit size={18}/> Edit
        </Button>
        </Link>
    </div>
  )
}

export default EditIssueButton