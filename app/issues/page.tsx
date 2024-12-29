import React from 'react';
import { Table } from '@radix-ui/themes';
<<<<<<< HEAD
import Link from '../components/Link';
=======
>>>>>>> 66f50769f575ba31e52630c23a25d2df66e99ef5
import IssueStatusBadge from '../components/IssueStatusBadge';
import prisma from '@/prisma/client';
// import delay from 'delay'
import IssueActions from './IssueActions';
<<<<<<< HEAD
=======
import Link from 'next/link';
>>>>>>> 66f50769f575ba31e52630c23a25d2df66e99ef5

const Issues = async () => {
  const issues = await prisma.issue.findMany()
  // await delay(2000)
  return (
    <div className="p-6">
      <IssueActions/>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
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
    </div>
  );
};

export default Issues;