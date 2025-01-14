import { Flex } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import { IssueActions } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import Pagination from '@/app/components/Pagination';
import IssuesTable from './IssuesTable';

const Issues = async ({
  searchParams,
}: {
  searchParams: {
    status?: Status;
    orderBy?: keyof Issue;
    sortState?: 'asc' | 'desc' | 'none';
    page: string;
  };
}) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status as Status)
    ? searchParams.status
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: searchParams.orderBy
      ? { [searchParams.orderBy]: searchParams.sortState }
      : undefined,
    skip: (page - 1) * 10,
    take: 10,
  });
  const issueCount = await prisma.issue.count({
    where: { status },
  });

  return (
    <Flex direction={'column'} p="2" gap='3'>
      <IssueActions />
      <IssuesTable
        issues={issues}
        searchParams={searchParams}
      />
      <Pagination
        totalItem={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default Issues;
