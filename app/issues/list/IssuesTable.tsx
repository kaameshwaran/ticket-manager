import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { Issue, Status } from '@prisma/client';
import { ArrowUpDown } from 'lucide-react';
import { IssueStatusBadge, Link } from '@/app/components';

const IssuesTable = ({
  columns,
  issues,
  searchParams,
  currentOrderBy,
  currentSortState,
  getNextSortState,
}: {
  columns: { label: String; value: keyof Issue; width: string }[];
  issues: Issue[];
  searchParams: any;
  currentOrderBy: keyof Issue | undefined;
  currentSortState: 'asc' | 'desc' | 'none';
  getNextSortState: (column: keyof Issue) => 'asc' | 'desc' | 'none';
}) => {
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
