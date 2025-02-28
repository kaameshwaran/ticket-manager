import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}
const IssueSummary = ({ open, closed, inProgress }: Props) => {
  
  const containers: { label: string; value: number; status: Status }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];
  return (
      <Flex gap="4" >
        {containers.map((container) => (
          <Card className='w-25' key={container.status}>
            <Flex direction="column" align="center" gap="2">
              <Link
                className="text-sm font-medium"
                href={`/issues/list?status=${container.status}`}
              >
                {container.label}
              </Link>
              <Text size={'6'} className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Card>
        ))}
      </Flex>
  );
};

export default IssueSummary;
