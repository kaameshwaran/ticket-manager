import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { Edit } from 'lucide-react'

const EditIssueButton = ({ issueId }: {issueId: number}) => {
  return (
    <div>
        <Button>
          <Edit size={18}/>
          <Link href={`/issues/${issueId}/edit`}>Edit</Link>
        </Button>
    </div>
  )
}

export default EditIssueButton