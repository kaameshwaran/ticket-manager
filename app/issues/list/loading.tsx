import { Skeleton } from '@/app/components'
import { Table } from '@radix-ui/themes'
import IssueActions from './IssueActions'

const LoadingIssuePage = () => {
  const issues = [1, 2, 3, 4, 5]
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
            <Table.Row key={issue}>
              <Table.Cell><Skeleton/></Table.Cell>
              <Table.Cell>
              <Skeleton/>
              </Table.Cell>
              <Table.Cell>
              <Skeleton/>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default LoadingIssuePage