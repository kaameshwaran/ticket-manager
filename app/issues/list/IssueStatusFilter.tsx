'use-client'

import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"

const IssueStatusFilter = () => {

  const statuses : { label: String,  value?: Status }[] = [
    { label: "All",},
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" }
  ]

  return (
    <Select.Root>
        <Select.Trigger placeholder="Status" />
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