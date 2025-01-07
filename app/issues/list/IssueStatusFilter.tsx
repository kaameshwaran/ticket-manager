'use client'

import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useRouter } from "next/navigation"

const IssueStatusFilter = () => {
  
  const router = useRouter();
  const statuses : { label: String,  value?: Status }[] = [
    { label: "All"},
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" }
  ]

  return (
    <Select.Root onValueChange={(status) => {
      const query = status !== 'All' ? `?status=${status}` : '';
      router.push('/issues/list/' + query);
    }}>
        <Select.Trigger placeholder="Filters" />
        <Select.Content>
          <Select.Group>
            {statuses.map(status => (
              <Select.Item key={status.value} value={status.value || "All"}>{status.label}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter