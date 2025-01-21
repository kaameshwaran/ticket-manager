import React from 'react'
import prisma from '@/prisma/client'
import IssueChart from './IssueChart'
import { Flex, Grid } from '@radix-ui/themes'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
import { Metadata } from 'next'

const HomePage = async () => {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })

  const issues = await prisma.issue.findMany({
    select: {
      status: true,
      assignedToUserId: true,
    },
  });

  const userIssuesMap: { [key: string]: { open: number; closed: number; inProgress: number } } = {};

  issues.forEach(issue => {
    if (!issue.assignedToUserId) return;
    if (!userIssuesMap[issue.assignedToUserId]) {
      userIssuesMap[issue.assignedToUserId] = { open: 0, closed: 0, inProgress: 0 };
    }
    if (issue.status === 'OPEN') userIssuesMap[issue.assignedToUserId].open++;
    if (issue.status === 'CLOSED') userIssuesMap[issue.assignedToUserId].closed++;
    if (issue.status === 'IN_PROGRESS') userIssuesMap[issue.assignedToUserId].inProgress++;
  });

  const userIssues = await Promise.all(
    Object.keys(userIssuesMap).map(async userId => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true },
      });
      return {
        user: user?.name || 'Unknown',
        ...userIssuesMap[userId],
      };
    })
  );

  return (
    <Grid columns={{initial: '1', md: '2'}} gap={'5'}>
      <Flex direction={'column'} gap={'5'} align={'center'}>
        <IssueSummary open={open} closed={closed} inProgress={inProgress}/>
        <IssueChart open={open} closed={closed} inProgress={inProgress} userIssues={userIssues}/>
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

export default HomePage
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ticket Manager Dashboard',
  description: 'View the summary Ticket Status',
};
