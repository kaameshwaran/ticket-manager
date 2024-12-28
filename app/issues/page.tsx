
import React from 'react'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import prisma from '@/prisma/client'

const Issues = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div >
      <div className='mb-5'>
        <Link href={'./issues/new'}><Button>New Issue</Button></Link>
      </div>
      <div className="max-w-full overflow-x-auto">
      <Table.Root 
        variant="surface" 
        className="w-auto border border-gray-300 rounded-lg shadow-sm"
      >
      <Table.Header className="text-white">
        <Table.Row>
          <Table.ColumnHeaderCell className="py-3 px-4 text-left">Issues</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="py-3 px-4 text-left">Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="py-3 px-4 text-left">Created At</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row
            key={issue.id}
            className="hover:bg-blue-50 even:bg-gray-100"
          >
            <Table.Cell className="py-2 px-4">{issue.title}</Table.Cell>
            <Table.Cell className="py-2 px-4">{issue.status}</Table.Cell>
            <Table.Cell className="py-2 px-4">{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      </Table.Root>
    </div>
    </div>
  )
}

export default Issues
