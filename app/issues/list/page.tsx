import { Flex, Table } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import { IssueStatusBadge, Link, IssueActions } from '@/app/components';
import NextLink from 'next/link';
import { Issue, Status } from '@prisma/client';
import { ArrowUpDown } from 'lucide-react';
import Pagination from '@/app/components/Pagination';

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
  const columns: { label: String; value: keyof Issue }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status' },
    { label: 'Created', value: 'createdAt' },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status as Status)
    ? searchParams.status
    : undefined;

  const currentSortState = searchParams.sortState || 'none';
  const currentOrderBy = searchParams.orderBy;

  const getNextSortState = (column: keyof Issue) => {
    if (currentOrderBy === column) {
      return currentSortState === 'none'
        ? 'asc'
        : currentSortState === 'asc'
        ? 'desc'
        : 'none';
    }
    return 'asc';
  };

  const orderBy =
    currentSortState !== 'none' && currentOrderBy
      ? { [currentOrderBy]: currentSortState }
      : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * 10,
    take: 10,
  });
  const issueCount = await prisma.issue.count({
    where: { status },
  });

  return (
    <Flex direction={'column'} p="2" gap='2'>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(({ label, value }) => (
              <Table.ColumnHeaderCell key={value}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: value,
                      sortState: getNextSortState(value),
                    },
                  }}
                >
                  {label}
                </NextLink>
                {value === currentOrderBy && currentSortState !== 'none' && (
                  <ArrowUpDown
                    size={17}
                    className={`inline ${
                      currentSortState === 'asc' ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </Table.Cell>
              <Table.Cell>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell>
                {new Date(issue.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
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
