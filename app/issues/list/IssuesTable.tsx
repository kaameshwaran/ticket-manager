import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { Issue } from '@prisma/client';
import { ArrowUpDown } from 'lucide-react';
import { IssueStatusBadge, Link } from '@/app/components';

const IssuesTable = ({
  issues,
  searchParams,
}: {
  issues: Issue[];
  searchParams: any;
}) => {
  const columns: { label: String; value: keyof Issue; width: string }[] = [
    { label: 'Issue', value: 'title', width: '50%' },
    { label: 'Status', value: 'status', width: '25%' },
    { label: 'Created', value: 'createdAt', width: '25%' },
  ];

  const currentOrderBy = searchParams.orderBy;
  const currentSortState = searchParams.sortState || 'none';

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

  return (
    <Table.Root variant="surface" style={{ tableLayout: 'fixed', width: '100%' }}>
      <Table.Header>
        <Table.Row>
          {columns.map(({ label, value, width }) => (
            <Table.ColumnHeaderCell key={value} style={{ width }}>
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
  );
};

export default IssuesTable;
