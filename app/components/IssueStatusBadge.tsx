import { Badge } from '@radix-ui/themes'
import React from 'react'
import { Status } from '@prisma/client'

const statusMap: Record<Status, {
    label: string,
    color: 'red' | 'violet' | 'green'  // Using Radix UI's color system
  }> = {
    OPEN: { 
      label: 'Open',
      color: 'red'
    },
    IN_PROGRESS: {
      label: 'In Progress',
      color: 'violet'
    },
    CLOSED: {
      label: 'Closed',
      color: 'green'
    }
  };
  
const IssueStatusBadge = ({ status }: { status: Status }) => (
  <Badge color={statusMap[status].color}>
    {statusMap[status].label}
  </Badge>
);

export default IssueStatusBadge