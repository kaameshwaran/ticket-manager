import { IssueStatusBadge } from '@/app/components'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
    params : { id : string}
}
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });

  if(!issue)
      notFound()

  return (
    <Grid columns={{initial: '1', md: '2'}} gap={'5'}>  
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap={'3'} my='2'>
          <IssueStatusBadge status={issue.status}/>
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card >
          <p>{issue.description}</p>
        </Card>
      </Box>
      <Box>
        <Button>
          <Edit size={18}/>
          <Link href={`/issues/${issue.id}/edit`}>Edit</Link>
        </Button>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage