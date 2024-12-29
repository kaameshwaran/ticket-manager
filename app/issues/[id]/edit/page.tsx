import prisma from '@/prisma/client'
import IssueForm from '../../_components/IssueForm'

interface Props{
    params: { id: string }
}
const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  return (
    <IssueForm issue={issue !== null ? issue : undefined}/>
  )
}

export default EditIssuePage