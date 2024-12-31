import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { Edit } from 'lucide-react'

const EditIssueButton = ({ issueId }: {issueId: number}) => {
  return (
    <Button style={{ cursor: 'pointer' }}>
      <Edit size={18} />
      <Link href={`/issues/${issueId}/edit`}>
       Edit
      </Link>
    </Button>
  )
}

export default EditIssueButton