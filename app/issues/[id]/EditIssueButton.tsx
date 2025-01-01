'use client'
import { Button } from '@radix-ui/themes'
import { Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'


const EditIssueButton = ({ issueId }: {issueId: number}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/issues/${issueId}/edit`)
  }
  return (
    <Button style={{ cursor: 'pointer' }} onClick={handleClick}>
      <Edit size={18} />
       Edit
    </Button>
  )
}

export default EditIssueButton