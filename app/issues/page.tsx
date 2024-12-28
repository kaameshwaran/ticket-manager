import React from 'react';
import { Button } from '@radix-ui/themes';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import { PlusCircle, Pointer} from 'lucide-react';
import IssueStatusBadge from '../components/IssueStatusBadge';
import prisma from '@/prisma/client';

const Issues = async () => {
  const issues = await prisma.issue.findMany()

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Issue Tracker</h1>
        <Link href="./issues/new" passHref>
          <Button style={{cursor : 'pointer'}}>
            <PlusCircle size={18} />
            New Issue
          </Button>
        </Link>
      </div>

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
              <Table.Cell>{issue.title}</Table.Cell>
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