import { Flex, Table } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import {IssueStatusBadge, Link, IssueActions} from '@/app/components';
import NextLink from 'next/link'
import { Issue, Status } from '@prisma/client';
import { ArrowUpDown } from 'lucide-react';

const Issues = async ({ searchParams }: { searchParams : {status: Status, orderBy: keyof Issue, orderDirection: 'asc' | 'desc' }}) => {
  const columns: {label: String, value: keyof Issue}[] =[
    {label: 'Issue', value: 'title'},
    {label: 'Status', value: 'status'},
    {label: 'Created', value: 'createdAt'},
  ]
  
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderDirection = searchParams.orderDirection || 'asc';
  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy)
  ? { [searchParams.orderBy]: orderDirection }
  : undefined

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy
  })

  const nextOrderDirection = orderDirection === 'asc' ? 'desc' : 'asc';

  return (
    <Flex direction={'column'} p="2">
      <IssueActions currentStatus={status === undefined ? "All" : status}/>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(({ label, value }) => (
              <Table.ColumnHeaderCell key={value}>
                  <NextLink href={{
                    query: {
                      ...searchParams,
                      orderBy: value,
                        orderDirection: nextOrderDirection,
                      }
                  }}>
                    {label}
                  </NextLink>
                  {value === searchParams.orderBy &&
                    <ArrowUpDown size={17} className='inline'/>
                  }
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell>
                {new Date(issue.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export const dynamic = 'force-dynamic'

export default Issues;