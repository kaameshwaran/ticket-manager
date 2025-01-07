'use client'

import { Select } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { Skeleton } from "@/app/components";

const IssueStatusFilter = ({ currentStatus }: { currentStatus: string }) => {
  
  const router = useRouter();

  const statuses : { label: string,  value: string }[] = [
    { label: "All", value: "All"},
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" }
  ]
  const [selectedStatus, setSelectedStatus] = useState<string>(currentStatus);

  return (
    <>
    <Select.Root defaultValue={selectedStatus} onValueChange={(status) => {
        setSelectedStatus(status);
        const query = status !== 'ALL' ? `?status=${status}` : '';
        router.push('/issues/list/' + query);
      }}>
        <Select.Trigger/>
        <Select.Content>
          <Select.Group>
            {statuses.map(status => (
              <Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
    </Select.Root>
    </>
  )
}

export default IssueStatusFilter