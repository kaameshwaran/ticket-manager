import { Issue } from '.prisma/client'
import { IssueStatusBadge } from '@/app/components'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'

const IssueDetails = ({ issue }: {issue: Issue}) => {
  return (
    <>
    <Heading>{issue.title}</Heading>
    <Flex gap={'3'} my='2'>
        <IssueStatusBadge status={issue.status}/>
        <Text>{issue.createdAt.toDateString()}</Text>
    </Flex>
    <Card>
        <p>{issue.description}</p>
    </Card>
    </>
  )
}

export default IssueDetails