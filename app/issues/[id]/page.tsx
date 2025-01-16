import prisma from '@/prisma/client'
import { Box, Grid, Flex } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import SelectAssignee from './SelectAssignee'
import UpdateStatus from './UpdateStatus'
import { cache } from 'react'

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({where: {id: issueId}}))

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  
  const { id } = params;
  const issueId = parseInt(id);


  if (isNaN(issueId)) {
    notFound();
  }

  const issue = await fetchUser(issueId);

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap={'5'}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
      <Box>
        <Flex direction={'column'} gap={'3'}>
          <SelectAssignee issue={issue}/>
          <UpdateStatus issue={issue}/>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props) {
  const { id } = params;
  const issueId = parseInt(id);

  if (isNaN(issueId)) {
    notFound();
  }

  const issue = await fetchUser(issueId);

  if (!issue) {
    notFound();
  }

  return {
    title: issue.title,
    description: issue.description,
  };
}
